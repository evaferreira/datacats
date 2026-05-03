# Demo Brief — Module 2, Clip 1: Class Component Audit

## What this demo covers
Using AI to audit the codebase for class components, assess their complexity,
and identify which are the best candidates for migration to functional components with hooks.

## What to demonstrate
1. Ask the AI to find all class components in the codebase
2. Ask the AI to rank them by migration complexity (simple → complex)
3. Ask the AI to identify which ones share similar patterns (e.g., ReportTable vs UserTable)
4. Ask the AI to flag any class components that appear to be dead code (like QuickStats)
5. Ask the AI to output a migration priority list

## What to ignore for this clip
- Actually migrating components (that's Clip 2)
- Architecture (that's Clip 3)
- Bootstrap (that's Module 1 / Module 3)

## Suggested opening AI prompt
"Can you audit this codebase and find all React class components? For each one,
tell me: what it does, how complex it is to migrate to a functional component,
and whether it appears to be actively used. Then give me a prioritized list of
which ones to migrate first."

## Class components to find (14 total: 13 from initial-state + StatsPanel added in this branch)
MetricsCard, MetricsSummary, RevenueChart, ActivityFeed, QuickStats (dead),
UserTable, UserFilters, UserExportButton, ReportTable, ReportFilters,
ChurnCohortChart, TeamSettings, ApiKeyManager, StatsPanel (new in this branch)

## Key files to reference
- `src/components/dashboard/` — 6 class components (including MetricsSummary and StatsPanel)
- `src/components/users/` — 3 class components
- `src/components/reports/` — 3 class components
- `src/components/settings/` — 2 class components
