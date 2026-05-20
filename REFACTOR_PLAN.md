# Bootstrap → Design System Refactor Plan

Generated from [BOOTSTRAP_INVENTORY.md](BOOTSTRAP_INVENTORY.md). Phase 1 is the only fully-deletable cut available today, because [Badge](frontend/src/components/ui/Badge.jsx) is the only DS component that's complete enough to replace Bootstrap end-to-end.

---

## 1. Scope

**In scope (Phase 1):** every Bootstrap `badge` usage in the app — 4 files, ~14 call sites — replaced with the DS `<Badge tone={…}>` component, plus deletion of the `.badge` block in [bootstrap-overrides.css](frontend/src/styles/bootstrap-overrides.css).

**Out of scope (Phase 1):**
- Other Bootstrap components (`btn`, `card`, `table`, `form-control`, navbar, dropdowns, modal, list-group, grid, utilities) — they stay as-is.
- Dropping the Bootstrap CDN `<link>` in [index.html](frontend/public/index.html) or the dependency in [package.json](frontend/package.json) — Bootstrap is still loaded for the other components.
- DS gaps that don't block badges: `Button` variants (`danger`/`link`/`sm`), `Input` rewrite, `Card` class rename, new `Table`/`Tabs`/`Modal`/`Dropdown`/`TopNav`/`SideNav`/`List`.
- Class component migration, performance, dead endpoints (Modules 2 / 3).

**Why this slice and not "two random components":** badges are the *only* Bootstrap concern where the DS side is complete. Every other component needs DS prep work before it can be cut. Choosing a vertical slice means at the end of the phase we can delete the `.badge` override block — something is actually gone, not just "less Bootstrap somewhere."

---

## 2. Dependencies

What else moves when we touch badges:

