# Demo Brief — Module 4, Clip 3: CI/CD Quality Gates

## What this demo covers
Using AI to establish automated quality gates: generating missing tests,
setting up ESLint, and building out a CI pipeline that catches regressions before merge.

## What to demonstrate
1. Show the incomplete CI config and the single test file — this is all that exists
2. Ask the AI to generate characterization tests for `utils/metrics.js`
3. Ask the AI to generate tests for `utils/dates.js` and `utils/dateUtils.js` — including tests that expose the inconsistency between them
4. Ask the AI to set up an ESLint config appropriate for React 17
5. Ask the AI to complete the GitHub Actions CI workflow (add test, lint, build steps)
6. Run the linter — show what it flags in the existing codebase

## Suggested opening AI prompt
"This codebase has almost no tests and no linting. I want to add quality gates.
First, can you generate a thorough test suite for `src/utils/metrics.js`?
Then set up an ESLint config with React-appropriate rules.
Finally, update the GitHub Actions CI workflow to run tests and linting on every push."

## Key files to reference
- `.github/workflows/ci.yml` — the incomplete pipeline
- `frontend/src/utils/__tests__/metrics.test.js` — the one existing test
- `frontend/src/utils/metrics.js` — has `calculateMRR` and `calculateMRRNew` (both present!)
- `frontend/src/utils/dates.js` vs `utils/dateUtils.js` — tests should expose the format difference

## Watch for
Tests for `calculateMRR` vs `calculateMRRNew` — the AI should notice both exist and ask
or flag whether they're supposed to behave the same way.
