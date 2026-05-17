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
> Create a `BOOTSTRAP_INVENTORY.md` that lists every place Bootstrap is used: file path, Bootstrap classes/components used, and design system equivalent (if any). Group by directory.

AI writes the inventory file. This becomes the input for the next prompt.

**Beat 2 — Produce the refactor plan**
> Using the `BOOTSTRAP_INVENTORY.md` we just created, produce a refactor plan for migrating off Bootstrap. Structure it as:
>
> 1. Scope — what's in / out of scope for phase 1
> 2. Dependencies — what else changes when we touch these components
> 3. Risk areas — what could break, what's fragile
> 4. Safety mechanisms — what validates current behavior today
> 5. Rollback strategy — how we revert if something goes wrong
> 6. Incremental milestones — small, independently shippable steps
>
> Start phase 1 with the two simplest components in the inventory.

**Voiceover highlights** (~3 of the 6 sections):
- **Scope** is narrow — not "migrate everything"
- **Safety mechanisms** flags *zero existing tests* — naturally sets up Demo 3
- **Milestones** are component-by-component, not big-bang

**Transferable takeaways.**
- The pattern: build the inventory artifact first, then plan against it. AI works better with an explicit input file than with vague "look at the whole repo."
- The six-piece prompt template itself is the lesson — viewers can copy it into their own work.

---

## Demo 3 — Clip 4 Part B: Identifying Missing Coverage

The repo has zero tests anywhere in `frontend/src/`. The brutal first AI response is itself the demo moment.

**Beat 1 — Surface the gap**
> Audit test coverage in `frontend/src/`. Where are the gaps?

AI returns: no tests anywhere. Stark, memorable.

**Beat 2 — Narrow to phase 1**
> For `UserTable.jsx` and `ReportFilters.jsx` (our phase 1 migration targets), what behavior would characterization tests need to capture before we refactor? List the observable behaviors that any safe refactor must preserve.

AI produces a *spec* — props, states, interactions, edge cases — without writing tests yet.

**Voiceover cue between Beats 2 and 3:** "Notice we're not asking AI to invent what should be tested — we're letting it list what *is* there, then we pick what to pin down first."

**Beat 3 — Generate one test**
> Generate one characterization test for `UserTable.jsx`'s sort behavior, based on the spec above.

Single test for one behavior. Shows the next step without rushing through a full suite.

**Why spec-before-test.** The clip closes by warning that AI-generated tests can miss edge cases. By having the human read the spec first, then generating a test grounded in that spec, the demo enacts the human-review step the slides are about to argue for. Going straight from gap → test would undercut the message.

---

## Characterization test candidates

Used in Demo 3, also viable for any future demo of "refactor with a safety net."

- `frontend/src/components/users/UserTable.jsx` — class component, sorting/pagination/selection, ~120 lines, heavy Bootstrap usage
- `frontend/src/components/reports/ReportFilters.jsx` — class component, date/select filters, ~75 lines, clean isolation

Both have visible behavior worth pinning down and real Bootstrap coupling that makes the migration narrative credible.

## What to ignore for this module
- Class component migration (Module 2)
- Performance issues (Module 2 Clip 4)
- Dead backend endpoints (Module 3)

## Pre-record checklist
- Run every prompt cold against the repo before recording. AI output varies; pin down the version Eva likes and shoot to that.
- The `CLAUDE.md` produced in Clip 2 should stay in the repo for Clip 4 — it's part of the context the Clip 4 demos inherit.
- The half-built design system in `frontend/src/components/ui/` (Button, Card, Badge, Input) is real — don't introduce it as if it doesn't exist.

## Key files in the repo
- `frontend/src/components/ui/` — the partially-built design system (4 components)
- 27 files using Bootstrap classes; hot spots in `components/users/`, `components/reports/`, `components/dashboard/`, `components/layout/`
- No `CLAUDE.md` yet — created during Clip 2 Demo
- No `BOOTSTRAP_INVENTORY.md` yet — created at the start of Clip 4 Demo A
- No tests anywhere in `frontend/src/` — surfaced in Clip 4 Demo B
