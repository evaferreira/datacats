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

### Option A+ — Clean, extract, capture ✅ **CONFIRMED PATH**
Three beats — a mix of original Option A (extract + capture) with a slice of Option D (dead-code cleanup) as the opener. The cleanup acts as *prep*: once the noise is gone, `DashboardPage`'s real responsibilities become visible, so the hook extraction feels like the obvious next move.

1. **Clean (~1 min).** Remove dead code the audit flagged: `processData2`, `tempFix`, the commented-out dark-mode block, the commented-out `legacyExportBlock`. `DashboardPage` drops from 454 → ~400 lines.
2. **Extract (~2 min).** AI lists `DashboardPage`'s remaining responsibilities (data fetching, derived metrics, filters, layout), proposes a decomposition plan, then executes the first extraction: pull metrics-fetching into a `useDashboardMetrics` hook in a new `src/hooks/` directory. File drops to ~350 lines.
3. **Capture (~30s).** Update `CLAUDE.md` / `AGENTS.md` with the new convention: hooks live in `src/hooks/`, pages stay thin, data-fetching belongs in hooks.

**Why this mix wins:** the cleanup beat is a low-friction warmup that produces a visual win and threads back to Clip 1's audit (the bonus "dead code" section finally gets cashed in). The extract beat is the architectural move. The capture beat is the durable artifact that outlives the session. Together they teach *cleanup → extract → document* as a repeatable pattern, not a one-time stunt.

### Option A — Plan, extract one hook, capture the convention (original)
Same three beats as A+ but without the dead-code cleanup opener. Documented here as the original recommendation in case the cleanup beat ever needs to be cut for time.

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

## Decision (locked)
**Option A+** is the confirmed demo path. The cleanup beat is small enough to fit the clip's 7-minute budget and pedagogically strong enough to justify the addition — it threads back to Clip 1's audit AND teaches the "clean before you restructure" principle that slide 3 names explicitly.

## Closing thesis (locked)
> *"You're not just rewriting code — you're writing instructions for the next contributor."*

This lands on slide 7 (post-demo). The "convention isn't real until it's captured" lesson sits on slide 6.

## Suggested prompts (Option A+)

**Beat 1 (clean):**
> "The audit we did in Clip 1 flagged dead code in `DashboardPage.jsx` — `processData2`, `tempFix`, the commented-out dark-mode block, the commented-out `legacyExportBlock`, and the misleading comment on `handleStuff`. Remove all of them. Don't touch any working code yet — just clear the noise."

**Beat 2 (extract):**
> "Now that the file is cleaner, list the remaining responsibilities `DashboardPage` has — data fetching, derived metrics, filter state, layout. Then propose a decomposition: what should become a custom hook, what could move to existing utilities. After that, execute the first item: extract the metrics-fetching into a `useDashboardMetrics` custom hook in a new `src/hooks/` directory."

**Beat 3 (capture):**
> "We just established a new convention — custom hooks live in `src/hooks/`, and page components stay thin with data-fetching pulled into hooks. Update `CLAUDE.md` (or `AGENTS.md`, whichever exists) to record this so future AI sessions follow the same pattern. Keep the addition short — the rule and a one-line reason."

Voiceover thread for beat 3: *"This is the thing teams miss most often. We refactor, we ship, we move on — and then six months later someone reinvents the old pattern because nobody wrote down the new one. The convention isn't real until it's captured."*

## Key files to reference
- [src/pages/DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx) — 454 lines, the monolith
- [src/utils/metrics.js](frontend/src/utils/metrics.js), [dates.js](frontend/src/utils/dates.js), [formatters.js](frontend/src/utils/formatters.js) — the canonical utilities that already exist
- `src/hooks/` — does not exist yet, will be created
- `CLAUDE.md` / `AGENTS.md` — the agent-instruction file from M1c2, gets a small append in beat 3

## Expected outcome shape (Option A+)
- `src/pages/DashboardPage.jsx` — reduced from 454 → ~400 lines (cleanup) → ~350 lines (extraction)
- `src/hooks/useDashboardMetrics.js` — new file in a new directory
- `CLAUDE.md` / `AGENTS.md` — small append capturing the hooks convention
- The rest of the decomposition plan documented in the conversation for future passes

## Slides
See [m2-c3-slides.md](module2/m2-c3-slides.md) for the 6-slide outline that wraps this demo.

## Watch for
- If `CLAUDE.md` / `AGENTS.md` doesn't exist in the recording branch (e.g., the M1 demo wasn't committed), beat 3 still works — frame it as *"let's add this to our agent-instruction file"* and create it inline. Don't break the flow chasing M1 state.
- During beat 1, the AI may want to also remove `QuickStats` (the unused import in `App.js:14`). That's fine if it stays quick — but if it spirals into a discussion, defer and stay scoped to `DashboardPage.jsx`.
- During beat 2, AI may propose extracting multiple hooks at once (`useDashboardMetrics`, `useActivityFeed`, `usePlanRevenue`). Pre-decide on camera: we extract ONE, document the rest in the conversation, and move on. The "small steps" thesis depends on this.
