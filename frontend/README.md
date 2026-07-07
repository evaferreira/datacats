# DataCats Frontend

React (CRA) single-page app for the DataCats analytics dashboard.

## Running

```bash
npm start      # dev server on http://localhost:3000
```

Requires the backend running on `http://localhost:4000` — the dev server
proxies API requests there (see `proxy` in package.json). From the repo
root you can start both with `npm start`.

## Scripts

| Command               | What it does                                  |
|-----------------------|-----------------------------------------------|
| `npm start`           | Start the CRA dev server (port 3000)          |
| `npm run build`       | Production build into `build/`                |
| `npm test`            | Run tests once (non-watch)                    |
| `npm run lint:tokens` | Grep guard: no hardcoded color/spacing values |
| `npm run lint:css`    | stylelint over `src/**/*.css`                 |

Run both lint scripts before committing styling changes.

## Stack

- React 17 + react-router-dom 5 (`BrowserRouter` / `Switch`)
- Recharts for charts, Bootstrap 4 for base styles
- Create React App (react-scripts 5)

## Layout

```
src/
  pages/        One component per route (Dashboard, Users, Reports, Settings)
  components/   Feature-grouped UI (dashboard/, reports/, users/, layout/, ui/, charts/)
  hooks/        Custom React hooks — one per file (see CLAUDE.md)
  utils/        API clients, formatters, date helpers
  constants/    App config
  styles/       CSS, incl. main.css design tokens (--dc-* custom properties)
```

Routes are declared in `src/App.js`.

## Conventions

See [CLAUDE.md](CLAUDE.md) for the enforced rules:
- Custom hooks live in `src/hooks/`, one per file, named after the hook.
- Colors/spacing/type come from `--dc-*` tokens in `src/styles/main.css` —
  never hardcode literals.
