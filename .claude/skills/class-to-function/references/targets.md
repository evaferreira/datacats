# Migration targets & progress (datacats `frontend/`)

Companion to [SKILL.md](../SKILL.md). This file tracks **which class components remain** and
the per-file trap each one carries. Update the Status column and Progress line as you go.

Grouped by how much judgment the conversion needs:

- **Simple** = mechanical.
- **Medium** = mechanical but with a documented trap to avoid.
- **Complex** = preserving exact behavior is itself the hard part.

**Progress:** 3 / 9 migrated — all three Simple targets are done (verified: tests green,
`lint:tokens`/`lint:css` clean, ESLint clean, no class residue).

| Component | Complexity | Status | Why |
|---|---|---|---|
| [`dashboard/MetricsSummary.jsx`](frontend/src/components/dashboard/MetricsSummary.jsx) | **Simple** | ✅ Done | No state, no lifecycle, no constructor. One `formatValue` closure (reads `format`) + `return`. |
| [`users/UserExportButton.jsx`](frontend/src/components/users/UserExportButton.jsx) | **Simple** | ✅ Done | 3 independent state fields, one click handler, no lifecycle, no prop-diffing. |
| [`reports/ReportFilters.jsx`](frontend/src/components/reports/ReportFilters.jsx) | **Simple** | ✅ Done | Notifies parent (`onApply`) only **on click** — no render-phase side effect. Nested filter object → one `useState`. |
| [`reports/ChurnCohortChart.jsx`](frontend/src/components/reports/ChurnCohortChart.jsx) | **Medium** | ⬜ Pending | `componentDidUpdate` on a **primitive** `refreshKey` → collapse to `useEffect(fn, [refreshKey])` (§4b). Trap: keeping a separate `[]` mount effect double-fetches. |
| [`settings/ApiKeyManager.jsx`](frontend/src/components/settings/ApiKeyManager.jsx) | **Medium** | ⬜ Pending | High surface (6 state fields, 4 handlers, inline `setState` in JSX, functional updaters), but no prop-diffing. Watch §5 splitting in `.then`. |
| [`settings/TeamSettings.jsx`](frontend/src/components/settings/TeamSettings.jsx) | **Medium** | ⬜ Pending | Largest target (9 fields). Two traps: dynamic `setState({ [field]: value })` (§2 — prefer one object) and the multi-field invite-success update (§5 — keep atomic). |
| [`users/UserTable.jsx`](frontend/src/components/users/UserTable.jsx) | **Medium** | ⬜ Pending | Interdependent `sortColumn`+`sortDirection` update (§5 — combine). **Has a test that must stay green** ([`UserTable.test.jsx`](frontend/src/components/users/UserTable.test.jsx)). Preserve `const data2 = data` quirk verbatim. |
| [`reports/ReportTable.jsx`](frontend/src/components/reports/ReportTable.jsx) | **Medium** | ⬜ Pending | Same sort-state wrinkle as `UserTable`, **plus** initial `sortColumn` derived from props once → lazy initializer (§2), not a resync effect. |
| [`users/UserFilters.jsx`](frontend/src/components/users/UserFilters.jsx) | **Complex** | ⬜ Pending | Calls `this.props.onFiltersChange(this.state.filters)` **during render**. See escalation below — do not migrate in isolation. |

---

## The one to escalate, not silently "fix": `UserFilters`

`UserFilters` calls the parent callback **in the render body**, on every render including
mount:

```jsx
render() {
  // ...
  if (this.props.onFiltersChange) {
    this.props.onFiltersChange(this.state.filters)   // ← render-phase side effect
  }
  // ...
}
```

This is a render-phase parent update (it already emits React's "Cannot update a component
while rendering a different component" warning today — the quirk is **pre-existing**, not
introduced by migration). The hazard is that the *instinctive* hook translation —
`useEffect(() => onFiltersChange(filters), [filters])` — **changes behavior**:

- **Frequency:** the class notifies on *every* render; a `[filters]` effect notifies only when
  `filters` changes by reference.
- **Timing:** the class notifies *synchronously during render*; an effect notifies *after
  paint*. A parent that reads filters during its own render would see a one-frame-stale value.

A byte-faithful port keeps the call in the function body (reproducing both the behavior and
the warning); the "correct React" port is a behavior change. Because neither is clearly right
without knowing what the parent expects, **do not migrate `UserFilters` in isolation** — pair
it with a parent-side change (lift the callback into an event handler or a parent-side effect)
and confirm the intended notification contract with the author. This is the only target where
exact behavior preservation and idiomatic hooks genuinely conflict.
