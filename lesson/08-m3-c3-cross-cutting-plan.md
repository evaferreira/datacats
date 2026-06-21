# Demo Brief — Module 3, Clip 3: Planning Cross-Cutting Changes

## What this clip covers
Turning an audit into an **executable decommission plan**. Outline framing: map
dependencies, identify obsolete modules that should be retired instead of migrated, reduce
scope, then generate checklists, milestones, phased rollouts, and rollback plans. The
vehicle is the set of dead and "zombie" endpoints surfaced by the C1 cross-reference —
they live across three route files and two live frontend callers, so retiring them is a
*coordination* problem, not a delete key.

Thesis (locked): *A cross-cutting change is only as safe as its dependency map — find who's
still holding on before you let go.*

## Demo shape (role in the module rhythm)
**Planning-artifact producer — the "turn an audit into a plan" clip.** No code changes
happen on camera; the deliverable is a written plan. This is a deliberately different shape
from its siblings: C1 *identifies* (cross-reference → `ENDPOINT_REGISTRY.md`), C4 *audits
design debt* (→ token proposal), C5 *executes a migration at scale*. C3 is the only
map → decide → sequence → de-risk clip, and the only plan-only clip in M3.

## Continuity
- **Reads:** C1's `ENDPOINT_REGISTRY.md` — specifically the *truly-dead vs. zombie* split.
- **Writes:** `DECOMMISSION_PLAN.md` at the repo root. **Plan only — no code changes.**
- **Does NOT cover:** executing the deletions (defer to a live exercise / later work); the
  three `fetchWithAuth` clients consolidation (reserved for M4 C1); design tokens (C4);
  Bootstrap (C5 / Module 1).

## Honest scope note — "cross-cutting in miniature"
Be straight about this in the framing. Retiring obsolete endpoints spans three route files
+ two callers + a dead util — it is not a 30-file horizontal refactor. So lean into the
part that genuinely *is* cross-cutting: **coordinating the caller changes before the
deletions, and sequencing the phases so nothing 404s mid-flight.** That is the transferable
skill — the same plan shape scales to a real 30-file change. Don't oversell it as a sprawling
rewrite; sell it as *the discipline you'd apply to one*.

