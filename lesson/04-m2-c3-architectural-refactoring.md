# Demo Brief — Module 2, Clip 3: Architectural Refactoring

## What this clip covers
Once readability is improved, tackle structure. Outline framing: take a large
legacy frontend component and decompose it into smaller pieces — components,
hooks, utilities. The natural target in this codebase is `DashboardPage.jsx`
(454 lines, mixed responsibilities, inline duplicate utils).

## Demo shape (role in the module rhythm)
**Multi-file structural change + capture-what-we-learned beat.** New files
appear (`src/hooks/`), an existing file shrinks visibly, imports rewire, and
the clip closes with a small edit to `CLAUDE.md` / `AGENTS.md` to pin the new
convention. Distinct from Clip 2 (single-file translation) and Clip 4 (small
surgical fix). The "plan before execute" beat happens conversationally with
the AI — *no markdown plan document is written*, because Clip 1's audit is
the only audit-doc clip in M2.

## Continuity
- **Reads:** `MIGRATION_AUDIT.md` from Clip 1 (and the now-functional `MetricsCard`
  from Clip 2 if it ran).
- **Writes:** code only — new hook files, updated `DashboardPage.jsx`. Plus a
  small append to `CLAUDE.md` / `AGENTS.md` (the agent-instruction file
  created in M1c2) capturing the new convention.
- **Why the capture beat lives here:** Clip 3 introduces `src/hooks/` as a
  brand-new directory and a brand-new convention. The lesson — *when you
  establish a new convention, tell future AI sessions about it* — falls out
  of this clip organically without competing with M1's content.

## Candidate demos (pick one)

### Option A — Plan, extract one hook, capture the convention (recommended)
Three beats:
1. Ask AI to enumerate `DashboardPage`'s responsibilities (data fetching, derived metrics, date filters, layout, dead code). AI proposes a decomposition plan.
2. Execute one piece on camera: extract the metrics-fetching into a `useDashboardMetrics` hook in a new `src/hooks/` directory. `DashboardPage` shrinks visibly.
3. **Capture the convention.** Ask AI to update `CLAUDE.md` / `AGENTS.md` with the new rules we just established: hooks live in `src/hooks/`, page components stay thin, data-fetching belongs in hooks. Show the diff — it should be small (a few lines).

**Shines because:** mirrors M1c4 exactly (audit → plan → execute smallest piece) and adds a callback to M1c2's "capture context for future AI sessions" beat. The "file got smaller" moment is satisfying on screen; the AGENTS.md update is the *durable* artifact that survives this codebase outliving any one session. Leaves the rest of the plan as a documented backlog — viewers see the *path*, not the *destination*.

### Option B — Extract everything at once
Ask AI to do the full decomposition in one shot: hooks (`useDashboardMetrics`, `useActivityFeed`, `usePlanRevenue`), components (`DashboardFilters`, `RecentSignupsList`), de-duplicated utility imports. Show the before/after diff and the new directory tree.

**Shines because:** the visual impact is huge — 454 lines becomes ~150 lines of pure rendering, with a tidy `src/hooks/` directory next to it. Risk: harder to narrate carefully, and it contradicts the M1 "small reversible steps" thesis. Better fit if you want this clip to feel *big*.

### Option C — Inline-duplication purge
Focus narrowly on the inline duplication: `formatCurrency`, `formatDate`, `getStatusTone`, `calculateGrowth` are all defined inside `DashboardPage.jsx` AND in `utils/`. Ask AI to delete the inline copies, import the canonical ones, and verify behavior.

**Shines because:** very concrete, fast to demo, teaches separation-of-concerns cleanly. Risk: smaller in scope than the outline's "tackle architectural systems design" framing implies.

### Option D — Dead-code surgery
Ask AI to remove every dead code path in `DashboardPage.jsx`: `handleLegacyExport`, `processData2`, `tempFix`, `handleStuff`'s misleading comment, the commented-out dark-mode block, the commented-out `legacyExportBlock`. Then `QuickStats` (unused import in `App.js`). Show how much cleaner the file feels.

**Shines because:** very satisfying diffs. Risk: more "cleanup" than "architecture" — fits Clip 1 or Clip 2 better than Clip 3.

### Option E — Components extraction (no hooks)
Decompose `DashboardPage` into smaller *components* rather than hooks: pull out the date/plan filter row, the metric-card row, the recent-signups list. Keeps state in the page but each component renders one concern.

**Shines because:** more accessible to viewers who don't yet think in custom hooks. Teaches "separation of concerns" without the hooks learning curve. Risk: doesn't tee up the "custom hooks" mental model the outline implies.

## My take
**Option A** is the best fit for the outline and the longest clip in the module (7 min — there's room for the plan beat). If you want the clip to feel more dramatic, **Option B**, but you lose the planning thesis the course has been building. **Option C** and **D** are better as *minor* beats inside A, not as the whole clip.

## Suggested opening prompts

**For Option A, beat 1 (plan):**
> "Analyze `src/pages/DashboardPage.jsx`. List every distinct responsibility this component has. Then propose a decomposition plan: what should be extracted into custom hooks, what should become smaller components, and what can move to existing utilities. Don't change anything yet — just give me the plan."

**For Option A, beat 2 (execute):**
> "Let's execute the first item from the plan: extract the metrics-fetching logic into a `useDashboardMetrics` custom hook in `src/hooks/`. Keep `DashboardPage`'s rendering logic intact. Update imports."

**For Option A, beat 3 (capture):**
> "We just established a new convention — custom hooks live in `src/hooks/`, and page components should be thin renderers with data-fetching pulled into hooks. Update `CLAUDE.md` (or `AGENTS.md`, whichever exists) to record this so future AI sessions follow the same pattern. Keep the addition short — just the rule and a one-line reason."

Voiceover thread for beat 3: *"This is the thing we miss most often. We refactor, we ship, and then six months later a new contributor — or a fresh AI session — reinvents the old pattern because nobody wrote down the new one. The convention isn't real until it's captured."*

## Key files to reference
- [src/pages/DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) — 454 lines, the monolith
- [src/utils/metrics.js](frontend/src/utils/metrics.js), [dates.js](frontend/src/utils/dates.js), [formatters.js](frontend/src/utils/formatters.js) — the canonical utilities that already exist
- `src/hooks/` — does not exist yet, will be created
- `CLAUDE.md` / `AGENTS.md` — the agent-instruction file from M1c2, gets a small append in beat 3

## Expected outcome shape (Option A)
- `src/hooks/useDashboardMetrics.js` — new
- `src/pages/DashboardPage.jsx` — reduced (roughly ~350 lines after one extraction)
- `CLAUDE.md` / `AGENTS.md` — small append capturing the hooks convention
- The rest of the plan documented for future passes

## Watch for
- If `CLAUDE.md` / `AGENTS.md` doesn't exist in the recording branch (e.g., the M1 demo wasn't committed), the beat still works — frame it as *"let's add this to our agent-instruction file"* and create it inline. Don't break the flow chasing M1 state.
