# Bootstrap Inventory

Every place Bootstrap 4.6.2 is used in the DataCats frontend, grouped by Bootstrap component. The "DS equivalent" notes map to the in-house design system at [frontend/src/components/ui/](frontend/src/components/ui/) — only `Button`, `Card`, `Badge`, and `Input` exist today, and several are explicitly marked partial/stub in source.

## Design system status (reference)

| DS component | File | Status |
| --- | --- | --- |
| Button | [Button.jsx](frontend/src/components/ui/Button.jsx) | Partial — only `primary` / `secondary` variants wired. `danger`, `ghost`, `link` documented but not implemented. No size prop. |
| Card | [Card.jsx](frontend/src/components/ui/Card.jsx) | Usable. ⚠️ Renders `className="card"` — collides with Bootstrap `.card`. |
| Badge | [Badge.jsx](frontend/src/components/ui/Badge.jsx) | Usable. Tones: `neutral`, `success`, `warning`, `danger`, `info`. Pill shape is default. |
| Input | [Input.jsx](frontend/src/components/ui/Input.jsx) | Stub — no label / error / hint / controlled-value handling. Not usable. |

---

## Bootstrap entry points (the source of every class below)

| File | What it does | DS path |
| --- | --- | --- |
| [frontend/public/index.html](frontend/public/index.html) | `<link>` to `cdn.jsdelivr.net/.../bootstrap@4.6.2/.../bootstrap.min.css` — the actual source of all Bootstrap CSS in the app. | Drop the `<link>` once classes are removed. |
| [frontend/package.json](frontend/package.json) | `"bootstrap": "4.6.2"` dependency entry (CSS-only — never imported in JS). | Remove dependency once CDN link drops. |
| [frontend/src/App.js](frontend/src/App.js) | `import './styles/bootstrap-overrides.css'`. | Remove import once overrides file is deleted. |
| [frontend/src/styles/bootstrap-overrides.css](frontend/src/styles/bootstrap-overrides.css) | Overrides `.btn-primary`, `.btn-outline-secondary`, `.card`, `.card-header`, `.table thead th`, `.badge`, `.form-control`, `.nav-tabs .nav-link.active`. Also kills recharts animations (unrelated; preserve). | Colors/spacings should move into DS tokens. Recharts animation override should be relocated to a non-bootstrap stylesheet. |

---

## Grid (`container`, `container-fluid`, `row`, `col-*`)

| File | Classes used |
| --- | --- |
| [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) | `container-fluid`, `row` (×9), `col-md-12`, `col-md-6`, `col-md-4`, `col-md-3` |
| [UsersPage.jsx](frontend/src/pages/UsersPage.jsx) | `container`, `row`, `col`, `col-auto` |
| [QuickStats.jsx](frontend/src/components/dashboard/QuickStats.jsx) | `row`, `col-md-4` (×3) — component is shelved, not rendered |

**DS equivalent:** None. Replace with plain CSS grid/flex on each call site; the DS shouldn't ship its own grid component.

---

## Buttons (`btn`, `btn-primary`, `btn-outline-secondary`, `btn-secondary`, `btn-danger`, `btn-link`, `btn-sm`)

| File | Variants used |
| --- | --- |
| [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) | `btn btn-outline-secondary` (Reset), `btn btn-link` (Force refresh) |
| [UsersPage.jsx](frontend/src/pages/UsersPage.jsx) | `btn btn-primary` (Invite user), `btn btn-outline-secondary` (Refresh) |
| [ReportsPage.jsx](frontend/src/pages/ReportsPage.jsx) | `btn btn-primary` (Export to CSV), `btn btn-outline-secondary` (Schedule email) |
| [SettingsPage.jsx](frontend/src/pages/SettingsPage.jsx) | `btn btn-primary` (Save profile) |
| [ReportFilters.jsx](frontend/src/components/reports/ReportFilters.jsx) | `btn btn-primary` (Apply) |
| [ReportTable.jsx](frontend/src/components/reports/ReportTable.jsx) | `btn btn-sm btn-link` (×2 Prev/Next) |
| [UserTable.jsx](frontend/src/components/users/UserTable.jsx) | `btn btn-sm btn-link` (×2 Prev/Next) |
| [UserFilters.jsx](frontend/src/components/users/UserFilters.jsx) | `btn btn-secondary` (Reset) |
| [UserRow.jsx](frontend/src/components/users/UserRow.jsx) | `btn btn-sm btn-link` (View) |
| [UserExportButton.jsx](frontend/src/components/users/UserExportButton.jsx) | `btn btn-outline-secondary` (Export users) |
| [TeamSettings.jsx](frontend/src/components/settings/TeamSettings.jsx) | `btn btn-primary` (Send invitation), `btn btn-danger` (×2 Remove/Confirm), `btn btn-secondary` (Cancel) |
| [ApiKeyManager.jsx](frontend/src/components/settings/ApiKeyManager.jsx) | `btn btn-primary` (Create key), `btn btn-outline-secondary` (Preview), `btn btn-sm btn-link` (Revoke) |

