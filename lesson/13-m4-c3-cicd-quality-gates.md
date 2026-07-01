# Demo Brief — Module 4, Clip 3: CI/CD Quality Gates

## What this demo covers
Using AI to stand up automated quality gates on a codebase that has almost none:
characterization tests to lock current behavior before refactoring, then wiring those
tests + lint + build into a GitHub Actions pipeline so regressions are caught before merge.

## Ground truth (verified against the repo)
- **No CI exists.** There is no `.github/` directory at all — so this is "create CI from
  scratch," not "finish an incomplete pipeline."
- **Tests barely exist.** Only [UserRow.test.jsx](../frontend/src/components/users/UserRow.test.jsx)
  and [UserTable.test.jsx](../frontend/src/components/users/UserTable.test.jsx). They're
  **colocated** (`X.test.jsx` next to source) and run via `react-scripts test` (jest + RTL).
  New tests should follow that colocation convention.
- **`calculateRetentionScore(d, e, f)`** in [metrics.js](../frontend/src/utils/metrics.js)
  is genuinely undocumented — cryptic params, `x/y/z` internals, no test. But it *is* used:
  [useDashboardData.js:81](../frontend/src/hooks/useDashboardData.js#L81) calls it as
  `calculateRetentionScore(activeUsers, churnedUsers, avgSessionDays)`. That call site is
  what makes a characterization test meaningful — we can pin real behavior even though the
  function itself explains nothing.
- **`calculateMRR` vs `calculateMRRNew`**: both exist in `metrics.js`, but `calculateMRRNew`
  has **zero callers** — only `calculateMRR` is used ([useDashboardData.js:83](../frontend/src/hooks/useDashboardData.js#L83)).
  The "New version" was written and never adopted. A thorough test pass should surface this.
- **`dates.js` vs `dateUtils.js`** both export `formatDate` with different output
  ("Jan 1, 2024" vs "1/1/2024"), but neither `formatDate` is currently imported anywhere —
  dormant duplication. Secondary note, not the centerpiece.

## What to demonstrate
1. Show the state of quality gates: two colocated component tests, no CI, no project ESLint
   beyond CRA's default. This is all that stands between a change and production.
2. Ask the AI to write a **characterization test** for `calculateRetentionScore` — capturing
   what it does *today*, using the real `(activeUsers, churnedUsers, avgSessionDays)` call
   shape, so we have a behavioral baseline before anyone "cleans it up."
3. Ask it to add tests for the rest of `metrics.js`. Watch whether it notices `calculateMRR`
   vs `calculateMRRNew` and flags that one is dead / whether they're meant to match.
4. (Optional, if time) point it at the `dates.js` / `dateUtils.js` `formatDate` mismatch and
   have it write a test that documents the difference.
5. Ask it to create a **GitHub Actions workflow** (`.github/workflows/ci.yml`) from scratch
   that installs, runs the frontend tests, runs the build, and runs the existing
   `lint:tokens` / `lint:css` guards.
6. Run the tests locally (`npm test --prefix frontend`) to show green, and mention the
   pipeline now runs the same gates on every push.

## Suggested opening AI prompt
"This codebase has almost no automated safety net — two component tests and no CI. I want
to add quality gates before we refactor anything. Start with a characterization test for
`calculateRetentionScore` in `frontend/src/utils/metrics.js` that pins its current behavior
(it's called as `calculateRetentionScore(activeUsers, churnedUsers, avgSessionDays)`). Then
add tests for the other functions in that file. Follow the existing colocated `*.test.jsx`
convention and run via react-scripts/jest."

## Key principle to land
A characterization test locks *current* behavior so a later refactor can prove it didn't
change anything — you write it *before* touching the code, not after. CI then makes that
baseline enforceable on every push. (This is the "lock it down" answer to the "it silently
drifts" problem — no need to reference other clips; state it standalone.)

## Watch for
- The AI may "fix" `calculateRetentionScore` while writing tests — stop it. A characterization
  test asserts what the code *does now*, bugs and all, not what it *should* do.
- Confirm generated tests actually pass before wiring CI, or the pipeline goes red on arrival.