## The material — verified against the code
**Truly dead (no frontend caller):**
- `GET  /api/v1/reports/export` ([reports.js:66](backend/routes/reports.js#L66)) — replaced by third-party tool
- `POST /api/v1/reports/schedule` ([reports.js:71](backend/routes/reports.js#L71)) — never finished
- `GET  /api/v1/legacy/export/pdf` ([legacyExport.js:23](backend/routes/legacyExport.js#L23)) — returns 501
- `POST /api/v1/settings/migrate` ([settings.js:92](backend/routes/settings.js#L92)) — one-off 2022 migration

**Zombies (called but obsolete — the coordination problem):**
- `GET  /api/v1/legacy/export/csv` ← [ApiKeyManager.jsx:57](frontend/src/components/settings/ApiKeyManager.jsx#L57) (`handlePreviewExport`); endpoint returns a **hardcoded 2-row CSV**. ApiKeyManager is rendered in [SettingsPage.jsx](frontend/src/pages/SettingsPage.jsx).
- `POST /api/v1/legacy/export/bulk` ← [UserExportButton.jsx:16](frontend/src/components/users/UserExportButton.jsx#L16); endpoint **fabricates a random `jobId` and does nothing**. UserExportButton is rendered in [UsersPage.jsx](frontend/src/pages/UsersPage.jsx).

**Also obsolete, also in scope:**
- `frontend/src/utils/legacyExport.js` — `rowsToCsv` / `downloadCsv` helper, **zero importers** (verified), replaced by the third-party tool in 2022.
- The `legacy/export` router mount at [server.js:41](backend/server.js#L41) and its `require` at [server.js:16](backend/server.js#L16).

The teaching beat: the two zombie *features* are themselves broken (stale fake CSV, no-op
job). So the right call is to **retire the features, not rebuild them** — which is exactly
how a real plan *reduces scope*.

## Candidate demos (pick one)

### Option B — Broad decommission across all C1 findings ✅ **CONFIRMED PATH**
Plan the retirement of *every* obsolete endpoint C1 found, across `reports.js`,
`settings.js`, and `legacyExport.js`, plus the two callers and the dead util. Three beats:

1. **Map (~1.5 min).** Feed C1's findings. Ask the AI to build a dependency map for each
   obsolete endpoint: mount point, what it returns, every caller, and whether removing it
   breaks anything. Classify each as **retire / migrate / keep**.
2. **Decide & cut scope (~1.5 min).** Walk the retire-vs-migrate calls. Everything here is
   *retire* (obsolete since 2022). The zombie features are fake, so we retire those too
   rather than repoint them — that's the scope cut. Name why this is "retire, not migrate."
3. **Sequence (~2 min).** Ask the AI to write `DECOMMISSION_PLAN.md`: phased rollout,
   milestone per phase, a checklist, a verification step, and a rollback strategy.

**Why this wins:** it spans multiple modules and centers the *coordination* lesson (callers
before deletions), which is the closest this subject gets to genuinely cross-cutting without
borrowing M4's fetch-client material.

### Option A — Scoped to the legacy-export module only (fallback)
Same three beats, but limited to the `legacy/export` router + its two callers + the dead
util. Tighter and a hair faster; documented here in case the broad version runs long. Trade:
touches fewer modules, so the "cross-cutting" feel is weaker.

### Option C — Map-only, no written plan (not recommended)
Stop after the dependency map and discuss the phases verbally. Rejected: the outline
explicitly asks for checklists/milestones/rollback *artifacts*, so the plan doc is the point.

## Decision (locked)
**Option B.** The broad scope is what earns the word "cross-cutting" here. If recording runs
long, fall back to Option A by dropping `reports.js` / `settings.js` and planning only the
legacy-export module — the arc survives.

## Closing thesis (locked)
> *"A cross-cutting change is only as safe as its dependency map — find who's still holding
> on before you let go."*

The two zombies are the proof: a grep said "dead," the code said "still wired."

## The plan the AI should produce (shape of `DECOMMISSION_PLAN.md`)
- **Inventory + classification** — each obsolete endpoint marked retire / migrate / keep (all retire here).
- **Dependency map** — per candidate: caller(s), what breaks on removal, blast radius.
- **Phase 0 — neutralize the callers first.** Remove (or repoint) ApiKeyManager's preview and UserExportButton so the UI no longer depends on the legacy routes. *This phase ships before any route is deleted.*
- **Phase 1 — delete the 4 truly-dead routes.** Safe; no callers.
- **Phase 2 — remove the `legacy/export` module**, its `server.js` mount + require, and the dead `utils/legacyExport.js`, after confirming zero traffic.
- **Verification** — the [logger middleware](backend/middleware/logger.js) shows zero hits to the routes before deletion; the catch-all 404 at [server.js:43](backend/server.js#L43) covers anything external that still calls in.
- **Milestones + checklist + rollback** — one milestone per phase; rollback = granular per-phase commits + `git revert`.

## Suggested prompts (Option B — three beats)

**Beat 1 — map the dependencies:**
> "Here are the obsolete API endpoints we identified earlier (paste the list from
> `ENDPOINT_REGISTRY.md`). Before I remove anything, I need a dependency map. For each one,
> tell me: where it's mounted, what it actually returns, every place in the frontend or
> backend that calls it, and what would break if I deleted it. Flag anything that looks
> uncalled but is actually still wired to a component."

**Beat 2 — decide retire vs. migrate, cut scope:**
> "For each endpoint, classify it: should we *retire* it (remove it entirely) or *migrate*
> its callers to a supported endpoint? These were all replaced by an external export tool in
> 2022. For the two that are still called from the UI, look at what the endpoints return and
> tell me whether those features are worth keeping or should be retired with the endpoints.
> I want to cut scope, not carry dead weight forward."

**Beat 3 — produce the phased plan:**
> "Write a `DECOMMISSION_PLAN.md`. I want phased, reversible steps: handle the components
> that still call these routes *before* any route is deleted, then remove the truly-dead
> routes, then remove the legacy module and its registration last. For each phase give me a
> milestone, a checklist, how to verify it's safe to proceed, and a rollback step. Don't
> change any code yet — just the plan."

Voiceover thread for Beat 3: *"Notice the order — the callers come down first, the routes
second, the module last. That sequence is the whole game. Reverse it and the UI 404s in
production before the cleanup finishes."*

## What to ignore for this clip
- Executing any deletion (plan only)
- The three `fetchWithAuth` clients (M4 C1 owns that)
- Design tokens (C4), Bootstrap (C5 / Module 1)

## Key files to reference
- `backend/ENDPOINT_REGISTRY.md` — C1's output (recreate or paste if not on the working branch)
- [backend/server.js](backend/server.js) — mount points + 404 handler
- [backend/routes/legacyExport.js](backend/routes/legacyExport.js), [reports.js](backend/routes/reports.js), [settings.js](backend/routes/settings.js)
- [frontend/src/components/settings/ApiKeyManager.jsx](frontend/src/components/settings/ApiKeyManager.jsx), [frontend/src/components/users/UserExportButton.jsx](frontend/src/components/users/UserExportButton.jsx) — the two callers
- [frontend/src/utils/legacyExport.js](frontend/src/utils/legacyExport.js) — dead helper, in scope
- [backend/middleware/logger.js](backend/middleware/logger.js) — the verification signal (zero hits before delete)

## Expected outcome shape
- `DECOMMISSION_PLAN.md` — new file at the repo root; phased plan, milestones, checklist, rollback. No code changes.

## Slides
Slides not built yet — Eva will provide them; this brief drives the demo, the slide script comes from the slides.

## Watch for
- **The AI may want to start deleting.** Redirect every time: this clip produces a plan, not a diff.
- **The AI may mark the zombies "active"** just because they have callers. Push it to read what the endpoints *return* (hardcoded CSV, fabricated job) so it correctly lands on retire-not-migrate.
- **`ENDPOINT_REGISTRY.md` may not exist on the recording branch** (it's added on the demo branch). Recreate it or paste C1's findings inline — don't stall the flow.
- **Don't let it pull in the `fetchWithAuth` mess.** UserExportButton uses a raw `fetch`; the AI may notice the broader fetch-client inconsistency. Acknowledge and defer — that's a separate change.
