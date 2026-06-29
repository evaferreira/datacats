# Demo Brief — Module 3, Clip 5: Example-Driven, Repetitive Migrations

## What this clip covers
Scaling a migration across many files **safely** by writing a *migration contract*:
two reviewed examples plus explicit rules, DO/DON'T, and constraints that turn
"AI, go migrate everything" into a repeatable, reviewable transformation. The vehicle
is the class-component → functional-with-hooks migration — a mechanical, well-understood
change with **eight** components in the scale pass (one render-phase outlier scoped out).

Thesis (locked): *Don't scale before you standardize — define the transformation, don't
ask the AI to improvise.* Corollary to land out loud: **AI accelerates bad patterns just
as fast as good ones**, so consistency has to be designed in, not hoped for.

## Demo shape (role in the module rhythm)
**Industrialize-a-validated-change clip — the "contract + fleet + capture" shape.** The
star artifact is a written **migration contract**, and the closer captures it as a
**reusable skill**. Distinct from its siblings: C1 *identifies* (→ registry), C3 *plans a
decommission* (→ plan doc), C4 *audits design debt* (→ token proposal). This is the only
clip that takes a proven, small change and makes it repeatable at scale.

## The migration contract (from the clip's own framing)
- **Inputs:** completed example #1, completed example #2, migration rules, constraints.
- **Output:** repeatable, consistent execution across the remaining files.
- **DO:** convert class → function with hooks · preserve component behavior · preserve tests · keep render output identical.
- **DON'T:** change behavior or fix bugs (preserve existing behavior exactly — even known bugs; fixing them is a separate, tracked change) · redesign layouts · rename unrelated components · introduce new abstractions (no extracted hooks, no memoization).
- **Key idea:** we are *defining the transformation*, not asking the AI to improvise.

## Continuity
- **Reads:** the two already-migrated reference components, plus the existing tests as the behavioral guard.
- **Writes:** `MIGRATION_CONTRACT.md` at the repo root · the eight converted components · a reusable skill at `.claude/skills/class-to-function-migration/SKILL.md`.
- **Does NOT cover:** Bootstrap / design-system component swaps (that thread lives elsewhere); extracting data-fetching into `src/hooks/` (a separate refactor — this pass is a 1:1 conversion); fixing the behaviors it deliberately preserves.

## The material — verified against the code

**Two completed, reviewed examples (assume both already migrated on the recording branch):**
- [ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) — already functional. Demonstrates the `setInterval` → `useEffect` **cleanup** pattern (`useRef` timer + cleanup return).
- [MetricsCard.jsx](frontend/src/components/dashboard/MetricsCard.jsx) — migrated ahead of recording (prompt is in the chat log). Demonstrates the dominant pattern *and* the one subtle case: constructor state → `useState`, `componentDidMount` fetch → mount `useEffect`, and a `componentDidUpdate` **object deep-compare** → a ref-guarded effect that preserves the `JSON.stringify(filters)` refetch timing (not a naive `[filters]`, which would refetch every render).

**The scale set — eight clean class components:**
- [MetricsSummary.jsx](frontend/src/components/dashboard/MetricsSummary.jsx) — pre-cleaned to derive `total`/`avg` in render (state/lifecycle removed), so it's now a trivial conversion.
- [ChurnCohortChart.jsx](frontend/src/components/reports/ChurnCohortChart.jsx) — fetch + a **scalar** `componentDidUpdate` (`refreshKey`) → `useEffect(fetch, [refreshKey])`. The clean dep case — a deliberate contrast to MetricsCard's object deep-compare (the *real* lesson: match the dependency to the value type).
- [ReportFilters.jsx](frontend/src/components/reports/ReportFilters.jsx) — controlled form; notifies the parent on **click**, not in render. Clean.
- [ReportTable.jsx](frontend/src/components/reports/ReportTable.jsx) + [UserTable.jsx](frontend/src/components/users/UserTable.jsx) — near-duplicate stateful tables (sort/paginate/select). Migrating both identically is the clearest "the contract enforces consistency on copy-paste twins" beat. **UserTable is test-guarded** ([UserTable.test.jsx](frontend/src/components/users/UserTable.test.jsx)).
- [ApiKeyManager.jsx](frontend/src/components/settings/ApiKeyManager.jsx) — fetch + several handlers + functional `setState`; a substantive real component.
- [TeamSettings.jsx](frontend/src/components/settings/TeamSettings.jsx) — large (nine state fields + a modal). Clean but heavy — the likely time sink; drop first if short.
- [UserExportButton.jsx](frontend/src/components/users/UserExportButton.jsx) — small state + one handler.

