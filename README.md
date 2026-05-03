# DataCats

Internal analytics dashboard. Legacy app, version 8.2.1.

## Run it

```bash
npm install
npm start
```

- Backend (Express) → http://localhost:4000
- Frontend (CRA)    → http://localhost:3000

The frontend dev server proxies `/api/*` to the backend, so just open http://localhost:3000.

## Layout

```
backend/    Express API
frontend/   React app
```

## Other scripts

- `npm run start:backend`  — backend only
- `npm run start:frontend` — frontend only
- `npm run install:all`    — reinstall both subdirs
