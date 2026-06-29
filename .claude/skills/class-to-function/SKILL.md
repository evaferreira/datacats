---
name: class-to-function
description: Faithful 1:1 migration of React class components to function components with hooks (useState/useEffect/useRef), preserving the exact render output, side-effect timing/count, and public prop/callback contract. Use when converting, porting, or "modernizing" a class component to hooks — e.g. "migrate this class to hooks", "convert X.jsx to a function component", "class to function", "turn this React class into hooks" — or when working through the datacats class→function migration. Tuned for React 17 batching semantics and the componentDidUpdate→effect trap, the two places these migrations silently drift.
---

# Class → Function Component Migration

Convert a React **class** component to a **function** component with hooks, changing
**only how the component is declared** — nothing about what it renders or does.

This skill is the binding spec for that conversion. It was derived from two reference
migrations that were completed and reviewed. **Before migrating anything, open both and
copy their shape:**

- [`frontend/src/components/dashboard/ActivityFeed.jsx`](frontend/src/components/dashboard/ActivityFeed.jsx) — mount effect + timer cleanup, pure helper at module scope
- [`frontend/src/components/dashboard/MetricsCard.jsx`](frontend/src/components/dashboard/MetricsCard.jsx) — mount-once effect with the intentional `exhaustive-deps` disable, and the `componentDidUpdate` ref pattern

When in doubt, the answer is "whatever those two files do."

The remaining targets in this repo and their per-file traps live in
[references/targets.md](references/targets.md). Consult it to pick what to migrate next and
to read the **`UserFilters` escalation** (the one target that must not be migrated in
isolation).

---

## Workflow

1. **Read the two reference files above.** They define the house style for every construct.
2. **Inventory the target's constructs** — constructor/state, `this.props.*`, instance
   methods, instance fields, and every lifecycle method (`componentDidMount`,
   `componentWillUnmount`, `componentDidUpdate`). Map each through §1.
3. **Translate construct-by-construct** using §2–§7. Slow down at the two sharp edges:
   §4 (`componentDidUpdate`) and §5 (React 17 batching). These are where faithful
   migrations break.
4. **Run the verification checklist (§8)** before declaring done. Tests stay unedited.

---

## 0. The golden rule: faithful 1:1, behavior-first

> The migration changes **how the component is declared** (class scaffolding → hooks).
> It changes **nothing else** — not the rendered DOM, not the styles, not the strings,
> not the prop/callback contract, not the timing or frequency of side effects, not the
> tests.

A correct migration:

- Renders **byte-identical JSX**: same elements, order, `className`s, inline styles,
  `key`s, `colSpan`, text, whitespace-significant content (`—`, `▲`/`▼`, `…`).
- Preserves **accessibility** exactly: every `aria-*`, `htmlFor`/`id` pairing,
  `type="button"`, `<label>` association, semantic table structure stays as-is.
- Preserves **side-effect timing and count**: an effect that ran once on mount still runs
  once on mount; an update-driven fetch fires on the same condition, no more, no less.
- Keeps the **public contract** identical: same props consumed, same callbacks invoked
  with the same arguments at the same moments.
- **Keeps existing tests green without editing them.**

**Do not "improve" code while migrating.** Preserve quirks verbatim — a `const data2 = data`
alias, a `// we'll consolidate later` comment, odd-but-harmless control flow. Refactors and
de-duplication are a **separate** PR.

### Explicitly not part of this migration

- **Design tokens.** Targets already use `var(--dc-*)` tokens. Copy styles **verbatim** —
  add, change, or "fix" nothing. `lint:tokens` stays clean because you touched no literals.
- **Import paths / utilities.** Leave `fetchWithAuth`, `apiHelpers` vs `api`, constants,
  etc. exactly as imported. This is not the time to consolidate them.

---

## 1. Mapping table

| Class construct | Function-component form |
|---|---|
| `class X extends React.Component` | `function X(props) { … }` (or `function X({ a, b })`) |
| `constructor(props) { super(props); this.state = {…} }` | one `useState(initial)` per state field, **same initial values** (§2) |
| `this.props.foo` | destructured prop `foo` (destructure once at the top of the body) |
| `this.state.foo` / `this.setState(...)` | the `foo` state variable / its setter (§5 for multi-field) |
| `this.fooBar = this.fooBar.bind(this)` | delete — closures need no binding |
| instance method that reads props/state | plain function declared **inside** the component body (closes over props/state) |
| instance method that uses **no** `this` (pure helper) | hoist to **module scope**, above the component (§6) |
| non-render instance field (`this.timer`, caches) | `useRef(initial)`, accessed via `ref.current` (§7) |
| `componentDidMount() {…}` | `useEffect(() => { … }, [])` (§3) |
| `componentWillUnmount() {…}` | the **cleanup return** of the relevant mount effect (§3) |
| `componentDidUpdate(prevProps) {…}` | a ref-of-previous-value + an effect — **read §4 carefully** |
| `render() { return … }` | the function's `return`; early returns stay early returns |

