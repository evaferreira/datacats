# Demo Brief — Module 2, Clip 2: Class to Functional Migration

## What this demo covers
Using AI to migrate React class components to functional components with hooks,
following a consistent pattern that can be applied across the codebase.

## What to demonstrate
1. Start with `MetricsCard.jsx` — ask the AI to migrate it to a functional component
2. Walk through what changed: constructor→useState, componentDidMount→useEffect, etc.
3. Show the AI catching and fixing the JSON.stringify comparison bug during migration
4. Migrate `ActivityFeed.jsx` — demonstrate the setInterval cleanup pattern
5. Migrate `UserFilters.jsx` — show the AI catching the re-render loop bug in render()
6. Update `MIGRATION_NOTES.md` to mark completed items

## What to ignore for this clip
- Architectural changes (Clip 3)
- Fixing all 13 class components — just do 2-3 as examples

## Suggested opening AI prompt
"I want to migrate `src/components/dashboard/MetricsCard.jsx` from a React class component
to a functional component with hooks. Please migrate it, maintaining the same behavior,
and explain each change. Flag any bugs you notice in the original that we should fix during migration."

## Key files to reference
- `src/components/dashboard/MetricsCard.jsx`
- `src/components/dashboard/ActivityFeed.jsx`
- `src/components/users/UserFilters.jsx`
- `MIGRATION_NOTES.md`

## Watch for
The `UserFilters` re-render loop: `onFiltersChange` called inside `render()`.
AI should catch this and move it to a `useEffect` or event handler.