**DS equivalent:** [Button.jsx](frontend/src/components/ui/Button.jsx). `primary` / `secondary` work today. **Blocked on:** `danger` variant, `link` variant, and a `size="sm"` prop — none are currently implemented.

---

## Cards (`card`, `card-body`, `card-header`, `card-footer`, `card-title`, `card-text`)

| File | Notes |
| --- | --- |
| [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) | `card`, `card-body`, `card-title`, `card-text` — used in 4 inline cards (MRR trend, Revenue by plan, Quick stats, Recent signups) |
| [MetricsCard.jsx](frontend/src/components/dashboard/MetricsCard.jsx) | `card`, `card-body`, `card-title`, `card-text` (loading / error / value states) |
| [MetricsSummary.jsx](frontend/src/components/dashboard/MetricsSummary.jsx) | `card`, `card-body`, `card-title`, `card-text`, `card-text text-muted`, `card-footer text-muted` |
| [ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) | `card`, `card-header` |
| [RevenueChart.jsx](frontend/src/components/dashboard/RevenueChart.jsx) | `card`, `card-header`, `card-body` |
| [QuickStats.jsx](frontend/src/components/dashboard/QuickStats.jsx) | `card`, `card-body`, `card-title text-muted`, `card-text` (×3) — shelved |

**DS equivalent:** [Card.jsx](frontend/src/components/ui/Card.jsx) — supports `title` and `footer` props. ⚠️ The DS Card itself renders `className="card"`, which inherits from Bootstrap by accident; rename to `dc-card` before deleting Bootstrap.

---

## Tables (`table`, `table-striped`, `table-hover`, `table-bordered`, `table-responsive`, `thead-dark`, `thead-light`)

| File | Classes used |
| --- | --- |
| [ReportsPage.jsx](frontend/src/pages/ReportsPage.jsx) | `table table-striped table-hover` + `thead-dark` (×2 tables: Revenue by plan, Feature adoption) |
| [ReportTable.jsx](frontend/src/components/reports/ReportTable.jsx) | `table table-bordered`, `thead-dark` |
| [UserTable.jsx](frontend/src/components/users/UserTable.jsx) | `table-responsive`, `table`, `thead-light` |
| [ApiKeyManager.jsx](frontend/src/components/settings/ApiKeyManager.jsx) | `table` (key list) |

**DS equivalent:** None. Needs a DS `Table` with striped / hover / bordered / responsive variants and sortable headers — used by ReportTable and UserTable.

---

## Badges (`badge`, `badge-pill`, `badge-success`, `badge-warning`, `badge-danger`, `badge-secondary`, `badge-info`)

| File | Variants used |
| --- | --- |
| [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) | `badge badge-{success\|warning\|danger\|secondary}` (Recent signups status) |
| [ReportsPage.jsx](frontend/src/pages/ReportsPage.jsx) | `badge badge-{success\|warning\|danger\|secondary}` (×2 status columns) |
| [ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) | `badge badge-pill badge-{success\|warning\|danger\|secondary}` |
| [UserRow.jsx](frontend/src/components/users/UserRow.jsx) | `badge badge-{success\|warning\|danger\|secondary}` (user status) |

**DS equivalent:** [Badge.jsx](frontend/src/components/ui/Badge.jsx) — tones map directly: `success` / `warning` / `danger` / `info` / `neutral`. Pill shape is the default in the DS. (`secondary` → `neutral`.) Already used in [ApiKeyManager.jsx](frontend/src/components/settings/ApiKeyManager.jsx) for scope chips.

---

## Forms (`form-control`, `form-group`, `form-row`, `form-inline`)

| File | Classes used |
| --- | --- |
| [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) | `form-control` (×3: date, date, plan select) |
| [SettingsPage.jsx](frontend/src/pages/SettingsPage.jsx) | `form-group` (×2), `form-control` (×2 — profile name/email) |
| [ReportFilters.jsx](frontend/src/components/reports/ReportFilters.jsx) | `form-row`, `form-group col-auto` (×4), `form-control` (×3) |
| [UserFilters.jsx](frontend/src/components/users/UserFilters.jsx) | `form-inline`, `form-group` (×3), `form-control` (×3) |
| [TeamSettings.jsx](frontend/src/components/settings/TeamSettings.jsx) | `form-group` (×3), `form-control` (×3 invite fields) |
| [ApiKeyManager.jsx](frontend/src/components/settings/ApiKeyManager.jsx) | `form-control` (new-key label) |

**DS equivalent:** [Input.jsx](frontend/src/components/ui/Input.jsx) — but it's a stub today (no label / error / hint / controlled-value handling). **Blocked on:** real Input implementation. Form layout classes (`form-row`, `form-inline`, `form-group`) should not be re-created — use plain flex/grid.

---

## Tabs (`nav-tabs`, `nav-link`, `tab-content`, `tab-pane`)

