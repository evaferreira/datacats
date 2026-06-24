# Demo Brief — Module 1: Bootstrap-to-Design-System Migration Planning

## Clips covered
- Clip 2: Exploring the Codebase with AI — **1 demo**
- Clip 3: Prioritization and Scoping — **no demo, slide-only**
- Clip 4: Planning Safe Incremental Refactors — **2 demos**

## Setup
- **AI surface:** VS Code with a Claude AI extension. All prompts sent from inside the IDE.
- **Capture style:** Eva records the full session and speeds up slow parts in edit.
- **Continuity:** The `CLAUDE.md` generated in Clip 2 stays in the repo for Clip 4. The `BOOTSTRAP_INVENTORY.md` is generated at the top of Clip 4 Demo A and feeds the refactor plan.

---

## Demo 1 — Clip 2: Exploring (broad → narrow → capture)

The arc mirrors the script's closing warning: don't ask AI to understand everything at once — orient, then map, then capture what was learned so the next AI session doesn't start from zero.

**Beat 1 — Orient**
> What is this app? What does the frontend do, at a high level? What are the pieces of the backend?

AI summarizes purpose, main flows, key directories. Demonstrates AI as *navigator*.

**Beat 2 — Map**
> How is the frontend organized? What's in `src/components/ui/`, and how does it compare to what's actually being used elsewhere?

AI surfaces the half-built design system and names the gap. Demonstrates *translator/explainer*.

> Do we have duplicated components in boostrap and in our ui library?

**Beat 3 — Capture context for coding agents**

This is where the script's "adding instructions to coding agents like Claude / Cursor / Codex" lands. The artifact: a `CLAUDE.md` at the repo root that future AI sessions can read.

> Based on what you've learned about this codebase, draft a `CLAUDE.md` at the repo root. Include: (1) a one-paragraph overview of what the app is, (2) the key directories and what lives in each, (3) the design system situation — `src/components/ui/` exists but is partial, Bootstrap is still used widely — and the convention to prefer the design system for any new work, (4) anything else a new contributor (human or AI) should know before making changes.

AI writes the file. Voiceover note: same approach works for `.cursorrules`, `AGENTS.md`, or any other agent-instruction file — different surfaces, same idea.

**Beat 4 — Handoff**
Voiceover: "Now any future AI session — ours or anyone else's — starts with context, not from zero. Next, we decide what to migrate first."

---

## Clip 3 — slide-only (no demo)

Content moved from previous demo slot into the slides:
- Identifying which files are safest to migrate first (least risky, most reused)
- 2x2 prioritization framework: Business Criticality vs Change Pain
- Producing a prioritized migration backlog

---

## Demo 2 — Clip 4 Part A: Inventory → Refactor Plan

Two beats: first build the inventory of what's actually using Bootstrap, then feed it into the six-piece refactor plan. Inventory generation can be sped up heavily in edit; the refactor plan is the focus.

**Beat 1 — Build the inventory**
> Create a `BOOTSTRAP_INVENTORY.md` that lists every place Bootstrap is used: file path, Bootstrap classes/components used, and design system equivalent (if any). Group by component.

AI writes the inventory file. This becomes the input for the next prompt.

**Beat 2 — Produce the refactor plan**
> Using the `BOOTSTRAP_INVENTORY.md` we just created, produce a refactor plan for migrating off Bootstrap. Structure it as:
>
> 1. Scope — what's in / out of scope for phase 1
> 2. Dependencies — what else changes when we touch these components
> 3. Risk areas — what could break, what's fragile
> 4. Safety mechanisms — what validates current behavior today
> 5. Rollback strategy — how we revert if something goes wrong
> 6. Incremental milestones — multi-phase roadmap, one PR per Bootstrap component. List Phase 1 (badges) in detail and the remaining phases as a short ordered table (component, DS prep work required).
>
> Phase 1 will remove all Bootstrap badge usage from the app. The DS `Badge` component is the only fully usable piece of the design system today, so this is the one cut we can make end-to-end. Identify every file using Bootstrap Badges and plan the migration.

**Voiceover highlights** (~3 of the 6 sections):
- **Scope** is a vertical slice — one Bootstrap concern (`badge`), across all 4 files that use it. Not "migrate two random components."
- **Safety mechanisms** flags that none of the badge-using files have tests for badge rendering. The closest coverage is `UserTable.test.jsx`, which tests sort behavior on the table that *contains* `UserRow` — not the badges themselves. Sets up Demo 3.
- **Milestones** are file-by-file: one commit per file, four commits total, with the final step being deletion of the badge-related rules in `bootstrap-overrides.css`. Each step is independently revertible.

**Transferable takeaways.**
- The pattern: build the inventory artifact first, then plan against it. AI works better with an explicit input file than with vague "look at the whole repo."
- The six-piece prompt template itself is the lesson — viewers can copy it into their own work.
- **Vertical-slice scoping**: phase 1 isn't "two random components" — it's "one Bootstrap concern, every place it's used." This produces something deletable at the end of the phase, not just "less Bootstrap somewhere."

---

## Demo 3 — Clip 4 Part B: Identifying Missing Coverage

Phase 1 touches 4 files (every Bootstrap badge usage). None of them have direct tests for badge rendering. The closest existing coverage is `UserTable.test.jsx`'s sort tests — same table that contains `UserRow`, but no assertions on the status badge. Demo 3 surfaces this and writes the one test that makes the migration safe.