---

## 2. State: one `useState` per field, initials unchanged

`this.state = { a: [], b: true, c: null }` becomes:

```jsx
const [a, setA] = useState([])
const [b, setB] = useState(true)
const [c, setC] = useState(null)
```

Initial values must be **identical**. If an initial value is derived from props in the
constructor (e.g. `sortColumn: props.columns[0]?.key || null`), it was computed **once** and
never again. Reproduce that with a **lazy initializer** so it is not recomputed when the prop
changes:

```jsx
const [sortColumn, setSortColumn] = useState(
  () => (props.columns && props.columns[0] && props.columns[0].key) || null
)
```

Do **not** write `useState(props.columns?.[0]?.key)` and then add an effect that resyncs it
on prop change — that introduces behavior the class never had.

**Exception — keep fields together when they must update atomically.** If several state
fields are always set together by a dynamic key (`this.setState({ [field]: value })`) or are
mutually dependent in a single update (`sortColumn` + `sortDirection`), prefer **one**
`useState` holding the object. This reproduces the dynamic-key setter and guarantees a single
re-render (§5). Splitting into separate hooks is allowed only when no intermediate render is
observable.

---

## 3. `componentDidMount` / `componentWillUnmount` → one mount effect

Mount logic goes in `useEffect(() => { … }, [])`. If there's also a `componentWillUnmount`
that shares a resource, its body becomes the **cleanup function returned by the same effect**.
This is exactly `ActivityFeed`'s timer:

```jsx
const timerRef = useRef(null)

useEffect(() => {
  const load = () => {
    fetchWithAuth('/api/v1/metrics/activity')
      .then(items => { setItems(items || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  load()
  timerRef.current = setInterval(load, 30000)

  return () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }
}, [])
```

Part of the contract:

- A helper used **only** by the mount effect (`load` above) is declared **inside** the
  effect. This avoids stale closures and avoids tripping `exhaustive-deps`.
