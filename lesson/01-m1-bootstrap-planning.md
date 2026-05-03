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
