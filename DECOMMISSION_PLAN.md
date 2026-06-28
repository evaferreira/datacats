# Decommission Plan — Dead & Legacy API Endpoints

## Context

The endpoint audit in [ENDPOINT_REGISTRY.md](ENDPOINT_REGISTRY.md) found that of 28 registered
backend routes, **9 are obsolete**: 7 are dead (no caller anywhere), and 2 are "zombies" —
labeled `// DEAD` in source but still called from the UI through stale, misleading code paths
(`POST /api/v1/legacy/export/bulk` returns a fake job ID and does nothing;
`GET /api/v1/legacy/export/csv` returns 2 hardcoded rows presented as a real data preview).

This plan retires all 9, plus the entire `legacy/export` router, **without ever breaking the
running app**. The ordering is the whole point: a route may only be deleted *after* its callers
no longer depend on it. So we decouple the UI first, then remove dead routes, then remove the
legacy module last.

The two zombie features are handled differently, per the audit:
- **"Export users"** — feature worth keeping → migrate it to a real client-side CSV download using
  the already-present (but unused) helpers in
  [frontend/src/utils/legacyExport.js](frontend/src/utils/legacyExport.js).
- **"Preview export data"** — low-value, misleading feature → retire it with its endpoint.

## Guiding principles (what makes this reversible)

- **One PR / commit per phase.** Each phase is self-contained, so `git revert <phase commit>`
  cleanly undoes it with no manual surgery.
- **No data or schema migrations.** The backend is mock-data only — every change is code-only,
  so every rollback is code-only.
- **Layer decoupling.** Phase 1 touches *frontend only*; Phases 2–3 touch *backend only*. The two
  sides are never edited in the same phase, so a rollback on one side never half-breaks the other.
- **Manual verification.** There is **no backend test suite**. Verification is done by building the
  frontend, running the app, and probing routes with `curl`. Phase boundaries are gates: do not
  start a phase until the previous phase's verification passes.

### Auth note for `curl` checks

