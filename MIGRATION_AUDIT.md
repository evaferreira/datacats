# Migration & Code-Quality Audit

A read-only audit of the `datacats` repo (React `frontend/` + Express `backend/`) to support an upcoming hooks-migration and cleanup effort.

**Scope.** Three dimensions: (1) class components, (2) architectural debt, (3) dead code. **Out of scope** (separate lenses, done later): performance and dependency analysis.

Findings within each section are ordered highest-impact first. Every finding cites `path:line` and a one-line rationale.

---

## 1. Class Components

13 class components, all extending `React.Component`, all under `frontend/src/components/`. **Progress: 2/13 migrated (ActivityFeed, RevenueChart).** **None** use error boundaries, refs, context, `getSnapshotBeforeUpdate`, or HOCs — so migration is mechanically uniform. Complexity tiers are driven by state shape, lifecycle count, timers, and anti-patterns.

### Complex — plan carefully, refactor state model

| Component | LOC | Why complex |
|---|---|---|
| [TeamSettings.jsx:4](frontend/src/components/settings/TeamSettings.jsx#L4) | 229 | Multi-field invite form + modal state + member CRUD + 5 manually-bound methods. Needs `useReducer`, not a pile of `useState`. |
| [ApiKeyManager.jsx:6](frontend/src/components/settings/ApiKeyManager.jsx#L6) | 154 | 4 independent async ops (load/create/delete/preview) + CSV-preview state + 4 bound methods; also calls the dead `legacyExport` backend route. |

### Medium — multiple lifecycles, bound methods, or anti-patterns

| Component | LOC | Why / flag |
|---|---|---|
| [UserFilters.jsx:3](frontend/src/components/users/UserFilters.jsx#L3) | 79 | **Anti-pattern: `onFiltersChange` invoked inside `render()` (~L29–31)** — fires every render. Fix before migrating. |
| [UserTable.jsx:5](frontend/src/components/users/UserTable.jsx#L5) | 120 | Sort/paginate/select state + 3 bound methods + meaningless `data2` alias. Consolidation candidate with ReportTable. |
| [MetricsCard.jsx:4](frontend/src/components/dashboard/MetricsCard.jsx#L4) | 93 | `JSON.stringify` prop-diff in `componentDidUpdate` (L19); inline currency formatter (L34). |
| [MetricsSummary.jsx:5](frontend/src/components/dashboard/MetricsSummary.jsx#L5) | 62 | Near-duplicate of MetricsCard (same `JSON.stringify` diff). Consolidate during migration. |
| [ReportTable.jsx:5](frontend/src/components/reports/ReportTable.jsx#L5) | 117 | Copy-paste twin of UserTable. **DEAD: never imported** (only named in a comment in `oldConfig.js`). See §3. |

### Simple — straightforward hooks conversion

| Component | LOC | Why / flag |
|---|---|---|
| ✅ ~~[ActivityFeed.jsx:6](frontend/src/components/dashboard/ActivityFeed.jsx#L6)~~ | 71 | **DONE** — migrated to hooks (`useState`/`useEffect`/`useRef`); behavior preserved. setState-after-unmount race left in place (flagged for follow-up). |
| ✅ ~~[RevenueChart.jsx:5](frontend/src/components/dashboard/RevenueChart.jsx#L5)~~ | 61 | **DONE** — migrated to hooks. `componentDidUpdate` `>=` bug (continuous refetch loop) fixed via `useEffect([dateRange])` — intentional behavior change. |
| [QuickStats.jsx:5](frontend/src/components/dashboard/QuickStats.jsx#L5) | 68 | Simple `Promise.all`. **DEAD: imported in `App.js:14` but never rendered.** See §3. |
| [ChurnCohortChart.jsx:5](frontend/src/components/reports/ChurnCohortChart.jsx#L5) | 76 | Simple; carries a `migrate to recharts` TODO. |
| [ReportFilters.jsx:4](frontend/src/components/reports/ReportFilters.jsx#L4) | 74 | Controlled form; near-duplicate of UserFilters. |
| [UserExportButton.jsx:3](frontend/src/components/users/UserExportButton.jsx#L3) | 61 | Simple; uses raw `fetch` instead of an auth wrapper. |

---

## 2. Architectural Debt

### Overlapping files (highest impact — active bug surface)
- **Three competing `fetchWithAuth` implementations** with **different auth-token keys** and URL handling — a real correctness hazard:
  - [api.js:4](frontend/src/utils/api.js#L4) — `localStorage('token')`, no prefix
  - [apiClient.js:3](frontend/src/utils/apiClient.js#L3) — `localStorage('dc_access_token')`, throws a different error shape, adds `get`/`post`
  - [apiHelpers.js:4](frontend/src/utils/apiHelpers.js#L4) — `sessionStorage('authToken')`, prepends `/api/v1`
- **Two conflicting config files**: [config.js](frontend/src/constants/config.js) vs [oldConfig.js](frontend/src/constants/oldConfig.js) — divergent `API_BASE` (`/api/v1` vs `/api`), page sizes (25 vs 50), brand color. `oldConfig.js` is still imported by UserTable/ReportTable/ApiKeyManager only for `DEFAULT_PAGE_SIZE`.
- **Two date-util files**: [dates.js](frontend/src/utils/dates.js) vs [dateUtils.js](frontend/src/utils/dateUtils.js) — overlapping `formatDate`/`formatRelativeTime` with different output formats.
- **Duplicated formatters** across [frontend formatters.js](frontend/src/utils/formatters.js) and [backend formatters.js](backend/utils/formatters.js).

### Inconsistent imports of the same utility
- Components pull `fetchWithAuth` from all three modules: [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx)←`api`, [TeamSettings.jsx](frontend/src/components/settings/TeamSettings.jsx)←`apiHelpers`, [MetricsCard.jsx](frontend/src/components/dashboard/MetricsCard.jsx)←`api` — so different screens authenticate against different token keys.

### Inline duplicate logic
- `formatCurrency` reimplemented inline at [DashboardPage.jsx:40](frontend/src/pages/DashboardPage.jsx#L40), [MetricsCard.jsx:34](frontend/src/components/dashboard/MetricsCard.jsx#L34), [ReportTable.jsx:55](frontend/src/components/reports/ReportTable.jsx#L55), [ReportsPage.jsx:55](frontend/src/pages/ReportsPage.jsx#L55) — despite [formatters.js:4](frontend/src/utils/formatters.js#L4).
- Status→tone mapping in 3 places: [DashboardPage.jsx:54](frontend/src/pages/DashboardPage.jsx#L54), [formatters.js:32](frontend/src/utils/formatters.js#L32), [ActivityFeed.jsx:32](frontend/src/components/dashboard/ActivityFeed.jsx#L32).
- `sortAndPaginate` duplicated verbatim across [UserTable.jsx:37](frontend/src/components/users/UserTable.jsx#L37) and [ReportTable.jsx:37](frontend/src/components/reports/ReportTable.jsx#L37).
- `.catch(() => {})` silent fetch-error pattern repeated 10+ times across dashboard components and ApiKeyManager.

### Oversized files (verified line counts)
- [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) (454) — container + 4 inline formatters + dead handlers + commented blocks + heavy JSX; split into section components.
- [TeamSettings.jsx](frontend/src/components/settings/TeamSettings.jsx) (229), [ApiKeyManager.jsx](frontend/src/components/settings/ApiKeyManager.jsx) (154).
- [backend/routes/metrics.js](backend/routes/metrics.js) (135) — service layer + mock data + routes in one file.

### Mixed responsibilities
- `DashboardPage.jsx` mixes state, inline utils, data derivation, and rendering.
- Backend `routes/*.js` blend service logic, in-memory mock data, and route handlers; [backend/routes/settings.js](backend/routes/settings.js) mixes callback / promise / async-await styles in a single file.

---

## 3. Dead Code (bonus)

### Whole files / modules
- [utils/legacyExport.js](frontend/src/utils/legacyExport.js) — entire file; exports `rowsToCsv`/`downloadCsv`/`buildDefaultColumns` with zero imports and zero call sites. Header comment confirms it was replaced by a third-party tool in 2022. High confidence — safe to delete.
- [ReportTable.jsx](frontend/src/components/reports/ReportTable.jsx) — whole component, never imported (only mentioned in an `oldConfig.js` comment). High confidence.

### Unused imports
- [App.js:14](frontend/src/App.js#L14) — `QuickStats` imported but never rendered (comment admits it's only for IDE autocomplete).

### Defined-but-never-called / no-op functions
- [DashboardPage.jsx:131](frontend/src/pages/DashboardPage.jsx#L131) `handleLegacyExport` (only in commented JSX); :114 `processData2` (called but no-op); :126 `tempFix` (IE11 relic).
- [ReportsPage.jsx:24](frontend/src/pages/ReportsPage.jsx#L24) `handleApply` — `console.log` only.
- [backend/middleware/auth.js:28](backend/middleware/auth.js#L28) `optionalAuth` — never imported.

### Unused exports
- [utils/metrics.js:15](frontend/src/utils/metrics.js#L15) `calculateMRRNew`; [utils/dateUtils.js](frontend/src/utils/dateUtils.js) `formatDateShort`/`timeAgo`/`isoDate`; [utils/formatters.js](frontend/src/utils/formatters.js) `formatCurrencyCents`, `getHealthColor`; [oldConfig.js](frontend/src/constants/oldConfig.js) `HEALTH_LABELS`.

### Dead backend endpoints (comment-marked)
- [backend/routes/legacyExport.js](backend/routes/legacyExport.js) `/csv`, `/pdf`, `/bulk`; [routes/settings.js:93](backend/routes/settings.js#L93) `/migrate`; [routes/reports.js:66](backend/routes/reports.js#L66) `/export` & :71 `/schedule`.

### Stale commented-out blocks
- [DashboardPage.jsx:154](frontend/src/pages/DashboardPage.jsx#L154) dark-mode block & :178 legacy header/export; [App.js:36](frontend/src/App.js#L36) three commented routes; [utils/metrics.js:20](frontend/src/utils/metrics.js#L20) `calculateMRROld`; [utils/formatters.js:24](frontend/src/utils/formatters.js#L24) `formatCurrencyOld`; [backend/server.js:26](backend/server.js#L26) featureFlags middleware.

### Unused vars / state & stubs
- [DashboardPage.jsx:26](frontend/src/pages/DashboardPage.jsx#L26) `pollTick` (remount hack); `data2` aliases in UserTable/ReportTable.
- [components/ui/Input.jsx](frontend/src/components/ui/Input.jsx) — pass-through stub ("don't use until v9"); [components/ui/Button.jsx](frontend/src/components/ui/Button.jsx) — only primary/secondary variants implemented.

---

*Cross-section note:* `ReportTable`, `QuickStats`, the `fetchWithAuth` trio, and the two configs intentionally appear in more than one section — each gets full treatment in its primary section and is cross-referenced (not repeated) elsewhere.
