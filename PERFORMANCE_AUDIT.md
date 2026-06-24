# DataCats — Performance Audit

_Date: 2026-06-16. Scope: `frontend/` (React 17 + react-scripts) and `backend/` (Express 4)._

This audit was prompted by an infinite MRR re-fetch loop found on the dashboard
(unstable `filters` object dependency in `useDashboardData` — **already fixed**). That
bug turned out to be one instance of a broader pattern, so we swept the whole app for
performance issues.

Findings were gathered by parallel code exploration and the highest-severity items were
manually verified against source. Severity reflects real-world impact, not just code
smell.

## TL;DR — what to fix first

| # | Issue | Area | Severity |
|---|-------|------|----------|
| 1 | `UserFilters` calls `onFiltersChange` **during render** → render loop on the Users page | Frontend | **Critical** |
| 2 | Async report routes have **no error handling** → unhandled rejection hangs the request | Backend | **Critical** |
| 3 | Duplicate metric fetches: hook + 4 `MetricsCard`s + `RevenueChart` all hit `/metrics/*` (MRR fetched ~3×) | Data fetching | **High** |
| 4 | Three divergent `fetchWithAuth` implementations (3 token keys, inconsistent `/api/v1` prefix) | Architecture | **High** |
| 5 | No request cancellation (`AbortController`) anywhere → wasted requests + setState-after-unmount | Data fetching | **High** |
| 6 | All Settings tabs mount eagerly → 3 fetches when 1 is needed | Frontend | **Medium** |
| 7 | No route-level code splitting; Recharts in main bundle (~586 KB) | Bundle | **Medium** |
| 8 | Per-render sort/paginate/derive (no memoization) in tables & dashboard hook | Frontend | **Medium** |
| 9 | Artificial `setTimeout` delays + no compression/cache headers on backend | Backend | **Medium** |

---

## Frontend (React render / re-render)

### Critical

