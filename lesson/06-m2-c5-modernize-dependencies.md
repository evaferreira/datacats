# Demo Brief — Module 2, Clip 5: Modernizing Frameworks and Dependencies

## What this demo covers
Using AI to audit dependencies for outdated versions, deprecations, security issues,
and to plan incremental upgrades.

## What to demonstrate
1. Ask the AI to review `package.json` files and identify outdated or deprecated dependencies
2. Focus on `moment` in the backend — ask AI to migrate one route from moment to date-fns
3. Ask AI to explain the React Router v5 → v6 migration path and what would break
4. Ask AI to complete `DEPENDENCY_AUDIT.md` with its findings
5. Show how AI can make repetitive migration work (replacing moment calls) faster

## What to ignore for this clip
- Deep framework upgrades (React 17 → 18) — too large for a single clip demo
- CSS/Bootstrap migration (Module 1 / Module 3)

## Suggested opening AI prompt
"Please audit the `package.json` files in this project. For each dependency, tell me:
current version, whether it's outdated or deprecated, whether there are security concerns,
and how complex an upgrade would be. Then prioritize which to tackle first."

## Key files to reference
- `frontend/package.json`
- `backend/package.json`
- `backend/routes/metrics.js` (uses moment)
- `DEPENDENCY_AUDIT.md`
