# Frontend conventions

## Custom hooks

- **All custom React hooks live in `src/hooks/`** — one hook per file. Do not define
  reusable hooks inline in components or pages, and do not scatter them under
  `components/` or `utils/`.
- **Name the file after the hook**, and export the hook as the file's `default` export:
  `src/hooks/useDashboardData.js` exports `useDashboardData`.
- Hook names start with `use` (required by React's rules of hooks).