- **DS `Badge` component** — already supports `neutral` / `success` / `warning` / `danger` / `info`, pill-shape default. **No DS changes needed.** The `secondary` → `neutral` rename is a call-site mapping, not a DS edit.
- **`bootstrap-overrides.css`** — the `.badge` block at [lines 40–44](frontend/src/styles/bootstrap-overrides.css#L40-L44) becomes dead code once the last call site is migrated; deletion is the final Phase 1 step. The rest of the file (button/card/table/form/nav overrides + the recharts animation kill) stays untouched.
- **Helper functions in the touched files:**
  - [UserRow.jsx](frontend/src/components/users/UserRow.jsx) — `statusBadgeClass(status)` becomes `statusBadgeTone(status)` returning a tone string (or is inlined). Same status set: `active` / `at-risk` / `churned` / fallback.
  - [DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) — `getStatusColor(u.status)` currently returns a Bootstrap suffix (`success` / `warning` / `danger` / `secondary`). Returns a DS tone instead (`secondary` → `neutral`).
  - [ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) — internal `case` block returning class strings becomes one returning tone strings.
- **No backend, API, routing, or state changes.**
- **No new tests required to ship the migration**

---

## 3. Risk areas

What could break:

- **Visual regression on status colors.** The DS Badge palette is hand-picked pastels with their own foregrounds (see [Badge.jsx](frontend/src/components/ui/Badge.jsx)) — they will not be pixel-identical to Bootstrap 4.6's solid `badge-success` / `warning` / `danger` / `secondary`. *Mitigation:* this is expected and acceptable; flag it in the PR description with before/after screenshots so design review isn't surprised.
- **Pill vs square.** Only `ActivityFeed.jsx` uses `badge-pill` today; the other three use square Bootstrap badges. The DS `Badge` is **always pill-shaped** (`borderRadius: 999`). All four files become pill after migration. *Mitigation:* call this out in the PR; if a stakeholder objects, the fix is a `shape` prop on the DS Badge, not a rollback.
- **`secondary` → `neutral` rename.** Easy to miss one call site and leave a `tone="secondary"` that silently falls through to the `neutral` default in [Badge.jsx:12](frontend/src/components/ui/Badge.jsx#L12). *Mitigation:* the characterization test (§4) covers the fallback case; also grep for `tone="secondary"` before merge.
- **DashboardPage inline mapping.** [DashboardPage.jsx:423](frontend/src/pages/DashboardPage.jsx#L423) concatenates `'badge badge-' + getStatusColor(...)` — easy to leave the `'badge badge-'` prefix as dead string when swapping. *Mitigation:* code review checklist item: no remaining `badge badge-*` literals in any of the 4 files after their PR.
- **`.badge` override deletion is global.** Removing the `.badge` block in `bootstrap-overrides.css` affects anything still using a Bootstrap `badge` class anywhere in the app — including in code paths we didn't touch. *Mitigation:* delete the override only in the **final** PR of Phase 1, after a repo-wide grep confirms zero `className=".*badge.*"` matches remain. (`badge-` prefix grep, not just `badge` — `bg-dark` etc. would false-match.)
- **No existing test coverage on badge rendering.** See §4.

What is *not* a risk:
- Bootstrap is still loaded site-wide after Phase 1 — there's no "missing CSS" cliff. Only the 4 files' badges change; everything else (buttons, cards, tables, forms) keeps working unchanged.

---

## 4. Safety mechanisms

**What validates current behavior today: very little.**

- The only Jest test in the repo touching any of the four files is [UserTable.test.jsx](frontend/src/components/users/UserTable.test.jsx) — 2 sort tests. It tests the table that *contains* `UserRow`, but asserts nothing about the badge rendering. Useful as a regression check that the table still renders, not as a badge safety net.
- `DashboardPage.jsx`, `ReportsPage.jsx`, `ActivityFeed.jsx`, and `UserRow.jsx` themselves have **zero direct test coverage** on the status → badge-class mapping.
- No visual regression tooling (no Storybook, no Chromatic, no Percy) in the repo.
- No type system on these files — plain JS / JSX, so a stale `tone="secondary"` won't fail a compile.

**What to add before the migration starts (Phase 1 step 0):**

One characterization test on [UserRow.jsx](frontend/src/components/users/UserRow.jsx) — the file where the mapping is most explicit (`statusBadgeClass` is its own function rather than inline JSX). Cover all four status values: `active` → `badge-success`, `at-risk` → `badge-warning`, `churned` → `badge-danger`, unknown → `badge-secondary`.

The test asserts the **current** Bootstrap output. When the migration swaps in `<Badge tone="…">`, the test fails intentionally — and the migration PR updates the assertions to match the new DS surface. That intentional failure is the human-review moment: it forces a deliberate confirmation that the status → tone mapping didn't drift during the swap.

This is the only test we *need* to ship Phase 1 safely. The same mapping pattern exists in the other three files, so the test is representative even though it covers one file.

---

## 5. Rollback strategy

Phase 1 is structured so every step is independently revertible.

- **Per-file rollback:** each file's migration is one commit (5 commits total — 4 file migrations + 1 overrides-CSS deletion). `git revert <sha>` on any of them restores that file to Bootstrap badges; the others stay migrated. There's no cross-file coupling.
- **Override-CSS rollback:** the `.badge` block in `bootstrap-overrides.css` is deleted only in the final commit. If we have to revert a file migration *after* deleting the overrides, we either (a) `git revert` the overrides-deletion commit too, or (b) accept that the reverted file's badges look slightly off until re-migrated. (a) is preferred.
- **Full Phase 1 rollback:** revert the 5 commits in reverse order. No DB migrations, no API changes, no flag wrangling. Bootstrap CSS is still loaded throughout Phase 1, so the reverted code Just Works.
- **Detection:** the characterization test from §4 is the canary. If it starts passing again *without* an intentional update, something is wrong with the migration.

No feature flag needed — the surface area is too small and the rollback is too cheap. Adding a flag would be more risk than it removes.

---

## 6. Incremental milestones

### Phase 1 — Bootstrap Badge removal (detailed)

One PR per Bootstrap badge usage site, plus one for the test, plus one for the override-CSS cleanup. Six PRs, all small, each independently revertible.

| # | PR | Files touched | Notes |
|---|---|---|---|
| 1.0 | **Add characterization test for UserRow status → badge mapping** | `frontend/src/components/users/UserRow.test.jsx` (new) | Asserts current Bootstrap classes for all 4 statuses (`active` / `at-risk` / `churned` / unknown). Must pass before any of the file migrations land. Will fail intentionally in PR 1.1 and be updated in the same PR. |
| 1.1 | **Migrate UserRow to DS Badge** | `frontend/src/components/users/UserRow.jsx`, `frontend/src/components/users/UserRow.test.jsx` | Replace `statusBadgeClass` → `statusBadgeTone` returning DS tones. Mapping: `active`→`success`, `at-risk`→`warning`, `churned`→`danger`, fallback→`neutral`. Update the characterization test from PR 1.0 to assert DS Badge rendering. |
| 1.2 | **Migrate ActivityFeed to DS Badge** | `frontend/src/components/dashboard/ActivityFeed.jsx` | Replace inline `case` block (lines 33–36) returning `badge badge-pill badge-*` strings with a function returning DS tones. Pill is already the DS default, so no shape work. |
| 1.3 | **Migrate DashboardPage Recent signups badge** | `frontend/src/pages/DashboardPage.jsx` | [Line 423](frontend/src/pages/DashboardPage.jsx#L423): replace `<span className={'badge badge-' + getStatusColor(u.status)}>` with `<Badge tone={getStatusTone(u.status)}>`. Rename / adjust `getStatusColor` to return DS tones (`secondary` → `neutral`). |
| 1.4 | **Migrate ReportsPage status columns** | `frontend/src/pages/ReportsPage.jsx` | 6 static badges across 2 tables (Revenue by plan: strong / growing / small; Feature adoption: healthy / building / low). All literals — swap each `<span className="badge badge-X">` for `<Badge tone="…">`. No helper function needed. |
| 1.5 | **Delete `.badge` overrides** | `frontend/src/styles/bootstrap-overrides.css` | Remove the `.badge { … }` block at [lines 40–44](frontend/src/styles/bootstrap-overrides.css#L40-L44). Pre-merge check: `grep -r "badge-\(success\|warning\|danger\|secondary\|info\|pill\)" frontend/src` returns zero results. |

**At end of Phase 1:** every Bootstrap badge in the app is gone, the override block is deleted, one new test guards the mapping. Bootstrap itself is still loaded — the CDN link and dependency stay. Total: 5 small PRs, ~14 call sites migrated, ~5 lines of CSS deleted.

### Phases 2+ — remaining roadmap

Ordered by DS readiness (cheapest DS prep work first). Each phase ships in the same shape as Phase 1: one PR per file, one final cleanup PR per phase.

| # | Component | DS prep work required before migration can start |
|---|---|---|
| 2 | **Cards** | Rename `className="card"` → `dc-card` in [Card.jsx](frontend/src/components/ui/Card.jsx) so it stops inheriting from Bootstrap. No new variants needed — title/footer props already cover all 6 call sites. |
| 3 | **Buttons** | Add `danger`, `link` (and `ghost` if still planned) variants to [Button.jsx](frontend/src/components/ui/Button.jsx); add `size="sm"` prop. Roughly 12 files use buttons. |
| 4 | **Grid (`container` / `row` / `col-*`)** | None — *don't* build a DS grid. Inline plain CSS grid/flex at each call site (3 files: Dashboard, Users, QuickStats-shelved). |
| 5 | **Utilities (`d-flex`, `text-muted`, `bg-dark`, …)** | None — same as grid; inline plain CSS at each call site (6 files). |
| 6 | **Forms (`form-control` / `form-group` / `form-row` / `form-inline`)** | Rewrite [Input.jsx](frontend/src/components/ui/Input.jsx) from stub to real component (label, error, hint, disabled, controlled value). Don't recreate `form-group` / `form-row` — inline. 6 files. |
| 7 | **Tables** | Build DS `Table` component with `striped` / `hover` / `bordered` / `responsive` variants and sortable headers. 4 files. (`UserTable.test.jsx` becomes the safety net here.) |
| 8 | **Tabs** | Build DS `Tabs` component. 1 file ([SettingsPage.jsx](frontend/src/pages/SettingsPage.jsx)). |
| 9 | **List groups** | Build DS `List` / `ListGroup`. 2 files. |
| 10 | **Modal** | Build DS `Modal` / `Dialog`. 1 file ([TeamSettings.jsx](frontend/src/components/settings/TeamSettings.jsx)) — note: current implementation is hand-rolled show/hide with Bootstrap classes only, no Bootstrap JS, so swap is mostly visual. |
| 11 | **Dropdown** | Build DS `Dropdown` / `Menu`. 1 file ([TopBar.jsx](frontend/src/components/layout/TopBar.jsx)). |
| 12 | **TopNav (navbar)** | Build DS `TopNav`. 1 file ([TopBar.jsx](frontend/src/components/layout/TopBar.jsx)). Can share a PR with Phase 11 since both touch the same file. |
| 13 | **SideNav** | Build DS `SideNav`. 1 file ([Sidebar.jsx](frontend/src/components/layout/Sidebar.jsx)). |
| 14 | **Bootstrap removal (the deletable moment)** | Delete `<link>` in [index.html](frontend/public/index.html), `"bootstrap"` from [package.json](frontend/package.json), the import in [App.js](frontend/src/App.js), and the rest of [bootstrap-overrides.css](frontend/src/styles/bootstrap-overrides.css) (preserving the recharts animation kill — relocate to a non-bootstrap stylesheet first). |

**Ordering rationale:** start where the DS is already complete (badges, then cards after a one-line rename), then where DS prep is small (buttons), then no-DS-needed slices (grid, utilities), then the heavy DS lifts (input, table, tabs, modal, dropdown, navs) ordered by how many files each unblocks. Phase 14 is the kill shot — `bootstrap@4.6.2` leaves `package.json`, `bootstrap.min.css` leaves the HTML, and the override file is deleted.