**Pre-handled before recording (so the scale pass has no landmines):**
- **MetricsSummary** — its `JSON.stringify(values)` deep-compare (a duplicate of MetricsCard's, plus derived-state-in-state) was removed by deriving in render. Done.
- **QuickStats** — was dead (imported at `App.js` but never rendered). Deleted, import removed. Dead code is removed, not migrated.
- **UserFilters** — calls `onFiltersChange` *inside* `render()`. A faithful 1:1 migration can't reproduce that in a functional component (updating a parent during render throws in React 18), so migrating it would *surface* the latent bug. **Scoped out of this pass** — it's a regression-risks example, not a clean-migration one. It stays a class.

**The test guard:** [UserTable.test.jsx](frontend/src/components/users/UserTable.test.jsx) and [UserRow.test.jsx](frontend/src/components/users/UserRow.test.jsx) must still pass after the fleet migration — that's how "preserve tests" earns its place on camera.

## Candidate demos (pick one)

### Option A — Derive contract → scale the fleet → verify → capture as a skill ✅ **CONFIRMED PATH**
Four beats:
1. **Derive the contract (~1.5 min).** Point the AI at the two reviewed examples and have it write `MIGRATION_CONTRACT.md` — the rules, DO/DON'T, and constraints inferred from how those two were done.
2. **Scale (~2 min).** Hand the AI the contract + the two examples and migrate the eight class components in one pass. The win: uniform output across the fleet.
3. **Verify (~1 min).** Run the existing tests; audit that every migration follows the same shape — no extracted hooks, no renamed handlers, no "fixed" behavior. Spot-check that ChurnCohortChart's effect keys on `refreshKey` (scalar) and that ReportTable and UserTable came out identical.
4. **Capture (~30s).** Save the contract as a reusable skill at `.claude/skills/class-to-function-migration/SKILL.md` — next batch is one command.

**Why it wins:** the contract is the transferable artifact, the fleet pass is the payoff, and the skill makes it a habit rather than a one-off.

### Option B — Contrast-first (the warning, shown live)
Open by asking the AI to "just migrate these" on one or two files with *no* contract, and show the variance (different state shapes, a "helpfully" fixed bug). Then introduce the contract and re-run. Strong for the "AI accelerates bad patterns" beat; costs time. Can be folded into Option A as a 20-second aside instead of a full beat.

### Option C — Single-file deep migration (rejected)
Migrate one complex component carefully. Rejected: that's the *craft* lesson; this clip is about *scale and consistency*.

## Decision (locked)
**Option A**, optionally borrowing Option B's contrast as a short aside in Beat 2. If time runs short, scale a representative subset (one per directory) rather than all eight, and say so out loud — don't imply the whole fleet was migrated if it wasn't. TeamSettings is the first to cut.

## Closing thesis (locked)
> *"Two reviewed examples and a contract turn a risky fleet migration into a repeatable
> one. We define the transformation; we don't ask the AI to improvise — because it will
> scale a bad pattern just as fast as a good one."*

## Suggested prompts (Option A — four beats)

**Beat 1 — derive the contract + triage by complexity:**
> "These two components — `ActivityFeed.jsx` and `MetricsCard.jsx` — were migrated from
> class components to functional components with hooks, and reviewed. First, study both and
> write a `MIGRATION_CONTRACT.md` precise enough that anyone following it lands the same
> result — the mapping rules, and the rule to keep it a faithful 1:1 conversion that
> preserves behavior, accessibility, and tests, like these two did. Then look at the
> remaining class components and group them by migration complexity — simple, medium, or
> complex — and call out any where preserving the exact behavior in a functional component
> would be the hard part."

*Instructor note (not spoken): the complexity triage should land `UserFilters.jsx` in
"complex" — it calls `onFiltersChange` during `render()`, which can't move to a functional
component without changing behavior. Scope the scale pass to the simple + medium set and
leave the complex one for a separate, careful look — so you never name UserFilters on
camera. If the AI under-rates it, you still know it's the one to hold back.*

**Beat 2 — scale the fleet:**
> "Now migrate the **simple and medium** ones you just categorized, applying the contract
> consistently. Leave the complex one for a separate, careful pass. Preserve each
> component's behavior; if you spot a bug, note it but don't fix it."

*Instructor note (not spoken): "simple + medium" should come out to the eight —
`MetricsSummary`, `ChurnCohortChart`, `ReportFilters`, `ReportTable`, `ApiKeyManager`,
`TeamSettings`, `UserExportButton`, `UserTable` — with `UserFilters` held back as the
"complex" one. Glance at the triage on screen before scaling; if the AI grouped them
differently, steer it back to those eight before it runs.*

**Beat 3 — verify consistency:**
> "Run the test suite. Then audit your own migrations against the contract: confirm every
> file follows the same shape, no custom hooks were extracted, nothing was renamed, and no
> behavior changed. Call out anything that diverged or any behavior you had to preserve
> that looked like a bug."

**Beat 4 — capture as a skill:**
> "Turn this into something reusable. Create `.claude/skills/class-to-function-migration/SKILL.md`
> from the contract so the next batch of class components is one command. Keep it tight —
> the rules, the DO/DON'T, and the constraints."

Voiceover for Beat 4: *"The contract was the asset, not the migration. Next time this is one command — the contract becomes a skill, the skill becomes a habit."*

## What to ignore for this clip
- Bootstrap / design-system component swaps
- Extracting data-fetching into `src/hooks/` (separate refactor — this is a 1:1 conversion)
- `UserFilters` (the render-phase notify) — scoped out; it belongs to the regression-risks discussion
- The dead-endpoint calls inside `ApiKeyManager` / `UserExportButton` (a different clip owns those — migrate only the class shape, leave the calls untouched)

## Key files to reference
- `MIGRATION_CONTRACT.md` — written in Beat 1 (does not exist yet)
- [ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx), [MetricsCard.jsx](frontend/src/components/dashboard/MetricsCard.jsx) — the two reviewed examples
- The eight scale-set components listed above
- [UserTable.test.jsx](frontend/src/components/users/UserTable.test.jsx), [UserRow.test.jsx](frontend/src/components/users/UserRow.test.jsx) — the behavioral guard
- [frontend/CLAUDE.md](frontend/CLAUDE.md) — frontend conventions; the old hook-*extraction* mandate was removed, so nothing in it conflicts with a 1:1 migration

## Expected outcome shape
- `MIGRATION_CONTRACT.md` — new file at repo root
- Eight class components converted to functional, all following the same shape
- Existing tests still passing
- `.claude/skills/class-to-function-migration/SKILL.md` — new reusable skill

## Recording-branch setup
The previous plan for this clip scaffolded an `examples/` folder for a Bootstrap migration —
that's dropped; no artificial example files. The branch needs:
- **Two components already migrated to functional** as the reviewed examples: `ActivityFeed` (already done) and `MetricsCard` (use the prompt in the chat log).
- The eight scale-set components left as classes.
- **Prep already applied to this working tree:** `MetricsSummary` cleaned (derives in render), `QuickStats` deleted (file + `App.js` import), `UserFilters` left as a class and scoped out.

## Slides
Slides not built yet — Eva will provide them; this brief drives the demo, the slide script
comes from the slides.

## Watch for
- **The AI wanting to "fix" things.** During the scale pass it may try to "improve" a
  component. Redirect every time — the contract says preserve behavior; fixes are a
  separate, tracked change.
- **The deep-compare lesson lives in the reference.** `MetricsCard` (object → ref-guarded
  effect) and `ChurnCohortChart` (scalar → plain `[refreshKey]`) together teach "match the
  dependency to the value type." The scale set was pre-cleaned of *other* deep-compares, so
  the fleet pass shouldn't hit that trap — but verify ChurnCohortChart didn't get an
  accidental deep-compare it doesn't need.
- **Hook extraction.** The AI may still volunteer to pull fetching into `src/hooks/` out of
  habit. The contract keeps this pass 1:1 — extraction is a separate, later change.
- **UserFilters must stay out** — it's the one that breaks a 1:1 migration (it calls
  `onFiltersChange` during `render()`). It's held back via the complexity triage in Beat 1
  (it should land in "complex"), so you never name it on camera. The only risk is the AI
  under-rating it into simple/medium — glance at the triage on screen before scaling and
  steer it back if needed. Nice optional beat: the AI itself flags it as the hard one —
  which is exactly the "preserving behavior is the real work" point.
- **Time.** Eight migrations may run long for ~5 min — be ready to scale a representative
  subset (drop TeamSettings first) and say so, rather than rushing.
