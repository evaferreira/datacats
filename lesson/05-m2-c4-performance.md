# Demo Brief — Module 2, Clip 4: Performance and Efficiency

## What this clip covers
AI as a performance auditor. Outline framing: unnecessary renders, oversized
components, duplicated requests, inefficiencies. This codebase has at least
five real performance bugs, several of them invisible to the eye.

## Demo shape (role in the module rhythm)
**Focused mini-audit + runtime observation + surgical fix.** Unlike Clip 1,
the audit here happens **in chat** — AI lists findings in the conversation,
not in a new markdown file. The visual differentiator is **runtime
observation**: DevTools network tab open, bug visible, fix applied, bug gone.
No other clip in M2 has this shape.

## Continuity
- **Reads:** `MIGRATION_AUDIT.md` from Clip 1 — but only to confirm we're
  *not* re-doing the code-quality audit. This clip's audit is a different
  lens: performance, not structure.
- **Writes:** code fixes only. No new audit document; findings live in chat.
- Independent of Clip 2/3 state — seeded perf bugs sit in both class and
  functional components.

## The seeded perf bugs (inventory)

1. **`DashboardPage.jsx` — inline `filters` object** at [line 36](frontend/src/pages/DashboardPage.jsx#L36). Rebuilt every render → `useEffect([filters])` at [line 88-95](frontend/src/pages/DashboardPage.jsx#L88-L95) re-fires every render → MRR re-fetched on every render.
2. **`DashboardPage.jsx` — useEffect with no dep array** at [line 98-102](frontend/src/pages/DashboardPage.jsx#L98-L102). Plan-revenue endpoint hit on every render.
3. **`RevenueChart.jsx` — wrong comparison** at [line 19](frontend/src/components/dashboard/RevenueChart.jsx#L19): `if (this.props.dateRange >= prevProps.dateRange)` should be `!==`. Causes either too few or too many fetches depending on string ordering.
4. **`UserFilters.jsx` — render-loop** at [line 28-31](frontend/src/components/users/UserFilters.jsx#L28-L31). Already discussed in Clip 2 brief; this is its perf consequence.
5. **`UserTable.jsx` — unmemoized sort/paginate** at [line 37-51](frontend/src/components/users/UserTable.jsx#L37-L51). Re-sorts the whole list on every render.

## Candidate demos (pick one)

### Option A — In-chat perf audit + one centerpiece fix (the inline `filters` object)
Two beats:
1. Open with the *performance lens*: "Audit this codebase specifically for React performance anti-patterns — unnecessary renders, broken dep arrays, missing memoization, repeated requests." AI surfaces the list of findings in chat (not a written doc).
2. Pick the most universally-relatable: the inline `filters` object. AI explains why it breaks the dep array, then fixes it with `useMemo` (or stable primitive deps).

**Shines because:** the inline-object bug is something *every* React dev has shipped. Highest "I've done that" hit rate. Setting up the perf audit as a *separate lens* from Clip 1 teaches the meta-lesson about scoped audits.

### Option B — Subtle-bug centerpiece (the `>=` in `RevenueChart`)
Audit + fix the comparison bug in `RevenueChart.componentDidUpdate`. AI explains why `>=` *almost* works but causes the wrong fetch pattern, then fixes it to `!==` (and ideally points out the whole component should migrate to functional).

**Shines because:** it makes AI look smart in a way that's hard to fake. Most reviewers would miss this. Risk: the bug is harder to *show* on screen — you'd need network-tab footage or an instrumented `console.log` to make the misbehavior visible.

### Option C — `React.memo` / `useMemo` / `useCallback` tour
Audit produces the same findings, but the fix is a tour of memoization primitives applied across `MetricsCard`, `UserTable`, and `UserRow`. Teaches the React perf toolkit explicitly.

**Shines because:** highest *educational* density — viewers leave knowing when each primitive applies. Risk: it's more "lesson" than "demo," and several fixes mean less time per fix.

### Option D — "Show me the waterfall" demo (strong alternative)
Open DevTools network tab on the dashboard, point out the repeated MRR requests, *then* ask AI to explain why. AI traces it back to the inline `filters` object and the missing dep array. Fix and re-open the network tab to show the requests are gone.

**Shines because:** strongest visual proof and the only runtime-observation shape in M2. The before/after waterfall is undeniable. Risk: requires more setup (running the app live, opening DevTools mid-clip) and the recording is a bit more fragile. *If you can absorb the recording cost, this is the most distinctive shape in the module.*

### Option E — Unmemoized sort/paginate fix (`UserTable`)
Focus on `UserTable`'s `sortAndPaginate` running every render. AI either migrates the class to functional + adds `useMemo`, or (cheaper) wraps the call in `React.memo`. Bonus: the index-as-key concern in the row map.

**Shines because:** concrete, visible fix on a table — viewers can imagine their own data tables. Risk: not as universally relatable as the inline-object bug, and there's overlap with Clip 2's `UserFilters` work.

## My take
**Option D** is the recommended path now that we've committed to every clip having a *distinct shape*. The live network waterfall is the only runtime-observation moment in M2 and earns its recording cost. **Option A** is the safer fallback if the live-app setup feels fragile — the inline-object fix is the most universally-felt bug. Either way, the *audit* part of the clip is conversational, not a written document.

## What to ignore for this clip
- Class-to-functional migration (Clip 2)
- Architectural decomposition (Clip 3)
- Bundle size / build-time perf — different problem class, not in scope

## Suggested opening AI prompt
> "We already audited this codebase for code quality. Now I want a separate audit through a different lens: **performance**. Look for unnecessary re-renders, missing memoization, expensive operations running every render, missing or wrong dependency arrays, and patterns that cause components to re-fetch or re-render more than needed. List the findings with file paths and explanations — just in chat, no document this time."

## Key files to reference
- [src/pages/DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) — inline filters, missing dep array
- [src/components/dashboard/RevenueChart.jsx](frontend/src/components/dashboard/RevenueChart.jsx) — wrong comparison
- [src/components/users/UserFilters.jsx](frontend/src/components/users/UserFilters.jsx) — render loop
- [src/components/users/UserTable.jsx](frontend/src/components/users/UserTable.jsx) — unmemoized sort/paginate
