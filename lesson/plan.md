# Prompt 2 — Create Per-Clip Demo Branches

> **Prerequisites:** Complete Prompt 1 first. The `initial-state` branch must exist
> (Prompt 1's git command creates it automatically).
> Then paste this prompt into your AI coding tool to generate all per-clip branches.

> **What this does:** Creates one git branch per demo clip. Every branch forks from
> `initial-state` and adds:
> 1. A `DEMO_BRIEF.md` at the repo root scoping the clip's demo
> 2. Targeted amplifications — a few extra examples of the specific mess this clip addresses,
>    so the instructor always has plenty to work with
>
> Branches do NOT clean up the legacy codebase — they only add to it.

---

## Clip Coverage Map

Not every clip needs its own branch. This table accounts for all clips so nothing appears missing.

| Module | Clip | Branch | Notes |
|--------|------|--------|-------|
| M1 | C1: Understanding Legacy Systems | — | Conceptual/discussion — no live coding |
| M1 | C2: Exploring the Codebase | `demo/m1-bootstrap-planning` | Branch 1 |
| M1 | C3: Prioritization and Scoping | `demo/m1-bootstrap-planning` | Branch 1 (same branch, DEMO_BRIEF covers both C2 and C3) |
| M1 | C4: Planning Safe Incremental Refactors | `demo/m1-bootstrap-planning` | Branch 1 (DEMO_BRIEF section covers test generation) |
| M2 | C1: Auditing Code Quality | `demo/m2-c1-class-component-audit` | Branch 2 |
| M2 | C2: Improving Maintainability | `demo/m2-c2-class-to-functional` | Branch 3 |
| M2 | C3: Architectural Refactoring | `demo/m2-c3-architectural-refactoring` | Branch 4 |
| M2 | C4: Performance and Efficiency | `demo/m2-c4-performance` | Branch 5 |
| M2 | C5: Modernizing Frameworks | `demo/m2-c5-modernize-dependencies` | Branch 6 |
| M3 | C1: Why Large-Scale Is Different | `demo/m3-c1-dead-endpoints` | Branch 7 |
| M3 | C2: Choosing the Right Refactor Strategy | — | Discussion/comparison — no live coding; use any branch as backdrop |
| M3 | C3: Planning Cross-Cutting Changes | — | Builds directly on M3 C1 findings; continue in same session |
| M3 | C4: Design Debt and Consistency Audits | `demo/m3-c4-design-consistency` | Branch 8 |
| M3 | C5: Example-Driven Repetitive Migrations | `demo/m3-c5-bootstrap-migration-at-scale` | Branch 9 |
| M3 | C6: Limits and Guardrails | — | Discussion — use `demo/m3-c5-bootstrap-migration-at-scale` as a live example of where limits appear |
| M4 | C1: Why Refactors Break Production | `demo/m4-c1-regression-risks` | Branch 12 |
| M4 | C2: Git Discipline for AI Changes | `demo/m4-c2-git-discipline` | Branch 10 |
| M4 | C3: CI/CD Quality Gates | `demo/m4-c3-cicd-quality-gates` | Branch 11 |
| M4 | C4: Detecting Side Effects Early | — | Discussion — no new code; reference Branch 11's CI pipeline |
| M5 | C1: Documenting Decisions | — | Demo from completed state of any M4 branch |
| M5 | C2: Measuring Refactoring Success | — | Discussion — no live coding |
| M5 | C3: Sustaining the Investment | `demo/m5-c3-sustaining` | Branch 13 |

---

## How to Use This Prompt

Run this after the initial-state codebase is generated and committed. For each branch below,
the AI tool should:

1. `git checkout initial-state`
2. `git checkout -b <branch-name>`
3. Make only the additions specified (do not clean anything up)
4. Add the `DEMO_BRIEF.md` file at the repo root
5. `git add . && git commit -m "<commit message>"`
6. `git checkout initial-state` and repeat for the next branch

---

## Branch 1: `demo/m1-bootstrap-planning`

**Clips:** Module 1, Clips 2, 3, and 4 (demo runs throughout the module)
**Topic:** Preparing for Bootstrap-to-design-system migration
**Commit message:** `demo: m1 — bootstrap planning starting point`

### Additions

Add a partial, incomplete design system spec at `frontend/src/components/ui/DESIGN_SYSTEM_DRAFT.md`:

```markdown
# DataPulse Design System — Draft v0.2
_Last updated: Sarah, March 2022_

## Status: ON HOLD — needs engineering bandwidth

### Colors (proposed tokens)
- Primary: #2563eb (but check — Jake used a different blue in the dashboard)
- Secondary: #64748b
- Success: #16a34a
- Warning: #d97706
- Danger: #dc2626

### Spacing scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Components completed
- [x] Button (basic variants only)
- [x] Badge
- [ ] Input (stub exists, not usable)
- [ ] Table
- [ ] Modal
- [ ] Dropdown
- [ ] Form controls

### Migration plan
Replace Bootstrap components file by file. No big-bang rewrite.
Start with shared components (Button, Badge), then move to page-level components.

NOTE: Bootstrap and the design system will coexist during migration.
Make sure not to break existing Bootstrap styles when adding new tokens.
```

Add this file at `frontend/BOOTSTRAP_INVENTORY.md` (intentionally incomplete, to show what an AI can help finish):

```markdown
# Bootstrap Usage Inventory
_Started by: platform team, Q1 2024 — incomplete_

## Files using Bootstrap (partial list)
- src/pages/DashboardPage.jsx
- src/components/layout/Sidebar.jsx
- src/components/layout/TopBar.jsx
- ... (needs to be completed)

## Open questions
- Which Bootstrap components have a design system equivalent already?
- Which pages are highest priority to migrate?
- Are there any Bootstrap JS dependencies (modals, dropdowns) we need to handle separately?
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 1: Bootstrap-to-Design-System Migration Planning

## Clips covered
- Clip 2: Exploring the Codebase with AI
- Clip 3: Prioritization and Scoping
- Clip 4: Planning Safe Incremental Refactors

## What to demonstrate

### Clip 2 — Exploring
1. Ask the AI to audit all Bootstrap usage across the frontend — which files, which components, how many instances
2. Ask the AI to compare Bootstrap components against what exists in `src/components/ui/`
3. Ask the AI to complete the `BOOTSTRAP_INVENTORY.md` file

### Clip 3 — Prioritizing
4. Ask the AI to identify which files would be safest to migrate first (least risky, most reused)
5. Ask the AI to generate a prioritized migration backlog using the 2x2 framework (Business Criticality vs Change Pain)

### Clip 4 — Planning and Initial Tests
6. Ask the AI to identify which components have no test coverage (answer: all of them)
7. Ask the AI to generate characterization tests for 1–2 components before any migration begins —
   tests that capture current behavior so regressions can be detected, not tests that validate correctness
8. Ask the AI to produce a written refactor plan for the Bootstrap migration:
   what to do in what order, what risks to watch for, and what "done" looks like for phase 1

## What to ignore for these clips
- Class component migration (Module 2)
- Performance issues (Module 2 Clip 4)
- Dead backend endpoints (Module 3)

## Suggested opening AI prompt (Clip 2)
"I have a React app that uses Bootstrap 4. We want to migrate to our internal design system
(src/components/ui/). Can you audit the codebase and tell me: which Bootstrap components
are used and where, which ones have design system equivalents, and where you'd recommend
we start the migration?"

## Key files to reference
- `frontend/src/components/ui/` — the unfinished design system
- `frontend/src/components/ui/DESIGN_SYSTEM_DRAFT.md` — the design spec
- `frontend/BOOTSTRAP_INVENTORY.md` — the incomplete audit to finish
- Any of the 15+ files using Bootstrap class names
```

---

## Branch 2: `demo/m2-c1-class-component-audit`

**Clip:** Module 2, Clip 1 — Auditing Code Quality
**Topic:** Finding class components and identifying migration candidates
**Commit message:** `demo: m2c1 — class component audit starting point`

### Additions

Add `frontend/src/components/dashboard/StatsPanel.jsx` — a new class component to audit:

```jsx
// StatsPanel.jsx
// Added Q4 2022 — was going to replace MetricsCard but never finished
// Author: platform team
import React, { Component } from 'react'

class StatsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = { stats: [], loading: true }
  }

  componentDidMount() {
    // TODO: wire up to real API
    this.setState({ stats: this.props.mockStats || [], loading: false })
  }

  render() {
    const { stats, loading } = this.state
    if (loading) return <div>Loading...</div>
    return (
      <div className="card">
        <div className="card-body">
          {stats.map((s, i) => (
            <div key={i} className="d-flex justify-content-between">
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default StatsPanel
```

Add a comment at the top of `UserTable.jsx`:
```js
// TODO: migrate to functional? — raised in retro Jan 2024, never scheduled
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 2, Clip 1: Class Component Audit

## What this demo covers
Using AI to audit the codebase for class components, assess their complexity,
and identify which are the best candidates for migration to functional components with hooks.

## What to demonstrate
1. Ask the AI to find all class components in the codebase
2. Ask the AI to rank them by migration complexity (simple → complex)
3. Ask the AI to identify which ones share similar patterns (e.g., ReportTable vs UserTable)
4. Ask the AI to flag any class components that appear to be dead code (like QuickStats)
5. Ask the AI to output a migration priority list

## What to ignore for this clip
- Actually migrating components (that's Clip 2)
- Architecture (that's Clip 3)
- Bootstrap (that's Module 1 / Module 3)

## Suggested opening AI prompt
"Can you audit this codebase and find all React class components? For each one,
tell me: what it does, how complex it is to migrate to a functional component,
and whether it appears to be actively used. Then give me a prioritized list of
which ones to migrate first."

## Class components to find (14 total: 13 from initial-state + StatsPanel added in this branch)
MetricsCard, MetricsSummary, RevenueChart, ActivityFeed, QuickStats (dead),
UserTable, UserFilters, UserExportButton, ReportTable, ReportFilters,
ChurnCohortChart, TeamSettings, ApiKeyManager, StatsPanel (new in this branch)

## Key files to reference
- `src/components/dashboard/` — 6 class components (including MetricsSummary and StatsPanel)
- `src/components/users/` — 3 class components
- `src/components/reports/` — 3 class components
- `src/components/settings/` — 2 class components
```

---

## Branch 3: `demo/m2-c2-class-to-functional`

**Clip:** Module 2, Clip 2 — Improving Maintainability
**Topic:** Migrating class components to functional with hooks
**Commit message:** `demo: m2c2 — class to functional migration starting point`

### Additions

Add `frontend/MIGRATION_NOTES.md` — a partially filled migration guide:

```markdown
# Class Component Migration Guide

## Why we're doing this
Hooks make components shorter, easier to test, and easier to reason about.
Class components can't use hooks. New team members find functional components easier to onboard with.

## Pattern reference

### componentDidMount → useEffect(() => {}, [])
### componentDidUpdate(prevProps) → useEffect(() => {}, [dep])
### componentWillUnmount → useEffect(() => { return () => cleanup() }, [])
### this.setState({ key: value }) → const [key, setKey] = useState(initialValue)

## Components to migrate (in order)
1. [ ] MetricsCard — medium complexity, good starter
2. [ ] ActivityFeed — has setInterval, good useEffect cleanup example
3. [ ] UserFilters — has the re-render bug to fix during migration
4. [ ] UserTable — most complex, do last
5. [ ] ReportTable — after UserTable (same pattern)

## Completed migrations
(none yet)
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 2, Clip 2: Class to Functional Migration

## What this demo covers
Using AI to migrate React class components to functional components with hooks,
following a consistent pattern that can be applied across the codebase.

## What to demonstrate
1. Start with `MetricsCard.jsx` — ask the AI to migrate it to a functional component
2. Walk through what changed: constructor→useState, componentDidMount→useEffect, etc.
3. Show the AI catching and fixing the JSON.stringify comparison bug during migration
4. Migrate `ActivityFeed.jsx` — demonstrate the setInterval cleanup pattern
5. Migrate `UserFilters.jsx` — show the AI catching the re-render loop bug in render()
6. Update `MIGRATION_NOTES.md` to mark completed items

## What to ignore for this clip
- Architectural changes (Clip 3)
- Fixing all 13 class components — just do 2-3 as examples

## Suggested opening AI prompt
"I want to migrate `src/components/dashboard/MetricsCard.jsx` from a React class component
to a functional component with hooks. Please migrate it, maintaining the same behavior,
and explain each change. Flag any bugs you notice in the original that we should fix during migration."

## Key files to reference
- `src/components/dashboard/MetricsCard.jsx`
- `src/components/dashboard/ActivityFeed.jsx`
- `src/components/users/UserFilters.jsx`
- `MIGRATION_NOTES.md`

## Watch for
The `UserFilters` re-render loop: `onFiltersChange` called inside `render()`.
AI should catch this and move it to a `useEffect` or event handler.
```

---

## Branch 4: `demo/m2-c3-architectural-refactoring`

**Clip:** Module 2, Clip 3 — Architectural Refactoring
**Topic:** Breaking down the monolithic DashboardPage into focused components, hooks, and utilities
**Commit message:** `demo: m2c3 — architectural refactoring starting point`

### Additions

Add an annotation comment block at the top of `DashboardPage.jsx`:

```jsx
// ============================================================
// DashboardPage.jsx
// ============================================================
// WARNING: This file has grown significantly. Current issues:
// - Mixes data fetching, state management, and rendering
// - Contains utility functions that belong in utils/
// - Too long to review in a single PR
// - Multiple developers have added to this file without refactoring
//
// Refactor target: break into focused components + custom hooks
// Raised in: Tech Debt Backlog #247
// Assigned to: nobody (yet)
// ============================================================
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 2, Clip 3: Architectural Refactoring

## What this demo covers
Using AI to decompose a large, monolithic component into smaller, focused
components, custom hooks, and utility functions.

## What to demonstrate
1. Ask the AI to analyze `DashboardPage.jsx` and describe all the responsibilities it has
2. Ask the AI to propose a decomposition plan (what to extract, where it should live)
3. Extract data fetching into custom hooks: `useDashboardMetrics`, `useActivityFeed`
4. Extract the inline utility functions into `utils/` (they already exist there — show the duplication)
5. Ask the AI to update any affected tests or imports

## What to ignore for this clip
- Fixing all utility duplication across the whole codebase (that's Module 3)
- Performance optimization (Clip 4)
- The class components (Clip 2)

## Suggested opening AI prompt
"Please analyze `src/pages/DashboardPage.jsx`. List every distinct responsibility this
component has. Then propose a refactoring plan: what should be extracted into custom hooks,
what should move to utility files, and what smaller components should be created.
Don't make any changes yet — just give me the plan."

## Key files to reference
- `src/pages/DashboardPage.jsx` — the monolith (~450 lines)
- `src/utils/metrics.js` — shows the duplicated utility functions
- `src/utils/dates.js` — shows the duplicated date formatters

## Expected outcome shape
- `src/hooks/useDashboardMetrics.js` (new)
- `src/hooks/useActivityFeed.js` (new)
- `src/pages/DashboardPage.jsx` (reduced to ~150 lines of pure rendering)
```

---

## Branch 5: `demo/m2-c4-performance`

**Clip:** Module 2, Clip 4 — Performance and Efficiency
**Topic:** Identifying and fixing unnecessary renders, missing memoization, redundant requests
**Commit message:** `demo: m2c4 — performance issues starting point`

### Additions

Add `frontend/src/components/users/UserList.jsx` — a new component with a deliberate
render-on-every-keystroke performance problem:

```jsx
// UserList.jsx
// Renders the full user list — added quickly for the v7 release
import React from 'react'

function UserList({ users, searchTerm }) {
  // BUG: This filter runs on every render with no memoization
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <p style={{ fontSize: 13, color: '#6b7280' }}>{filtered.length} users found</p>
      {filtered.map((user, index) => (
        // BUG: Using array index as key — unstable under sort/filter
        <div key={index} style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
          <strong>{user.name}</strong>
          <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 8 }}>{user.email}</span>
        </div>
      ))}
    </div>
  )
}

// Not memoized — re-renders whenever parent re-renders
export default UserList
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 2, Clip 4: Performance and Efficiency

## What this demo covers
Using AI to identify performance problems: unnecessary re-renders, missing memoization,
redundant API calls, and unoptimized list rendering.

## What to demonstrate
1. Ask the AI to audit the codebase for React performance anti-patterns
2. Show `RevenueChart.jsx` — the buggy `componentDidUpdate` that re-fetches too often
3. Show `UserFilters.jsx` — the re-render loop
4. Show `UserList.jsx` — the unoptimized filter with no useMemo and index-as-key
5. Show `DashboardPage.jsx` — the inline `filters` object causing useEffect to re-run
6. Ask the AI to propose and apply fixes: React.memo, useMemo, useCallback, fixing the condition bug

## What to ignore for this clip
- Class-to-functional migration (Clip 2)
- Architectural decomposition (Clip 3)

## Suggested opening AI prompt
"Please audit this React codebase for performance issues. Look for: unnecessary re-renders,
missing React.memo/useMemo/useCallback, expensive operations running on every render,
and any patterns that would cause components to re-fetch or re-render more than needed."

## Key files to reference
- `src/components/dashboard/RevenueChart.jsx` — buggy componentDidUpdate condition
- `src/components/users/UserFilters.jsx` — re-render loop
- `src/components/users/UserList.jsx` — unoptimized filter + index-as-key
- `src/pages/DashboardPage.jsx` — inline object in dependency array
```

---

## Branch 6: `demo/m2-c5-modernize-dependencies`

**Clip:** Module 2, Clip 5 — Modernizing Frameworks and Dependencies
**Topic:** Upgrading outdated dependencies, removing deprecated libraries
**Commit message:** `demo: m2c5 — outdated dependencies starting point`

### Additions

Add `frontend/DEPENDENCY_AUDIT.md` (intentionally incomplete, for AI to help fill):

```markdown
# Dependency Audit — DataPulse Frontend
_Started: Q1 2024_

## Known issues
- `moment` in backend: deprecated, large bundle size, recommend replacing with `date-fns`
- `react-router-dom` v5: v6 has breaking changes in routing API — needs migration planning
- `bootstrap` 4.6: Bootstrap 5 dropped jQuery dependency and changed class names

## Not yet assessed
- recharts version — is it current?
- react-scripts — any security advisories?
- Are there any packages with known CVEs?

## Upgrade priority
TBD
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 2, Clip 5: Modernizing Frameworks and Dependencies

## What this demo covers
Using AI to audit dependencies for outdated versions, deprecations, security issues,
and to plan incremental upgrades.

## What to demonstrate
1. Ask the AI to review `package.json` files and identify outdated or deprecated dependencies
2. Focus on `moment` in the backend — ask AI to migrate one route from moment to date-fns
3. Ask AI to explain the React Router v5 → v6 migration path and what would break
4. Ask AI to complete `DEPENDENCY_AUDIT.md` with its findings
5. Show how AI can make repetitive migration work (replacing moment calls) faster

## What to ignore for this clip
- Deep framework upgrades (React 17 → 18) — too large for a single clip demo
- CSS/Bootstrap migration (Module 1 / Module 3)

## Suggested opening AI prompt
"Please audit the `package.json` files in this project. For each dependency, tell me:
current version, whether it's outdated or deprecated, whether there are security concerns,
and how complex an upgrade would be. Then prioritize which to tackle first."

## Key files to reference
- `frontend/package.json`
- `backend/package.json`
- `backend/routes/metrics.js` (uses moment)
- `DEPENDENCY_AUDIT.md`
```

---

## Branch 7: `demo/m3-c1-dead-endpoints`

**Clip:** Module 3, Clip 1 — Why Large-Scale Refactoring Is Different
**Topic:** Using AI to identify unused API endpoints by reviewing backend and frontend simultaneously
**Commit message:** `demo: m3c1 — dead endpoint identification starting point`

### Additions

Add `backend/ENDPOINT_REGISTRY.md` (intentionally incomplete):

```markdown
# API Endpoint Registry
_Last updated: unknown_

## Active endpoints (confirmed)
- GET /api/v1/users
- GET /api/v1/metrics/mrr
- GET /api/v1/metrics/churn
- GET /api/v1/reports/summary

## Uncertain / needs verification
- GET /api/v1/reports/export — was this replaced?
- POST /api/v1/reports/schedule — was this ever finished?
- Everything in /api/v1/legacy/* — no idea

## Process
To verify: search frontend src/ for fetch calls to each endpoint.
If no frontend call found → candidate for removal.
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 3, Clip 1: Identifying Dead API Endpoints

## What this demo covers
Using AI to cross-reference backend routes against frontend API calls to identify
endpoints that are registered but never called — a common large-codebase problem.

## What to demonstrate
1. Ask the AI to list all registered API endpoints in the backend
2. Ask the AI to search the frontend for all fetch/API calls and extract the URLs
3. Ask the AI to cross-reference: which backend endpoints are never called from the frontend?
4. Ask the AI to check `routes/legacyExport.js` specifically — is anything in there called?
5. Ask the AI to update `ENDPOINT_REGISTRY.md` with its findings and flag removal candidates

## What to ignore for this clip
- Fixing the dead endpoints (just identify them)
- Frontend duplicate fetch patterns (Module 2)

## Suggested opening AI prompt
"I want to identify dead API endpoints in this codebase. Can you:
1. List all routes registered in the backend (server.js + all route files)
2. Search the frontend src/ for all API calls and extract the endpoint URLs
3. Cross-reference them and tell me which backend endpoints are never called from the frontend"

## Key files to reference
- `backend/server.js` — where all routes are registered
- `backend/routes/legacyExport.js` — entire file is dead
- `backend/routes/reports.js` — 2 dead endpoints
- `backend/routes/settings.js` — 1 dead endpoint
- `backend/ENDPOINT_REGISTRY.md` — the incomplete audit to complete
- `frontend/src/utils/api.js`, `apiHelpers.js`, `apiClient.js` — the 3 fetch clients

## Dead endpoints to find (6 total)
- GET /api/v1/reports/export
- POST /api/v1/reports/schedule
- GET /api/v1/legacy/export/csv
- GET /api/v1/legacy/export/pdf
- POST /api/v1/legacy/export/bulk
- POST /api/v1/settings/migrate
```

---

## Branch 8: `demo/m3-c4-design-consistency`

**Clip:** Module 3, Clip 4 — Design Debt and Consistency Audits
**Topic:** Using AI to audit design inconsistencies and propose a token system for gradual migration
**Commit message:** `demo: m3c4 — design consistency audit starting point`

### Additions

Add `frontend/src/styles/STYLE_AUDIT.md` (incomplete, for AI to help complete):

```markdown
# Style Audit — DataPulse
_Status: in progress_

## Known problems
- Multiple blue values used for "primary" color — exact count unknown
- Font sizes are inconsistent across pages
- Spacing mix of px, rem, and Bootstrap utilities

## Design token candidates
- Primary color: ???
- Spacing scale: ???
- Font size scale: ???

## Files to audit
(all CSS files + component inline styles)
```

### DEMO_BRIEF.md

```markdown
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
```

---

## Branch 9: `demo/m3-c5-bootstrap-migration-at-scale`

**Clip:** Module 3, Clip 5 — Example-Driven, Repetitive Migrations
**Topic:** Using 2 completed Bootstrap migrations as examples to drive 15 more with AI
**Commit message:** `demo: m3c5 — bootstrap migration at scale starting point`

### Additions

Add two pre-completed migration examples the instructor can reference:

Add `frontend/src/components/ui/examples/Button.migration-example.md`:

````markdown
# Migration Example: Bootstrap Button → DataPulse Button

## Before (Bootstrap)
```jsx
<button className="btn btn-primary" onClick={handleSave}>
  Save changes
</button>

<button className="btn btn-outline-secondary btn-sm" disabled={loading}>
  Cancel
</button>
```

## After (DataPulse UI)
```jsx
import { Button } from '../ui'

<Button variant="primary" onClick={handleSave}>
  Save changes
</Button>

<Button variant="secondary" size="sm" disabled={loading}>
  Cancel
</Button>
```

## Mapping reference
| Bootstrap class | DataPulse prop |
|---|---|
| btn-primary | variant="primary" |
| btn-secondary / btn-outline-secondary | variant="secondary" |
| btn-danger | variant="danger" |
| btn-sm | size="sm" |
| btn-lg | size="lg" |
| disabled attribute | disabled prop |
````

Add `frontend/src/components/ui/examples/Badge.migration-example.md`:

````markdown
# Migration Example: Bootstrap Badge → DataPulse Badge

## Before (Bootstrap)
```jsx
<span className="badge badge-success">Active</span>
<span className="badge badge-warning">Trial</span>
<span className="badge badge-danger">Churned</span>
<span className="badge badge-pill badge-secondary">Legacy</span>
```

## After (DataPulse UI)
```jsx
import { Badge } from '../ui'

<Badge status="active">Active</Badge>
<Badge status="warning">Trial</Badge>
<Badge status="danger">Churned</Badge>
<Badge variant="pill" status="secondary">Legacy</Badge>
```

## Mapping reference
| Bootstrap class | DataPulse prop |
|---|---|
| badge-success | status="active" |
| badge-warning | status="warning" |
| badge-danger | status="danger" |
| badge-secondary | status="secondary" |
| badge-pill | variant="pill" |
````

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 3, Clip 5: Bootstrap Migration at Scale

## What this demo covers
Using completed migration examples to guide AI in migrating Bootstrap components
consistently across 15 files — demonstrating example-driven, repeatable AI workflows.

## What to demonstrate
1. Show the two completed migration examples in `src/components/ui/examples/`
2. Ask the AI to use these examples as a pattern and identify all Bootstrap Button usages
3. Ask the AI to migrate ALL Bootstrap Buttons across the codebase in one pass
4. Do the same for Bootstrap Badges
5. Show how to verify the changes are consistent using a follow-up audit prompt
6. Discuss: what needs human review vs what can be merged with confidence

## What to ignore for this clip
- Deep architectural changes
- CSS/token migration (Clip 4)
- Non-Button/Badge Bootstrap components (save those for a live exercise)

## Suggested opening AI prompt
"I have two migration examples in `src/components/ui/examples/`. Using these examples
as your guide, please find every Bootstrap `btn` class usage across the entire frontend
and migrate them to use the `<Button>` component from `src/components/ui/`. Apply the
same change consistently across all files. Do not change anything else."

## Files with Bootstrap Button or Badge usage (15 total)
DashboardPage.jsx, UsersPage.jsx, ReportsPage.jsx, SettingsPage.jsx,
MetricsCard.jsx, UserTable.jsx, UserFilters.jsx, UserRow.jsx,
UserExportButton.jsx, ReportTable.jsx, ReportFilters.jsx,
TeamSettings.jsx, ApiKeyManager.jsx, Sidebar.jsx, TopBar.jsx

## Key files to reference
- `src/components/ui/Button.jsx` — the target component
- `src/components/ui/Badge.jsx` — the target component
- `src/components/ui/examples/Button.migration-example.md`
- `src/components/ui/examples/Badge.migration-example.md`
```

---

## Branch 10: `demo/m4-c2-git-discipline`

**Clip:** Module 4, Clip 2 — Git Discipline for AI Changes
**Topic:** Using AI to split large diffs into focused commits, write commit messages, and draft PR descriptions
**Commit message:** `demo: m4c2 — git discipline starting point`

### Additions

Add `frontend/src/CHANGES_IN_PROGRESS.md` — simulating a messy in-progress branch state:

```markdown
# Changes In Progress (DO NOT MERGE YET)

This branch contains multiple unrelated changes that got bundled together:
1. Migrated MetricsCard from class to functional
2. Fixed the UserFilters re-render loop (unrelated bug fix)
3. Added a new `useDashboardMetrics` hook (new feature)
4. Updated some CSS colors in dashboard.css (unrelated cleanup)
5. Removed QuickStats.jsx (dead code cleanup)

These probably should have been separate PRs.
TODO: figure out how to split this before review.
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 4, Clip 2: Git Discipline for AI Changes

## What this demo covers
Using AI to bring discipline to version control: splitting large diffs into
focused commits, generating conventional commit messages, and drafting PR descriptions.

## What to demonstrate
1. Show `CHANGES_IN_PROGRESS.md` — a realistic mixed-change situation
2. Ask the AI to look at the changes and propose how to split them into focused commits
3. Ask the AI to write conventional commit messages for each logical group
4. Ask the AI to draft a PR description summarizing the changes
5. Ask the AI to suggest who might be appropriate reviewers based on file history (even if no real history)
6. Discuss: what makes a good atomic commit vs a "too small" commit

## Suggested opening AI prompt
"I've been making several unrelated changes and want to split them into focused,
reviewable commits. Look at `CHANGES_IN_PROGRESS.md` and the current state of the
codebase. Propose how to group these changes into separate commits with conventional
commit messages (feat/fix/refactor/chore), and draft a PR description for each group."

## Key concepts to cover
- Conventional commits: feat, fix, refactor, chore, docs
- One logical change per commit
- PR descriptions that explain WHY, not just WHAT
- Atomic commits that pass CI independently
```

---

## Branch 11: `demo/m4-c3-cicd-quality-gates`

**Clip:** Module 4, Clip 3 — CI/CD Quality Gates
**Topic:** Using AI to generate missing tests, set up linting, and establish a quality gate pipeline
**Commit message:** `demo: m4c3 — CI/CD setup starting point`

### Additions

Add `frontend/src/utils/__tests__/` directory with one incomplete test file
to show what's missing:

```js
// frontend/src/utils/__tests__/metrics.test.js
// Started but never finished — only covers one function
import { calculateMRR } from '../metrics'

describe('calculateMRR', () => {
  it('returns 0 for empty subscriptions', () => {
    expect(calculateMRR([])).toBe(0)
  })

  // TODO: add more tests
  // TODO: what about calculateMRRNew? should these be the same?
})
```

Add `.github/workflows/` directory with an incomplete CI config:

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd frontend && npm install
      - run: cd frontend && npm run build
      # TODO: add test step
      # TODO: add lint step
      # TODO: add type check step (if we add TypeScript)
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 4, Clip 3: CI/CD Quality Gates

## What this demo covers
Using AI to establish automated quality gates: generating missing tests,
setting up ESLint, and building out a CI pipeline that catches regressions before merge.

## What to demonstrate
1. Show the incomplete CI config and the single test file — this is all that exists
2. Ask the AI to generate characterization tests for `utils/metrics.js`
3. Ask the AI to generate tests for `utils/dates.js` and `utils/dateUtils.js` — including tests that expose the inconsistency between them
4. Ask the AI to set up an ESLint config appropriate for React 17
5. Ask the AI to complete the GitHub Actions CI workflow (add test, lint, build steps)
6. Run the linter — show what it flags in the existing codebase

## Suggested opening AI prompt
"This codebase has almost no tests and no linting. I want to add quality gates.
First, can you generate a thorough test suite for `src/utils/metrics.js`?
Then set up an ESLint config with React-appropriate rules.
Finally, update the GitHub Actions CI workflow to run tests and linting on every push."

## Key files to reference
- `.github/workflows/ci.yml` — the incomplete pipeline
- `frontend/src/utils/__tests__/metrics.test.js` — the one existing test
- `frontend/src/utils/metrics.js` — has `calculateMRR` and `calculateMRRNew` (both present!)
- `frontend/src/utils/dates.js` vs `utils/dateUtils.js` — tests should expose the format difference

## Watch for
Tests for `calculateMRR` vs `calculateMRRNew` — the AI should notice both exist and ask
or flag whether they're supposed to behave the same way.
```

---

## Branch 12: `demo/m4-c1-regression-risks`

**Clip:** Module 4, Clip 1 — Why Refactors Break Production
**Topic:** Understanding how well-intentioned refactors introduce regressions — using real bugs in this codebase as examples
**Commit message:** `demo: m4c1 — regression risk examples starting point`

### Additions

No new code is needed — the existing codebase already contains the examples. Add only
`REGRESSION_EXAMPLES.md` at the repo root to anchor the demo:

```markdown
# Regression Risk Examples — DataPulse

This file documents known bugs in the codebase that are good teaching examples
of how refactoring without understanding behavior can silently break production.

## Example 1: RevenueChart re-fetch loop
**File:** `frontend/src/components/dashboard/RevenueChart.jsx`
**Bug:** `componentDidUpdate` uses `>=` instead of `!==` when comparing `dateRange`.
**Risk:** Refactoring this component without noticing the condition would "fix" the
comparison to a sensible value (e.g., `!==`), *changing behavior* — which might be
intentional or might cause other things to break depending on how dateRange is structured.
**Lesson:** Behavior that looks like a bug may be load-bearing. Characterize before changing.

## Example 2: UserFilters re-render loop
**File:** `frontend/src/components/users/UserFilters.jsx`
**Bug:** `onFiltersChange` is called inside `render()`, triggering a parent re-render loop
that React's batching currently suppresses.
**Risk:** Migrating this to a functional component without moving the call into a `useEffect`
or event handler would surface the loop, because React's batching behavior changed in v18.
**Lesson:** A refactor that changes the React version or component model can expose bugs
that were silently suppressed.

## Example 3: calculateRetentionScore — unknown correctness
**File:** `frontend/src/utils/metrics.js`
**Bug:** Unknown — no documentation, no tests, no author.
**Risk:** Any refactor that renames parameters, reorders arguments, or "cleans up" the
formula could silently change the Health Score shown to users. There is no test to catch it.
**Lesson:** Undocumented logic is the highest-risk refactor target. Write characterization
tests that capture current output before touching anything.

## Example 4: Three fetchWithAuth implementations
**Files:** `utils/api.js`, `utils/apiHelpers.js`, `utils/apiClient.js`
**Bug:** Each reads from a different localStorage/sessionStorage key, and one adds /api/v1
as a prefix while the others don't.
**Risk:** Consolidating these into one implementation without checking which components
use which version would silently break authentication for some requests.
**Lesson:** Duplication is not always safe to naively deduplicate. Understand the divergence first.
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 4, Clip 1: Why Refactors Break Production

## What this demo covers
Understanding common failure modes in refactoring: hidden dependencies, silent behavioral
changes, load-bearing bugs, and overconfidence in AI-generated changes.

## What to demonstrate
1. Open `REGRESSION_EXAMPLES.md` — walk through each example as a discussion anchor
2. For Example 1 (RevenueChart): ask the AI to "clean up" the componentDidUpdate condition.
   Show how the AI naturally fixes `>=` to `!==` — which may or may not be correct.
   The point: the AI cannot know if this was intentional. Neither can you without tests.
3. For Example 3 (calculateRetentionScore): ask the AI to explain what the function does.
   Show how it can only guess — no variable names, no comments, no tests.
   Then ask the AI to generate a characterization test before any changes are made.
4. Discuss: what is a characterization test, and why do we write it before refactoring,
   not after?

## Key principle to land
Small, isolated changes are safer than large rewrites. Always establish a behavioral
baseline (via tests or observation) before asking AI to refactor anything critical.

## Key files to reference
- `REGRESSION_EXAMPLES.md` — the four teaching examples
- `src/components/dashboard/RevenueChart.jsx` — Example 1
- `src/components/users/UserFilters.jsx` — Example 2
- `src/utils/metrics.js` — Example 3 (calculateRetentionScore)
- `src/utils/api.js`, `apiHelpers.js`, `apiClient.js` — Example 4
```

---

## Branch 13: `demo/m5-c3-sustaining`

**Clip:** Module 5, Clip 3 — Sustaining the Investment
**Topic:** Using AI to enforce standards that prevent old patterns from returning
**Commit message:** `demo: m5c3 — sustaining standards starting point`

### Additions

Add `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## What does this PR do?

_Describe the change and why it's being made._

## Checklist

- [ ] No new Bootstrap class names added (use `src/components/ui/` instead)
- [ ] No new class components added (use functional components with hooks)
- [ ] No new copies of `fetchWithAuth` (use the canonical client in `utils/apiClient.js`)
- [ ] Utility functions go in `utils/` — not inline in components
- [ ] New files have at least one test
- [ ] No hardcoded color values in CSS (use design tokens from `main.css :root`)

## Migration progress (if applicable)

_If this PR migrates Bootstrap components or class components, update the count below._

- Bootstrap files remaining: __ / 15
- Class components remaining: __ / 13
```

Add a partial `.eslintrc.js` with rules that enforce the standards being introduced:

```js
// .eslintrc.js
// Enforces patterns established during the legacy refactor.
// Rules are warnings now — will be promoted to errors after full migration.
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app'],
  rules: {
    // Discourage new class components — prefer functional + hooks
    'react/prefer-stateless-function': 'warn',

    // Flag direct Bootstrap class usage in JSX — use ui/ components instead
    // NOTE: this is a placeholder; enforce via code review until a custom rule is written
    // 'no-restricted-syntax': [...],  // TODO: add custom AST rule for Bootstrap classNames

    // Catch the most common dead-code smell
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],

    // Prevent the fetchWithAuth duplication pattern
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          { name: './api', message: 'Use apiClient.js — api.js is deprecated.' },
          { name: '../utils/api', message: 'Use apiClient.js — api.js is deprecated.' },
          { name: './apiHelpers', message: 'Use apiClient.js — apiHelpers.js is deprecated.' },
          { name: '../utils/apiHelpers', message: 'Use apiClient.js — apiHelpers.js is deprecated.' },
        ],
      },
    ],
  },
}
```

### DEMO_BRIEF.md

```markdown
# Demo Brief — Module 5, Clip 3: Sustaining the Investment

## What this demo covers
Using AI to set up enforcement mechanisms — PR templates, ESLint rules, and recurring
audit prompts — that prevent old patterns from re-entering the codebase after the
migration work is done.

## What to demonstrate
1. Show the PR template — walk through each checklist item and explain why it exists
2. Show the `.eslintrc.js` — run it against the existing codebase to show it already
   catches `no-unused-vars` violations and deprecated import paths
3. Ask the AI to write a custom ESLint rule (or no-restricted-syntax config) that flags
   any JSX `className` containing `btn ` or `badge ` — catching new Bootstrap usage at lint time
4. Ask the AI to write a recurring audit prompt: "scan this codebase and tell me if any
   new Bootstrap class names, class components, or copies of fetchWithAuth have been added
   since the last audit" — show how this can be run periodically as a health check
5. Discuss: refactoring is complete when the old patterns stop coming back, not when the PR merges

## Suggested opening AI prompt
"We've finished a round of legacy refactoring. Help me set up guardrails so the old
patterns don't come back. I want: an ESLint rule that flags new Bootstrap className usage
in JSX, and a reusable audit prompt I can run monthly to check for regressions toward
class components, Bootstrap, or duplicate fetch utilities."

## Key files to reference
- `.github/PULL_REQUEST_TEMPLATE.md` — the PR checklist
- `.eslintrc.js` — the partial lint config to extend
- `src/components/ui/` — the design system to enforce adoption of
- `src/utils/apiClient.js` — the canonical fetch client to enforce use of

## Builds on
This clip works best after Branch 11 (CI/CD) — the ESLint config here can be wired
into the GitHub Actions workflow established there.
```

---

## Final Setup Commands

After generating all branches, run this to verify:

```bash
git branch -a
# Should show:
# * initial-state
#   demo/m1-bootstrap-planning
#   demo/m2-c1-class-component-audit
#   demo/m2-c2-class-to-functional
#   demo/m2-c3-architectural-refactoring
#   demo/m2-c4-performance
#   demo/m2-c5-modernize-dependencies
#   demo/m3-c1-dead-endpoints
#   demo/m3-c4-design-consistency
#   demo/m3-c5-bootstrap-migration-at-scale
#   demo/m4-c1-regression-risks
#   demo/m4-c2-git-discipline
#   demo/m4-c3-cicd-quality-gates
#   demo/m5-c3-sustaining
```

To start recording any clip:
```bash
git checkout demo/<branch-name>
# Open DEMO_BRIEF.md for your script
# Use the suggested opening AI prompt to begin the demo
```