- If the mount effect calls a component-scope function that reads props/state (e.g.
  `MetricsCard`'s `fetchData`), keep the empty `[]` deps and **preserve the
  `// eslint-disable-line react-hooks/exhaustive-deps` comment** — mount-once is the intended
  behavior and the lint rule will otherwise flag it. Copy the comment placement from
  [`MetricsCard.jsx:28`](frontend/src/components/dashboard/MetricsCard.jsx#L28).

---

## 4. `componentDidUpdate(prevProps)` → previous-value ref + effect (the sharp edge)

This is where naive migrations break. `componentDidUpdate` runs **after every update, never
on mount**, and compares against the previous props **the way the original wrote the
comparison**. Reproduce both properties exactly. Two shapes:

### 4a. Deep / non-referential comparison → ref + no-deps effect (REQUIRED)

`MetricsCard` compared filters with `JSON.stringify`. The faithful translation keeps that
exact comparison, runs after every render, and updates the ref afterward:

```jsx
const prevFiltersRef = useRef(filters)
useEffect(() => {
  if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
    fetchData()
  }
  prevFiltersRef.current = filters
})              // ← intentionally NO dependency array: runs every render, like componentDidUpdate
```

Why this and **not** `useEffect(fetchData, [filters])`:

- The original used a **deep** `JSON.stringify` compare. `[filters]` uses `Object.is`
  (referential), so a parent passing a fresh-but-equal object every render would fetch on
  every render — a behavior change.
- `[filters]` **also fires on mount**, double-fetching alongside the §3 mount effect.
- On first render the ref equals current `filters`, so the comparison is equal and **no fetch
  fires on mount** — matching `componentDidUpdate`.

### 4b. Primitive / referential comparison (`!==`) → single keyed effect (preferred)

If `componentDidUpdate` compared a primitive with `!==` (e.g.
`prevProps.refreshKey !== this.props.refreshKey`), then mount-fetch **plus**
update-on-change-fetch is exactly `useEffect(fn, [key])`. Collapse the mount effect and the
update effect into one:

```jsx
useEffect(() => { fetchCohorts() }, [refreshKey])
```

This fires once on mount and again whenever `refreshKey` changes — the precise union of
`componentDidMount` + `componentDidUpdate`. **Do not** also keep a separate `[]` mount effect;
that double-fetches on mount. (The §4a ref pattern also works here but is heavier — use it
only when the comparison is non-referential.)

---

## 5. `this.setState` and React 17 batching (read before splitting setters)

This app is on **React 17** (`react@17.0.2`). React 17 batches multiple state updates into one
render **only inside React event handlers** — **not** inside promise `.then`/`.catch`,
`setTimeout`, or other async callbacks. (React 18 would batch these; we are not on 18.)

A single `this.setState({ a, b })` is always **one render**. If you split it into
`setA(...); setB(...)`:

- **Inside an event handler** → still one render. Safe to split.
- **Inside an async callback** (`.then`, etc.) → **two renders** in React 17.

**Rule:** when a single async-callback `setState` writes multiple fields, splitting is allowed
**only if no intermediate render is observable**. It is observable-safe when an earlier state
gates the view — e.g. `MetricsCard.fetchData` splits `setData(d); setLoading(false)` because
while `loading` is still `true` the loading branch renders regardless of `data`, so the
transient render is visually identical. When fields are interdependent and a half-updated
render would be visible (e.g. a multi-field invite-success update), **keep them in one state
object** and call its setter once.

Functional updaters carry over directly:

```jsx
// class
this.setState(prev => ({ keys: [...prev.keys, key], newLabel: '' }))
// function (independent fields — fine to split)
setKeys(prev => [...prev, key])
setNewLabel('')
```

For **mutually dependent** fields, keep them in one updater on one object so the new value of
one can read the previous value of another in the same commit:

```jsx
// handleSort — direction depends on the previous column AND direction
setSort(prev => ({
  sortColumn: column,
  sortDirection: prev.sortColumn === column && prev.sortDirection === 'asc' ? 'desc' : 'asc',
}))
```

---

## 6. Pure helpers move to module scope

A method that uses **no** `this` (no props, no state) is a pure function and belongs at
**module scope**, above the component — like `ActivityFeed`'s `tone(severity)` at
[`ActivityFeed.jsx:6`](frontend/src/components/dashboard/ActivityFeed.jsx#L6). This keeps it
from being re-created each render and signals it has no component dependencies.

Helpers that **do** read props/state (e.g. `MetricsCard.formatValue` reads `format`) stay
**inside** the component as closures. Apply per-helper.

---

## 7. Non-render instance fields → `useRef`

Any `this.x` holding mutable data that is **not** rendered and whose change should **not**
trigger a re-render (timers, interval IDs, previous-value caches, subscriptions) becomes a
`useRef`, accessed through `.current`. `ActivityFeed`'s `this.timer` → `timerRef`; the §4a
previous-props cache → `prevFiltersRef`. **Never** put these in `useState`.

---

## 8. Verification checklist (run before declaring done)

1. **Diff the render output mentally against the class `render()`** — JSX, classNames, inline
   styles, keys, text, and a11y attributes are identical.
2. **Side-effect audit:** mount effect runs once; any update effect fires on exactly the
   original condition (§4); no accidental double-fetch on mount; cleanup still clears what it
   cleared.
3. **Batching audit (§5):** no newly-observable intermediate render introduced in any async
   callback.
4. `npm test` — green, **tests unmodified**.
5. `npm run lint:tokens` and `npm run lint:css` — clean (you changed no style literals).
6. No `react-hooks/exhaustive-deps` warning **except** the intentional, commented mount-only
   disable (§3).
7. No leftover `this.`, no `bind`, no `extends React.Component` anywhere in the file.

(Commands run from `frontend/`.)

---

## Escalate, don't silently "fix": render-phase parent callbacks

If a class calls a parent callback **in the render body** (not in a handler or lifecycle
method), the instinctive `useEffect(() => onX(v), [v])` translation **changes behavior** — it
shifts notification from *every render, synchronous* to *on-reference-change, post-paint*.
Exact preservation (keep the call in the function body) and idiomatic hooks genuinely conflict
here. **Do not migrate such a component in isolation** — pair it with a parent-side change and
confirm the intended contract with the author. The repo's instance of this — `UserFilters` —
is documented in [references/targets.md](references/targets.md).
