# Demo Brief — Module 2, Clip 2: Improving Maintainability

## What this clip covers
Take the audit from Clip 1 and start *doing* the work. Outline framing is
"readability, naming, DRY." The strongest concrete vehicle in this codebase
is the class→function migration, but there are other valid directions.

## Demo shape (role in the module rhythm)
**Single-file code transformation.** AI rewrites one file end-to-end and
explains each change. Distinct from Clip 3 (which is multi-file structural)
and Clip 4 (which is a small, surgical fix). The dramatic beat: AI catches
a bug *during* the migration.

## Continuity
- **Reads:** `MIGRATION_AUDIT.md` from Clip 1.
- **Updates:** that same document to mark migrated components as done. No new
  documents in this clip.

## Candidate demos (pick one or combine two)

### Option A — Migrate one class component, narrated slowly (`MetricsCard`)
The canonical class→function migration. AI walks through each mapping: `constructor`/`this.state` → `useState`, `componentDidMount` → `useEffect([])`, `componentDidUpdate` → `useEffect([deps])`, `this.formatValue` → local function. Behavior is identical.

**Shines because:** it's the *teaching* demo. Anyone who's never done this migration leaves the clip knowing how. Pairs well with the "small, reversible steps" thread from M1c4.

### Option B — Migrate one component and catch a bug (`UserFilters`)
Migrate the controlled-form class component. AI catches `onFiltersChange` being called inside `render()` — a re-render loop that's been there for years. AI proposes either moving it to a `useEffect([filters])` or calling it from the change handler.

**Shines because:** it's the dramatic moment. "AI didn't just translate — it found a real bug we'd been shipping." Strong voiceover line about why AI-assisted migration is more than syntax substitution.

### Option C — Two migrations back-to-back (A then B, condensed)
Open with `MetricsCard` to set the pattern, then run `UserFilters` to land the bug catch. The first migration trains the eye; the second pays it off.

**Shines because:** best narrative shape if you have demo time for two. Slight risk: feels rushed if total demo budget is under ~3 minutes.

### Option D — DRY-up demo (no class migration at all)
Pivot the clip toward de-duplication: ask AI to consolidate the three `formatDate` implementations (`utils/dates.js`, `utils/dateUtils.js`, inline in `DashboardPage`), pick a canonical version, update all call sites. Same idea for the two `fetchWithAuth` files.

**Shines because:** matches the outline's "DRY coding pattern" wording most literally. Risk: it competes with Clip 3 (decomposition), and the visual outcome ("we deleted a file") is less satisfying than a class becoming a function.

### Option E — Renaming + readability demo (`DashboardPage` cleanup)
Have AI rename the cryptic helpers in `DashboardPage.jsx` (`processData2`, `tempFix`, `handleStuff`) and explain why each name is better. Also remove the dead `handleLegacyExport` and the commented-out dark-mode block.

**Shines because:** matches "renaming, restructuring, enhancing documentation" from the module objectives. Very visual on screen — diffs look great. Risk: lightest-weight of the options; might feel like filler in a 5-minute clip.

## My take
**Option C** is the strongest as a single clip — it teaches the pattern *and* lands the bug catch. If demo budget is tight, **Option B** alone is acceptable but you lose the teaching frame. Avoid D in this clip; save de-duplication for the architectural arc in Clip 3 where it has more room.

## Suggested opening prompts

**For Option A/C, opening migration:**
> "Using `MIGRATION_AUDIT.md` as our plan, migrate `src/components/dashboard/MetricsCard.jsx` from a class component to functional with hooks. Keep behavior identical. Explain each change as you go, and flag anything in the original that looks wrong."

**For Option B/C, the bug-catch migration:**
> "Now migrate `src/components/users/UserFilters.jsx`. Same approach — flag anything that looks like a bug. Propose a fix, but explain the tradeoffs first; don't just apply it."

## Key files to reference
- [src/components/dashboard/MetricsCard.jsx](frontend/src/components/dashboard/MetricsCard.jsx)
- [src/components/users/UserFilters.jsx](frontend/src/components/users/UserFilters.jsx) — render-loop bug at [line 28-31](frontend/src/components/users/UserFilters.jsx#L28-L31)
- [src/components/dashboard/ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) — setInterval cleanup, good fallback if A/B feel small

## Watch for
- AI may want to add `React.memo` during the migration — defer to Clip 4.
- AI's "fix" for `UserFilters` may differ between runs (useEffect vs. event-handler). Pre-decide which you'll accept on camera.
