# Demo Brief — Module 3, Clip 5: Bootstrap Migration at Scale

## What this demo covers
Using completed migration examples to guide AI in migrating Bootstrap components
consistently across 15 files — demonstrating example-driven, repeatable AI workflows.

## What to demonstrate
1. Show the two completed migration examples in `src/components/ui/examples/`
2. Ask the AI to use these examples as a pattern and identify all Bootstrap Button usages
3. Ask the AI to migrate ALL Bootstrap Buttons across the codebase in one pass
4. Do the same for Bootstrap Badges
5. Show how to verify the changes are consistent using a follow-up audit prompt
6. Discuss: what needs human review vs what can be merged with confidence

## What to ignore for this clip
- Deep architectural changes
- CSS/token migration (Clip 4)
- Non-Button/Badge Bootstrap components (save those for a live exercise)

## Suggested opening AI prompt
"I have two migration examples in `src/components/ui/examples/`. Using these examples
as your guide, please find every Bootstrap `btn` class usage across the entire frontend
and migrate them to use the `<Button>` component from `src/components/ui/`. Apply the
same change consistently across all files. Do not change anything else."

## Files with Bootstrap Button or Badge usage (15 total)
DashboardPage.jsx, UsersPage.jsx, ReportsPage.jsx, SettingsPage.jsx,
MetricsCard.jsx, UserTable.jsx, UserFilters.jsx, UserRow.jsx,
UserExportButton.jsx, ReportTable.jsx, ReportFilters.jsx,
TeamSettings.jsx, ApiKeyManager.jsx, Sidebar.jsx, TopBar.jsx

## Key files to reference
- `src/components/ui/Button.jsx` — the target component
- `src/components/ui/Badge.jsx` — the target component
- `src/components/ui/examples/Button.migration-example.md`
- `src/components/ui/examples/Badge.migration-example.md`
