# Demo Brief — Module 4, Clip 1: Why Refactors Break Production

> ⚠️ **STALE — do not use as-is (flagged 2026-07-01).** This brief predates the Module 2
> migrations. Example 1 is dead: `RevenueChart.jsx` is already a function component with a
> `useEffect([dateRange])` — there is no `componentDidUpdate` / `>=`→`!==` to "accidentally
> break." `REGRESSION_EXAMPLES.md` was never created and the paths are `src/...` (repo uses
> `frontend/src/...`). **Demo decision deferred until we see the C1 slide deck.** Likely
> replacement (robust, grounded): ask AI to "improve" the undocumented
> `calculateRetentionScore(d, e, f)` in [metrics.js](../frontend/src/utils/metrics.js) — it
> confidently changes behavior it can't verify, and neither can we without a baseline. That
> makes the failure modes concrete and sets up C3's characterization test. Everything below
> is kept for reference only.

---


## What this demo covers
Understanding common failure modes in refactoring: hidden dependencies, silent behavioral
changes, load-bearing bugs, and overconfidence in AI-generated changes.

## What to demonstrate
1. Open `REGRESSION_EXAMPLES.md` — walk through each example as a discussion anchor
2. For Example 1 (RevenueChart): ask the AI to "clean up" the componentDidUpdate condition.
   Show how the AI naturally fixes `>=` to `!==` — which may or may not be correct.
   The point: the AI cannot know if this was intentional. Neither can you without tests.
3. For Example 3 (calculateRetentionScore): ask the AI to explain what the function does.
   Show how it can only guess — no variable names, no comments, no tests.
   Then ask the AI to generate a characterization test before any changes are made.
4. Discuss: what is a characterization test, and why do we write it before refactoring,
   not after?

## Key principle to land
Small, isolated changes are safer than large rewrites. Always establish a behavioral
baseline (via tests or observation) before asking AI to refactor anything critical.

## Key files to reference
- `REGRESSION_EXAMPLES.md` — the four teaching examples
- `src/components/dashboard/RevenueChart.jsx` — Example 1
- `src/components/users/UserFilters.jsx` — Example 2
- `src/utils/metrics.js` — Example 3 (calculateRetentionScore)
- `src/utils/api.js`, `apiHelpers.js`, `apiClient.js` — Example 4
