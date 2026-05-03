# Demo Brief — Module 2, Clip 4: Performance and Efficiency

## What this demo covers
Using AI to identify performance problems: unnecessary re-renders, missing memoization,
redundant API calls, and unoptimized list rendering.

## What to demonstrate
1. Ask the AI to audit the codebase for React performance anti-patterns
2. Show `RevenueChart.jsx` — the buggy `componentDidUpdate` that re-fetches too often
3. Show `UserFilters.jsx` — the re-render loop
4. Show `UserList.jsx` — the unoptimized filter with no useMemo and index-as-key
5. Show `DashboardPage.jsx` — the inline `filters` object causing useEffect to re-run
6. Ask the AI to propose and apply fixes: React.memo, useMemo, useCallback, fixing the condition bug

## What to ignore for this clip
- Class-to-functional migration (Clip 2)
- Architectural decomposition (Clip 3)

## Suggested opening AI prompt
"Please audit this React codebase for performance issues. Look for: unnecessary re-renders,
missing React.memo/useMemo/useCallback, expensive operations running on every render,
and any patterns that would cause components to re-fetch or re-render more than needed."

## Key files to reference
- `src/components/dashboard/RevenueChart.jsx` — buggy componentDidUpdate condition
- `src/components/users/UserFilters.jsx` — re-render loop
- `src/components/users/UserList.jsx` — unoptimized filter + index-as-key
- `src/pages/DashboardPage.jsx` — inline object in dependency array