**C1 — `UserFilters` calls a parent setter inside `render()`**
[frontend/src/components/users/UserFilters.jsx:28-31](frontend/src/components/users/UserFilters.jsx#L28-L31)
```js
// Notify parent — but inside render. Don't ask.
if (this.props.onFiltersChange) {
  this.props.onFiltersChange(this.state.filters)
}
```
Calling the parent's state setter during render makes the parent re-render, which
re-renders this child, which calls the setter again. On the Users page this is the same
class of defect as the MRR loop — wasted renders and (because `UsersPage` filters
client-side) repeated work on every cycle. **Fix:** notify the parent from
`handleChange`/`componentDidUpdate`, never from `render`.

### High / Medium

**M1 — Per-render derived data in `useDashboardData`**
[frontend/src/hooks/useDashboardData.js:74-91](frontend/src/hooks/useDashboardData.js#L74-L91)
`churnedUsers` (`.filter`), `avgSessionDays` (`.reduce` + date math), `planRevenueChart`
(`.map`), and `recentSignups` (`.slice().sort().slice()`) all recompute on every render
even when their inputs are unchanged. Wrap in `useMemo` keyed on the relevant source
arrays.

**M2 — Tables sort + paginate on every render**
[frontend/src/components/users/UserTable.jsx](frontend/src/components/users/UserTable.jsx)
(`sortAndPaginate`, ~L37-56) and the near-identical
[frontend/src/components/reports/ReportTable.jsx](frontend/src/components/reports/ReportTable.jsx)
(~L37-58) run an O(n log n) sort + slice on every render, regardless of whether data,
sort column, or page changed. Memoize (or recompute only when the relevant props/state
change). Both files also carry a pointless `const data2 = data` alias.

**M3 — `JSON.stringify` deep-compare in `componentDidUpdate`**
[frontend/src/components/dashboard/MetricsCard.jsx:18-22](frontend/src/components/dashboard/MetricsCard.jsx#L18-L22)
and [frontend/src/components/dashboard/MetricsSummary.jsx](frontend/src/components/dashboard/MetricsSummary.jsx) (~L18-22)
stringify props on every parent render to decide whether to refetch/recalc. Cheap
individually, but it runs for all four dashboard cards on every dashboard render. With a
stable, memoized `filters` (now in place) a shallow/value compare is enough.

**M4 — `ActivityFeed` is force-remounted on refresh**
[frontend/src/pages/DashboardPage.jsx:256](frontend/src/pages/DashboardPage.jsx#L256) uses
`key={'feed-' + pollTick}`, so "Force refresh" destroys and recreates the component (and
its 30s interval) instead of just re-fetching. Pass `pollTick` as a prop and refetch on
change, or drop the key churn.

### Low

- **Duplicate inline utilities.** `formatCurrency` / `formatDate` / `getStatusTone` are
  redefined inline in [DashboardPage.jsx:42-58](frontend/src/pages/DashboardPage.jsx#L42-L58)
  despite living in `utils/formatters.js` / `utils/dates.js`. Import the shared ones.
- **Charts not memoized.** `LineChart` / `BarChart` / `RevenueChart` wrappers re-render
  with the parent even when data is unchanged; `React.memo` + memoized data would help.
- **Dead component still imported.** `QuickStats` is imported in `App.js` but never
  rendered (and itself fetches 3 metrics). Remove it.

---

## Backend (Express)

### Critical

**C2 — Async routes with no error handling**
[backend/routes/reports.js:45-63](backend/routes/reports.js#L45-L63)
```js
router.get('/summary', async (req, res) => {
  const data = await ReportsService.getSummary() // unhandled rejection if this throws
  res.json(data)
})
```
None of the `reports.js` async handlers have try/catch. If the awaited call rejects, the
promise rejection is unhandled and **no response is ever sent** — the request hangs until
the client times out. `/revenue-by-plan` here is on the dashboard's hot path, so under a
failure this leaves dashboard loads hanging and can tie up connections under load. **Fix:**
wrap handlers (or add an async error-handling wrapper / Express 5-style forwarding) so
rejections produce a 500. Also remove the two dead endpoints (`/export`, `/schedule`).

### Medium / Low

**B1 — Artificial latency injected per request**
- [backend/routes/users.js](backend/routes/users.js) wraps the mock DB in `setTimeout(..., 5)`
  on both `query` and `queryOne`.
- [backend/routes/metrics.js](backend/routes/metrics.js) adds `setTimeout(..., 8)` in
  `getMRR`/`getChurn`.
Since the dashboard fans out to several metric endpoints, these stack into avoidable
latency on every load. These read as demo-realism delays — if so, document them; they are
pure overhead in production.

**B2 — No compression or cache headers**
[backend/server.js:21-23](backend/server.js#L21-L23) mounts `cors`, `express.json`, and a
logger but no `compression`, and no route sets `Cache-Control`/`ETag`. The metric
histories are memoized at module load (good — `metrics.js:10-12`) and are effectively
static per server run, yet clients re-download them uncompressed on every request. Add
`compression` and cache headers for the static-ish metric/report responses.

**B3 — Per-request reformatting & micro-inefficiencies**
- [backend/routes/settings.js](backend/routes/settings.js): `formatTimestamp` (moment.js)
  runs per API key on every `GET /api-keys`, and `GET /team` defers via `process.nextTick`
  for no reason. Pre-format timestamps at write time; drop the `nextTick`.
- `auth.js` header `split(' ')` and O(n) `users.find` by id are fine at current scale but
  are the patterns that bite once data grows — note for later, not urgent.

---

## Data-fetching & architecture

### High

**A1 — Three competing `fetchWithAuth` implementations**
- [utils/api.js:5](frontend/src/utils/api.js#L5) → `localStorage.getItem('token')`, no prefix.
- [utils/apiClient.js:7](frontend/src/utils/apiClient.js#L7) → `localStorage.getItem('dc_access_token')`, no prefix.
- [utils/apiHelpers.js:5-6](frontend/src/utils/apiHelpers.js#L5-L6) → `sessionStorage.getItem('authToken')`, **adds** `/api/v1`.

Components pick different ones (e.g. `RevenueChart` uses `apiHelpers` and fetches
`/metrics/mrr`; the hook uses `api.js` and fetches `/api/v1/metrics/mrr`). Three token
keys across two storage backends is a correctness hazard as much as a perf one. **Fix:**
consolidate to one client that resolves the base URL and token consistently, then migrate
imports. This is the foundation for A2/A3.

**A2 — Duplicate / redundant fetches of the same data**
On a single dashboard load, MRR is fetched by `useDashboardData` (the overview Promise.all
**and** the filters effect) **and** by `RevenueChart`, **and** the four `MetricsCard`s each
fetch their own `/metrics/*`. "Force refresh" fans all of these out again. After
consolidating the client (A1), share results (lift fetches into the hook / a small cache)
so each endpoint is hit once per logical load.

**A3 — No request cancellation**
No `AbortController` anywhere. Effects in `useDashboardData`, `UsersPage`
([UsersPage.jsx:12-38](frontend/src/pages/UsersPage.jsx#L12-L38) uses a `cancelled` flag
that only skips `setState` but lets the request complete), and `ActivityFeed` all leak
in-flight requests on unmount → wasted bandwidth and "setState on unmounted component"
warnings. Add `AbortController` and abort in the effect cleanup.

### Medium

**A4 — Settings tabs all fetch on mount**
[frontend/src/pages/SettingsPage.jsx](frontend/src/pages/SettingsPage.jsx) mounts
`TeamSettings`, `NotificationSettings`, and `ApiKeyManager` together, each fetching on
mount — three requests when the user is looking at one tab. Render the active tab's data
lazily.

**A5 — No code splitting; large main bundle**
`App.js` imports every page eagerly and Recharts ships in the main chunk (~586 KB built).
Use `React.lazy` + `Suspense` for routes and lazy-load chart components so non-chart pages
don't pay for Recharts.

**A6 — Fixed-interval polling without overlap protection**
[frontend/src/components/dashboard/ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx)
polls `/metrics/activity` every 30s with no backoff and no guard against a slow response
overlapping the next tick. Low impact today; revisit if the endpoint gets slower or the
dashboard scales to many concurrent users.

---

## Suggested sequencing

1. **Stop the bleeding (correctness-class perf bugs):** C1 (`UserFilters` render loop),
   C2 (async error handling). Small, high-impact, low-risk.
2. **Consolidate the fetch layer:** A1 → then A2 (dedupe) and A3 (`AbortController`) build
   on it.
3. **Trim wasted work:** M1–M3 memoization, A4 settings, M4 ActivityFeed remount.
4. **Delivery/infra:** A5 code splitting, B2 compression/caching, B1 remove artificial
   delays (if not intentional).

## How to verify improvements

- **Network:** open the dashboard with DevTools → Network filtered to `metrics`. Confirm
  each endpoint is requested once per load (not in a stream), and once per Force refresh.
- **Renders:** use React DevTools Profiler on the Users page — confirm `UserFilters`
  no longer triggers a render cascade after C1.
- **Backend:** force `ReportsService.getSummary` to throw and hit `/api/v1/reports/summary`
  — it should return 500, not hang (validates C2).
- **Bundle:** `cd frontend && npm run build` and compare main chunk size before/after A5.