**Beat 1 — Surface the gaps**
> Audit test coverage in `frontend/src/`. For the files we're about to migrate (everywhere Bootstrap Badge is used), what's covered and what isn't?

AI returns a structured answer: `UserTable.test.jsx` covers sort behavior on the table containing `UserRow`, but nothing asserts on the badge rendering itself; `DashboardPage`, `ReportsPage`, `ActivityFeed`, and `UserRow` all have zero coverage on the status → badge-class mapping. Concrete picture of where the safety net is missing.

**Beat 2 — Narrow to the spec**
> Across the 4 files using Bootstrap badges, the shared behavior is mapping a status value to a Bootstrap badge variant (e.g., `active → badge-success`, `at-risk → badge-warning`, `churned → badge-danger`). List the observable behaviors a characterization test needs to pin down before we swap these for the DS `Badge` component. Where is this mapping defined? What's the full set of status values?

AI produces a *spec* — the status → class mapping, edge cases (unknown status falls back to `badge-secondary`), where the logic lives (e.g., `statusBadgeClass` in `UserRow.jsx`, inline in the pages).

**Voiceover cue between Beats 2 and 3:** "Notice we're not testing the migration target yet — we're pinning down what *current* behavior looks like. If the refactor accidentally changes which status gets which color, the test breaks."

**Beat 3 — Write the test that protects the migration**
> Based on that spec, generate one characterization test for `UserRow.jsx`'s status → badge class mapping. Cover all four status values, including the unknown fallback.

Viewer sees a new test file appear — `UserRow.test.jsx` — that asserts the current `badge badge-success` / `warning` / `danger` / `secondary` rendering for each status. When the migration swaps Bootstrap classes for `<Badge tone={...}>`, this test will fail — *intentionally* — and Eva can show how to update it to assert on the new DS surface. That's the human-in-the-loop moment the slides argue for.

**Why pick `UserRow` for the one test:** the badge mapping logic in `UserRow.jsx` is explicit (`statusBadgeClass` function), so the test has a clear single-file target rather than inline JSX scattered across pages. The same test pattern applies to the other 3 files — Eva can note that in voiceover.

**Why spec-before-test.** The clip closes by warning that AI-generated tests can miss edge cases. By having the human read the spec first, then generating a test grounded in that spec, the demo enacts the human-review step the slides are about to argue for. Going straight from gap → test would undercut the message.

---

## Files involved in phase 1 (Bootstrap badge removal)

All 4 use `badge badge-success | warning | danger | secondary`. All migrate to the DS `Badge` component (tones: `success` / `warning` / `danger` / `neutral`).

- [frontend/src/components/users/UserRow.jsx](frontend/src/components/users/UserRow.jsx) — `statusBadgeClass(status)` function maps the status string to a Bootstrap class. **Demo 3 writes the test here.**
- [frontend/src/components/dashboard/ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) — `badge badge-pill badge-*` for activity status. Pill shape is the DS Badge default.
- [frontend/src/pages/DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) — inline badge classes on a status column.
- [frontend/src/pages/ReportsPage.jsx](frontend/src/pages/ReportsPage.jsx) — same pattern, ×2 tables.

Final phase 1 step: delete the `.badge` override block in [frontend/src/styles/bootstrap-overrides.css](frontend/src/styles/bootstrap-overrides.css). That's the "we shipped something deletable" moment.

## Existing test coverage (carried forward from main)

[frontend/src/components/users/UserTable.test.jsx](frontend/src/components/users/UserTable.test.jsx) — 2 sort tests. Not directly relevant to phase 1's badge migration, but a useful contextual artifact: when Demo 3 surfaces coverage gaps, this is the one existing test the AI will find, and the spec can call out that it covers UserTable's *sort*, not UserRow's *badge*.

## What to ignore for this module
- Class component migration (Module 2)
- Performance issues (Module 2 Clip 4)
- Dead backend endpoints (Module 3)

## Pre-record checklist
- Run every prompt cold against the repo before recording. AI output varies; pin down the version Eva likes and shoot to that.
- The `CLAUDE.md` produced in Clip 2 should stay in the repo for Clip 4 — it's part of the context the Clip 4 demos inherit.
- The half-built design system in `frontend/src/components/ui/` (Button, Card, Badge, Input) is real — don't introduce it as if it doesn't exist.

## Key files in the repo
- `frontend/src/components/ui/` — the partially-built design system. Only `Badge` is fully usable today; `Button` is partial (primary/secondary only); `Card` has a className collision; `Input` is a stub. This is *why* phase 1 has to be badges.
- 27 files using Bootstrap classes; hot spots in `components/users/`, `components/reports/`, `components/dashboard/`, `components/layout/`. Phase 1 touches the 4 that use `badge`.
- Test runner wired up: `react-scripts test`, RTL 12, jest-dom, user-event 13
- `frontend/src/components/users/UserTable.test.jsx` — 2 sort tests, passes today. Contextual (covers the table containing UserRow), not directly part of phase 1's safety net.
- `frontend/src/components/users/UserRow.test.jsx` — does not exist yet; created during Clip 4 Demo B as the phase 1 safety net.
- No `CLAUDE.md` yet — created during Clip 2 Demo
- No `BOOTSTRAP_INVENTORY.md` yet — created at the start of Clip 4 Demo A
