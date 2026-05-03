# Demo Brief — Module 2, Clip 3: Architectural Refactoring

## What this demo covers
Using AI to decompose a large, monolithic component into smaller, focused
components, custom hooks, and utility functions.

## What to demonstrate
1. Ask the AI to analyze `DashboardPage.jsx` and describe all the responsibilities it has
2. Ask the AI to propose a decomposition plan (what to extract, where it should live)
3. Extract data fetching into custom hooks: `useDashboardMetrics`, `useActivityFeed`
4. Extract the inline utility functions into `utils/` (they already exist there — show the duplication)
5. Ask the AI to update any affected tests or imports

## What to ignore for this clip
- Fixing all utility duplication across the whole codebase (that's Module 3)
- Performance optimization (Clip 4)
- The class components (Clip 2)

## Suggested opening AI prompt
"Please analyze `src/pages/DashboardPage.jsx`. List every distinct responsibility this
component has. Then propose a refactoring plan: what should be extracted into custom hooks,
what should move to utility files, and what smaller components should be created.
Don't make any changes yet — just give me the plan."

## Key files to reference
- `src/pages/DashboardPage.jsx` — the monolith (~450 lines)
- `src/utils/metrics.js` — shows the duplicated utility functions
- `src/utils/dates.js` — shows the duplicated date formatters

## Expected outcome shape
- `src/hooks/useDashboardMetrics.js` (new)
- `src/hooks/useActivityFeed.js` (new)
- `src/pages/DashboardPage.jsx` (reduced to ~150 lines of pure rendering)
