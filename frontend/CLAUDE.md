# Frontend conventions

## Custom hooks

- **All custom React hooks live in `src/hooks/`** — one hook per file. Do not define
  reusable hooks inline in components or pages, and do not scatter them under
  `components/` or `utils/`.
- **Name the file after the hook**, and export the hook as the file's `default` export:
  `src/hooks/useDashboardData.js` exports `useDashboardData`.
- Hook names start with `use` (required by React's rules of hooks).
- When a page or component accumulates data fetching + derived state, **extract that
  into a hook in `src/hooks/`** and keep the component focused on layout/presentation.
  Pass inputs (e.g. `filters`) as arguments so the hook stays a pure function of its
  inputs. Reference pattern: [src/hooks/useDashboardData.js](src/hooks/useDashboardData.js)
  (extracted from `DashboardPage.jsx`).