All `/api/v1/*` routes sit behind [`auth`](backend/middleware/auth.js), which accepts **any**
`Bearer` token of length ≥ 8. Every verification `curl` below includes
`-H "Authorization: Bearer testtoken123"` so that a missing route returns **404** (the catch-all in
[server.js:43](backend/server.js#L43)) rather than a **401**. `GET /health` needs no auth.

Helper used throughout:
```
status() { curl -s -o /dev/null -w "%{http_code}\n" -H "Authorization: Bearer testtoken123" "$1"; }
```

---

## Phase 0 — Preparation & baseline (no deletions)

**Milestone:** A known-good baseline is captured and the app runs end-to-end, so any later
regression is unambiguous.

**Checklist**
- [ ] Create a working branch off `main` (e.g. `chore/decommission-endpoints`).
- [ ] `npm run install:all` (installs backend + frontend deps).
- [ ] Start the stack: `npm start` (backend on :4000, frontend dev server proxies `/api` → :4000).
- [ ] Smoke the app: Dashboard, Reports, Users, Settings all load without console errors.
- [ ] Record baseline status codes for the obsolete routes (all should respond today):
      `status http://localhost:4000/api/v1/reports/summary` etc.
- [ ] Confirm the two zombie features work today: Users → "Export users" shows "Started job…";
      Settings → API keys → "Preview export data" shows a 2-row sample.

**Verification (safe to proceed):** App builds and runs; baseline codes recorded.

**Rollback:** None needed — no changes made. Delete the branch to abandon.

---

## Phase 1 — Decouple the UI from the legacy routes (frontend only)

Nothing in the backend changes here. After this phase, **no frontend code references
`/api/v1/legacy/export/*`**, which is the precondition for deleting those routes later.

**Milestone:** "Export users" produces a real CSV download with zero network calls; the
"Preview export" feature is gone; `grep` finds no `legacy/export` references in `frontend/src`.

**Checklist**
- [ ] **Export users → client-side CSV.** In [UsersPage.jsx](frontend/src/pages/UsersPage.jsx#L62),
      pass the already-in-memory rows to the button: `<UserExportButton rows={filtered} filters={filters} />`.
- [ ] Rewrite [UserExportButton.handleClick](frontend/src/components/users/UserExportButton.jsx#L14)
      to build the file with `rowsToCsv(this.props.rows)` and trigger `downloadCsv('users.csv', csv)`
      from [utils/legacyExport.js](frontend/src/utils/legacyExport.js); **delete the
      `fetch('/api/v1/legacy/export/bulk', …)` call** and its job-id state/UI.
- [ ] **Retire "Preview export."** In [ApiKeyManager.jsx](frontend/src/components/settings/ApiKeyManager.jsx),
      remove `handlePreviewExport` (which calls `/api/v1/legacy/export/csv`), the related state
      (`previewLoading`/`previewText`/`previewError`), and the entire "Preview export" JSX section
      ([lines 134–148](frontend/src/components/settings/ApiKeyManager.jsx#L134)).
- [ ] Confirm: `grep -rn "legacy/export" frontend/src` → **no results**.

**Verification (safe to proceed)**
- [ ] `npm run build --prefix frontend` → compiles with no errors/lint failures.
- [ ] `npm test --prefix frontend` → existing component tests still pass.
- [ ] Run the app: Users → "Export users" downloads a real `users.csv` containing the current
      (filtered) rows; browser Network tab shows **no** request to `/legacy/export/bulk`.
- [ ] Settings → API keys renders normally with the preview section absent and no console errors;
      no request to `/legacy/export/csv`.
- [ ] The legacy backend routes are untouched and still respond (proves the UI no longer needs them,
      rather than them having been removed).

**Rollback:** `git revert` the Phase 1 commit. Because the backend was never touched, reverting the
frontend restores the exact prior (zombie) behavior. Fully reversible, no coordination needed.

---

## Phase 2 — Remove the truly-dead non-legacy routes (backend only)

Safe to start **only after Phase 1 is verified**. These 7 routes (8 handlers) have no callers, so
removal cannot break the UI. Remove each handler plus the helper that becomes orphaned with it.

**Milestone:** `users.js`, `metrics.js`, `reports.js`, `settings.js` contain only live endpoints;
the server boots cleanly; every removed path returns 404; every live path still returns 200.

**Checklist**
- [ ] [users.js](backend/routes/users.js): remove `GET '/:id'` ([L62](backend/routes/users.js#L62))
      and `POST '/'` ([L77](backend/routes/users.js#L77)). Remove the now-orphaned `db.queryOne`
      stub ([L14–20](backend/routes/users.js#L14-L20)). **Keep `db.query`** — it backs the live
      `GET '/'`.
- [ ] [metrics.js](backend/routes/metrics.js): remove `GET '/revenue-by-plan'`
      ([L123](backend/routes/metrics.js#L123)) and the orphaned `MetricsService.getRevenueByPlan`
      ([L52–60](backend/routes/metrics.js#L52-L60)).
- [ ] [reports.js](backend/routes/reports.js): remove `GET '/summary'`
      ([L45](backend/routes/reports.js#L45)), `GET '/export'` ([L66](backend/routes/reports.js#L66)),
      `POST '/schedule'` ([L71](backend/routes/reports.js#L71)), and the orphaned
      `ReportsService.getSummary` ([L8–16](backend/routes/reports.js#L8-L16)). **Keep
      `getRevenueByPlan` / `getChurnCohorts` / `getFeatureAdoption`** — all live.
- [ ] [settings.js](backend/routes/settings.js): remove `POST '/migrate'`
      ([L92–95](backend/routes/settings.js#L92-L95)).
- [ ] Confirm no dangling references to removed methods: `grep -rn "getSummary\|getRevenueByPlan\|queryOne" backend/routes` returns only `metrics`-unrelated/expected hits (i.e. none for the removed ones).

**Verification (safe to proceed)** — restart the backend, then:
- [ ] Server starts with no errors: `npm run start:backend`.
- [ ] Removed paths now 404:
      `status http://localhost:4000/api/v1/reports/summary` → `404`; repeat for
      `/api/v1/reports/export`, `/api/v1/metrics/revenue-by-plan`,
      `/api/v1/users/u-1001`, `/api/v1/settings/migrate` (POST). All `404`.
- [ ] Live paths unaffected (spot-check): `/api/v1/users`, `/api/v1/metrics/mrr`,
      `/api/v1/reports/revenue-by-plan`, `/api/v1/reports/churn-cohorts`,
      `/api/v1/settings/team`, `/api/v1/settings/api-keys` → all `200`.
- [ ] App smoke test: Dashboard, Reports, Users, Settings all still load and render data.

**Rollback:** `git revert` the Phase 2 commit. Routes/methods are pure additions back; no state
involved, so the revert restores them verbatim.

---

## Phase 3 — Remove the legacy module (backend only)

After Phase 1, all three `legacy/export/*` routes (`csv`, `pdf`, `bulk`) are callerless. Retire the
whole module so no zombies remain.

**Milestone:** [legacyExport.js](backend/routes/legacyExport.js) is deleted, its mount and `require`
are gone from `server.js`, and `/api/v1/legacy/export/*` all return 404.

**Checklist**
- [ ] In [server.js](backend/server.js): remove the `require('./routes/legacyExport')` line and its
      `// TODO: check if this is still needed` comment ([L15–16](backend/server.js#L15-L16)), and
      remove the mount `app.use('/api/v1/legacy/export', auth, legacyExportRouter)`
      ([L41](backend/server.js#L41)).
- [ ] Delete the file `backend/routes/legacyExport.js`.
- [ ] **Keep** [frontend/src/utils/legacyExport.js](frontend/src/utils/legacyExport.js) — despite the
      shared name, this is the *frontend* CSV helper that Phase 1 put into active use for "Export
      users." Only the *backend* route module is being deleted.
- [ ] Confirm: `grep -rn "legacy" backend/` → no remaining route references.

**Verification (safe to proceed)** — restart the backend, then:
- [ ] Server starts with no missing-module errors.
- [ ] All legacy paths 404:
      `status http://localhost:4000/api/v1/legacy/export/csv` → `404`; same for `/pdf` and
      `/bulk` (POST).
- [ ] Full app smoke test: Users → "Export users" still downloads a CSV (client-side, unaffected by
      backend changes); all pages load.

**Rollback:** `git revert` the Phase 3 commit to restore `legacyExport.js` and the `server.js`
mount/require. Self-contained.

---

## Phase 4 — Wrap-up (docs)

**Milestone:** Documentation reflects the new reality.

**Checklist**
- [ ] Update [ENDPOINT_REGISTRY.md](ENDPOINT_REGISTRY.md): drop the removed rows / mark them retired;
      registry now lists 19 live endpoints + `GET /health`.
- [ ] Leave the `lesson/` materials and [PERFORMANCE_AUDIT.md](PERFORMANCE_AUDIT.md) untouched —
      their references to these endpoints are intentional teaching content, not live dependencies.

**Verification:** Registry matches `grep -rn "router\.\(get\|post\|put\|delete\)" backend/routes`.

**Rollback:** Docs-only; revert the commit if needed.

---

## Summary of changes by phase

| Phase | Layer | Action | Endpoints affected |
|---|---|---|---|
| 1 | Frontend | Migrate "Export users" to client-side CSV; retire "Preview export" | `legacy/export/bulk`, `legacy/export/csv` (callers removed) |
| 2 | Backend | Delete dead route handlers + orphaned helpers | `users/:id`, `POST users`, `metrics/revenue-by-plan`, `reports/summary`, `reports/export`, `reports/schedule`, `settings/migrate` |
| 3 | Backend | Delete the legacy export router + its mount | `legacy/export/csv`, `legacy/export/pdf`, `legacy/export/bulk` |
| 4 | Docs | Update the endpoint registry | — |

**Net result:** 28 → 19 live endpoints (+ `GET /health`). Every phase is an independent,
revertible commit; the app stays functional at every boundary.