| File | Classes used |
| --- | --- |
| [SettingsPage.jsx](frontend/src/pages/SettingsPage.jsx) | `nav nav-tabs`, `nav-item` (×4), `nav-link active`, `tab-content`, `tab-pane active` |

**DS equivalent:** None. Needs a DS `Tabs` component.

---

## Navbar (`navbar`, `navbar-expand-lg`, `navbar-dark`, `navbar-brand`, `navbar-toggler`, `navbar-toggler-icon`, `collapse navbar-collapse`, `navbar-nav`)

| File | Classes used |
| --- | --- |
| [TopBar.jsx](frontend/src/components/layout/TopBar.jsx) | `navbar navbar-expand-lg navbar-dark`, `navbar-brand`, `navbar-toggler`, `navbar-toggler-icon`, `collapse navbar-collapse`, `navbar-nav ml-auto` |

**DS equivalent:** None. Needs a DS `TopNav`.

---

## Side nav (`nav flex-column`, `nav-item`, `nav-link`)

| File | Classes used |
| --- | --- |
| [Sidebar.jsx](frontend/src/components/layout/Sidebar.jsx) | `nav flex-column bg-dark text-white`, `nav-item` (×4), `nav-link text-white` (×4) |

**DS equivalent:** None. Needs a DS `SideNav`.

---

## Dropdowns (`dropdown`, `dropdown-toggle`, `dropdown-menu`, `dropdown-menu-right`, `dropdown-item`, `dropdown-divider`)

| File | Classes used |
| --- | --- |
| [TopBar.jsx](frontend/src/components/layout/TopBar.jsx) | `nav-item dropdown`, `nav-link dropdown-toggle`, `dropdown-menu dropdown-menu-right`, `dropdown-item` (×4), `dropdown-divider` |

**DS equivalent:** None. Needs a DS `Dropdown` / `Menu`.

---

## List groups (`list-group`, `list-group-flush`, `list-group-item`)

| File | Classes used |
| --- | --- |
| [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) | `list-group list-group-flush`, `list-group-item d-flex justify-content-between` (Recent signups) |
| [ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) | `list-group list-group-flush`, `list-group-item`, `list-group-item d-flex justify-content-between align-items-center`, `list-group-item text-muted` |

**DS equivalent:** None. Needs a DS `List` / `ListGroup`.

---

## Modal (`modal`, `modal-dialog`)

| File | Classes used |
| --- | --- |
| [TeamSettings.jsx](frontend/src/components/settings/TeamSettings.jsx) | `modal`, `modal-dialog` (remove-teammate confirmation) — note: classes are present but the actual show/hide and styling is hand-rolled via inline styles, not Bootstrap JS. |

**DS equivalent:** None. Needs a DS `Modal` / `Dialog`.

---

## Utility classes (`d-flex`, `justify-content-between`, `align-items-center`, `text-muted`, `text-white`, `bg-dark`, `flex-column`, `ml-auto`)

| File | Classes used |
| --- | --- |
| [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) | `d-flex justify-content-between` (on `list-group-item`) |
| [ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) | `d-flex justify-content-between align-items-center`, `text-muted` |
| [MetricsSummary.jsx](frontend/src/components/dashboard/MetricsSummary.jsx) | `text-muted` (×2) |
| [QuickStats.jsx](frontend/src/components/dashboard/QuickStats.jsx) | `text-muted` (×3) — shelved |
| [Sidebar.jsx](frontend/src/components/layout/Sidebar.jsx) | `flex-column`, `bg-dark`, `text-white` (×5) |
| [TopBar.jsx](frontend/src/components/layout/TopBar.jsx) | `ml-auto` |

**DS equivalent:** None. Inline these as plain CSS at the call site — utilities don't belong in the DS.

---

## Files with no Bootstrap usage

For completeness: [ChurnCohortChart.jsx](frontend/src/components/reports/ChurnCohortChart.jsx), [LineChart.jsx](frontend/src/components/charts/LineChart.jsx), [BarChart.jsx](frontend/src/components/charts/BarChart.jsx), and [NotificationSettings.jsx](frontend/src/components/settings/NotificationSettings.jsx) (already uses DS `Card` + `Button`).

---

## Summary of gaps blocking a full Bootstrap removal

DS work that has to land first:

- **`Button` variants**: `danger`, `link` (and `ghost` if still planned), plus a size prop (`sm`).
- **`Input`**: real implementation (label, error, hint, disabled, controlled value).
- **`Card` rename**: change `className="card"` in [Card.jsx](frontend/src/components/ui/Card.jsx) to `dc-card` before deleting Bootstrap, otherwise inherited `.card` styles silently disappear.
- **New components**: `Table`, `Tabs`, `Modal`, `Dropdown`, `TopNav`, `SideNav`, `List` / `ListGroup`.
- **Grid**: not a DS component — swap `container` / `row` / `col-*` for plain CSS grid/flex at each call site.
- **Utilities**: same — inline as plain CSS, don't recreate in the DS.
