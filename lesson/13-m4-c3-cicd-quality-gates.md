# Demo Brief — Module 4, Clip 3: CI/CD Quality Gates

## What this demo covers
A minimal CI pipeline already exists and is green — but green doesn't mean safe: the core
business logic has zero tests. We use AI to close that gap with characterization tests that
lock current behavior, watch the pipeline catch a regression on a PR, and have AI explain a
failing gate.

## Demo shape (decided with Eva)
**Baseline exists → demo extends it.** A minimal `.github/workflows/ci.yml` (install → test →
lint → build) is committed to `module4` and running green *before recording*. On camera we
extend it: generate missing tests, open a PR, and show the gate go green → red → green. Full
setup + rehearsal steps live in the plan: `~/.claude/plans/great-for-the-cicd-playful-patterson.md`.
Runs against the **module4** app state, PR into **module4** (never `main` — that's the pristine
legacy baseline).

## Ground truth (verified against the repo, 2026-07-02)
- **Baseline CI:** [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — a frontend-only
  pipeline (Node 18: `npm ci` → test → `lint:tokens` → `lint:css` → build) that is **green on
  module4 today** (all four gates verified locally). This is the pipeline the demo extends.
- **Tests barely exist.** Only [UserRow.test.jsx](../frontend/src/components/users/UserRow.test.jsx)
  and [UserTable.test.jsx](../frontend/src/components/users/UserTable.test.jsx) — colocated
  (`X.test.jsx` next to source), run via `react-scripts test` (jest + RTL). `metrics.js` has
  **zero** tests. That gap is the demo's whole point: the pipeline is green, but nothing guards
  the business logic. New tests should follow the colocation convention.
- **`calculateRetentionScore(d, e, f)`** in [metrics.js](../frontend/src/utils/metrics.js)
  is genuinely undocumented — cryptic params, `x/y/z` internals, no test. But it *is* used:
  [useDashboardData.js:81](../frontend/src/hooks/useDashboardData.js#L81) calls it as
  `calculateRetentionScore(activeUsers, churnedUsers, avgSessionDays)`. That call site is
  what makes a characterization test meaningful — we pin real behavior even though the
  function itself explains nothing.
- **`calculateMRR` vs `calculateMRRNew`**: both exist in `metrics.js`, but `calculateMRRNew`
  has **zero callers** — only `calculateMRR` is used ([useDashboardData.js:83](../frontend/src/hooks/useDashboardData.js#L83)).
  The "New version" was written and never adopted. A thorough test pass should surface this.
- **`dates.js` vs `dateUtils.js`** both export `formatDate` with different output
  ("Jan 1, 2024" vs "1/1/2024"), but neither `formatDate` is currently imported anywhere —
  dormant duplication. Secondary note, not the centerpiece.

## What to demonstrate (on-camera flow)
1. Open the Actions tab — the pipeline is **green**. Land the hook: `metrics.js` has zero
   tests, so a green pipeline is a false sense of safety. A gate only guards what it tests.
2. Cut a branch off `module4`. Ask the AI to write a **characterization test** for
   `calculateRetentionScore` — capturing what it does *today*, using the real
   `(activeUsers, churnedUsers, avgSessionDays)` call shape — plus tests for the rest of
   `metrics.js`. Watch whether it notices `calculateMRRNew` is dead.
3. (Optional, if time) point it at the `dates.js` / `dateUtils.js` `formatDate` mismatch and
   have it write a test documenting the difference.
4. Commit, push the branch, open a **PR into `module4`** — CI runs the new tests green on the PR.
5. **Regression beat:** change `calculateRetentionScore`'s math, push → the characterization
   test turns the gate **red** on the PR → ask AI to explain the failing gate → revert → green.
   That's the "the gate caught the refactor" payoff.

## Suggested opening AI prompt
"Our CI is green, but `frontend/src/utils/metrics.js` has no tests — so nothing guards the
business logic. Before we refactor anything, write a characterization test for
`calculateRetentionScore` that pins its current behavior (it's called as
`calculateRetentionScore(activeUsers, churnedUsers, avgSessionDays)`), then add tests for the
other functions in that file. Follow the existing colocated `*.test.jsx` convention and run
via react-scripts/jest. Don't change the implementation — just capture what it does today."

## Key principle to land
A characterization test locks *current* behavior so a later refactor can prove it didn't
change anything — you write it *before* touching the code, not after. CI then makes that
baseline enforceable on every push and every PR. (This is the "lock it down" answer to the
"it silently drifts" problem — state it standalone, no cross-clip references.)

## Watch for
- The AI may "fix" `calculateRetentionScore` while writing tests — stop it. A characterization
  test asserts what the code *does now*, bugs and all, not what it *should* do.
- Rehearse first (see plan): confirm the generated tests pass on unchanged code, and that
  altering `calculateRetentionScore` actually turns the gate red. A gate that doesn't bite
  isn't a gate.
