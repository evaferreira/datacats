# Demo Brief — Module 2, Clip 1: Auditing Code Quality

## What this clip covers
Using AI to produce a comprehensive **code-quality audit** that becomes the
backbone of the next two clips. We deliberately leave performance and
dependencies *out* — those each deserve their own audit, with their own lens,
later in the module.

The clip's thesis: *a great audit is the most leveraged thing AI does for you
in a legacy codebase. But scope your audits by lens — code quality,
performance, and dependencies are three different jobs.*

## Demo shape (role in the module rhythm)
**Markdown-artifact producer — the only persistent audit doc in M2.** Clips 4
and 5 will each open with their *own* focused mini-audits (in chat, not in
files), but this is the only audit that produces a long-lived artifact.

## Continuity
- **Reads:** `CLAUDE.md` from Module 1 (design-system context).
- **Writes:** `MIGRATION_AUDIT.md` at the repo root.
- **Feeds:** Clip 2 (class components section) and Clip 3 (architectural debt section).
- **Does NOT cover:** performance bugs (Clip 4 audits its own lens) or dependency upgrades (Clip 5 audits its own lens).

## What makes this a *good* audit

A weak audit is a flat list: "here are the class components." A good audit
has structure, opinions, and predictive power. The audit we want surfaces
**two main dimensions plus a bonus surface** — and each section maps directly
to a future clip:

| Section in `MIGRATION_AUDIT.md`                                                    | Clip that will execute |
| ---------------------------------------------------------------------------------- | ---------------------- |
| 1. Class components, ranked by migration complexity                                 | Clip 2                 |
| 2. Architectural debt (oversized files, mixed responsibilities, inline duplicates) | Clip 3                 |
| 3. Dead code / curiosities (bonus)                                                  | (mention, defer)       |

Voiceover thread to land: *"Notice the audit isn't trying to find everything
wrong with this codebase — it's scoped to one lens. We'll do a performance
audit later, and a dependency audit later. Different lenses need different
prompts."*

## What the AI should surface in each section

### Section 1 — Class components (feeds Clip 2)
- All 13 class components, grouped by migration complexity (simple / medium / complex)
- Reasoning for each tier (small state vs. multiple effects vs. forms + derived state)
- `QuickStats` flagged as **imported in [App.js:14](frontend/src/App.js#L14) but never rendered** — only one that's outright dead
- **Bugs the AI notices in passing** (this is the secret-sauce moment — see "Watch for" below)

### Section 2 — Architectural debt (feeds Clip 3)
- [`DashboardPage.jsx`](frontend/src/pages/DashboardPage.jsx) is 454 lines with mixed responsibilities (data fetching, derived metrics, UI state, rendering)
- Inline duplicate utilities inside `DashboardPage`: `formatCurrency`, `formatDate`, `getStatusTone`, `calculateGrowth` are all defined in the page *and* in [`src/utils/`](frontend/src/utils/)
- Two `fetchWithAuth` implementations: [`utils/api.js`](frontend/src/utils/api.js) vs. [`utils/apiHelpers.js`](frontend/src/utils/apiHelpers.js), used inconsistently across components
- Three date utility files with overlapping APIs: [`dates.js`](frontend/src/utils/dates.js), [`dateUtils.js`](frontend/src/utils/dateUtils.js), and inline in pages
- `metrics.js` has both `calculateMRR` and `calculateMRRNew` side-by-side
- Other oversized files: [`TeamSettings.jsx`](frontend/src/components/settings/TeamSettings.jsx) (229 lines), [`ApiKeyManager.jsx`](frontend/src/components/settings/ApiKeyManager.jsx) (154 lines)

### Section 3 — Dead code / curiosities (bonus surface)
- `QuickStats` imported but never rendered ([App.js:14](frontend/src/App.js#L14))
- `handleLegacyExport`, `processData2`, `tempFix` in `DashboardPage` — all defined, all unused
- Commented-out dark-mode block in `DashboardPage` (lines 154–176)
- Commented-out `legacyExportBlock` and `legacyHeader` (lines 178–192)
- `legacyExport.js` backend route — all three endpoints marked "DEAD" in their own comments

## Candidate demos (pick one)

### Option A — Two-pass scoped audit (recommended)
Single arc:
1. Prompt the AI to audit the codebase across **two dimensions** — class components and architectural debt — and produce `MIGRATION_AUDIT.md` with one section per dimension plus a bonus "dead code" section.
2. Walk through the resulting document on camera. Land the voiceover: *"Sections 1 and 2 are the work for the next two clips. We'll do separate audits for performance and dependencies later, because those need different prompts."*

**Shines because:** focused, sets up exactly Clips 2 and 3, leaves room for Clips 4 and 5 to have their own audit moments. The "scoping by lens" lesson is implicit in the prompt itself.

### Option B — Discovery-first (M1c2 echo)
Beat 1: "What kind of code-quality debt does this codebase have? Don't fix anything — just describe what you see." AI surfaces the categories itself.
Beat 2: "Great — write `MIGRATION_AUDIT.md` with a section for each category you found, prioritized."

**Shines because:** mirrors the M1c2 "navigator → translator → explainer" arc. The AI *discovers* the structure rather than being handed it. Risk: less control over what comes out.

### Option C — Single comprehensive section (narrowest)
Just audit class components — ignore architectural debt for this clip, hand that off to Clip 3 to discover on its own. This is the original Clip 1 scope.

**Shines because:** narrowest, most focused. Risk: leaves Clip 3 without setup material, makes Clip 3 do double work.

## My take
**Option A** is the strongest fit. The two-dimension scope gives Clips 2 and
3 both a launching pad without overflowing the audit. The "we'll audit
performance and deps separately" beat is a teaching moment in itself — it
gives viewers a *meta* lesson about how to scope audits, not just how to ask
for one.

## Suggested opening AI prompt (Option A)
> "I want a code-quality audit of this codebase. Cover two main dimensions plus a bonus:
>
> 1. **Class components** — list each one, rank by migration complexity (simple/medium/complex), explain what puts each in its tier, and flag any that look like dead code.
> 2. **Architectural debt** — oversized files, mixed responsibilities, inline duplicate logic, files that overlap in purpose, inconsistent imports of the same utility.
> 3. **Dead code (bonus)** — imports that aren't rendered, functions that are defined but never called, commented-out blocks that look stale.
>
> Write it up as `MIGRATION_AUDIT.md` at the repo root, one section per dimension. For each finding, include the file path (with line numbers where useful) and a one-line explanation. Prioritize within each section.
>
> Don't include performance or dependency analysis — those need different lenses and we'll do them separately."

## What to ignore for this clip
- Actually fixing anything — every fix is a later clip
- Performance anti-patterns (Clip 4 has its own audit)
- Dependencies / `package.json` (Clip 5 has its own audit)
- Bootstrap migration (owned by Module 1 / Module 3)

## Watch for
- **Bugs the AI volunteers while doing a structural audit.** When AI scans class components for migration complexity, it tends to spot real bugs sitting in them — the `UserFilters` render-loop, the `RevenueChart` `>=` comparison, the `MetricsCard` `JSON.stringify` compare. These will reappear *officially* in Clip 4's performance audit, but the AI catching them here is great voiceover material: *"We asked for a structural audit and got bug reports for free. This is why AI audits beat checklist audits."* If the audit doc captures these as side findings under each component, that's perfect.
- The AI may want to *fix* things while it audits. Redirect: capture in the doc, don't fix yet. The discipline beat is part of the lesson.
- If a section comes back thin, ask a targeted follow-up for that section only — don't re-run the whole prompt.
