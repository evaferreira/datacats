# Demo Brief — Module 3, Clip 4: Design Consistency Audit

## What this demo covers
Using AI to audit an entire codebase for design inconsistencies —
color values, font sizes, spacing — and propose a unified token system.

## What to demonstrate
1. Ask the AI to find every unique color hex value used across all CSS files and inline styles
2. Ask the AI to group similar colors ("these 6 blues are probably all meant to be brand primary")
3. Ask the AI to find all font-size values used — how many distinct sizes are there?
4. Ask the AI to find all spacing values — px vs rem vs Bootstrap utilities
5. Ask the AI to propose a CSS custom property token system to standardize them
6. Ask the AI to show what a migration from a hardcoded value to a token would look like in one file

## What to ignore for this clip
- Actually migrating all files (just audit and propose)
- Bootstrap migration (Module 1)
- The 15-file migration (Clip 5)

## Suggested opening AI prompt
"Please audit all CSS files and inline styles in the frontend for design consistency.
I want to know: how many distinct color values are used, how many font-size values,
and how spacing is applied. Group similar values together and tell me what a
CSS custom property token system should look like to bring consistency."

## Key files to reference
- `frontend/src/styles/main.css`
- `frontend/src/styles/dashboard.css`
- `frontend/src/styles/users.css`
- `frontend/src/styles/reports.css`
- `frontend/src/styles/settings.css`
- `frontend/src/styles/bootstrap-overrides.css`
- Inline styles in: `MetricsCard.jsx`, `Sidebar.jsx`, `TopBar.jsx`, `UserRow.jsx`

## What to find
- 6+ different blue hex values
- 6+ different font-size values for "small text"
- 3 different spacing approaches (px, rem, var(--dp-spacing-*))
