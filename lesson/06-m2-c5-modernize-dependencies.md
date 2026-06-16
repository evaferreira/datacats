# Demo Brief — Module 2, Clip 5: Modernizing Frameworks and Dependencies

## What this clip covers
AI as a dependency-modernization helper. Outline framing: framework upgrades,
library upgrades, dependency updates, CVEs. The codebase has plenty of grist:
React 17, Router v5, Bootstrap 4, `moment` (deprecated).

## Demo shape (role in the module rhythm)
**Focused dependency mini-audit + backend mechanical migration + double capture.**
This is the only clip in M2 that touches backend code. The audit itself lives
**in chat** — no written audit document — because Clip 1 already owns the
only persistent audit artifact in M2. But the clip ends with **two acts of
capture**: a *rule* in `CLAUDE.md` (no more `moment`), and the audit *itself*
saved as a reusable Claude Code skill so next quarter's audit is one command
away. The shape is *scoped audit → mechanical migration → capture the lesson →
capture the process*.

## Continuity
- **Reads:** `CLAUDE.md` from Module 1 (project context). Does *not* read
  `MIGRATION_AUDIT.md` — Clip 1's audit was scoped to code quality, not deps.
- **Writes:** code changes in `backend/routes/settings.js`; small append to
  `CLAUDE.md` / `AGENTS.md`; a new file at `.claude/skills/dependency-audit/SKILL.md`.

## What's in `package.json` right now

**Frontend** ([frontend/package.json](frontend/package.json)):
- `react` 17.0.2 — one major behind (18 is current LTS-ish, 19 latest)
- `react-router-dom` 5.3.4 — v6 has been out for years, v7 is current
- `bootstrap` 4.6.2 — v5 dropped jQuery
- `recharts` 2.1.16 — current major, but very old patch
- `react-scripts` 5.0.1 — CRA, which is unmaintained as of 2023

**Backend** ([backend/package.json](backend/package.json)):
- `moment` 2.29.4 — **officially in maintenance mode** since 2020. Recommended replacements: `date-fns`, `dayjs`, or native `Intl`.
- `express` 4.21.2 — v5 is out, breaking changes
- `dotenv`, `cors` — fine, recent

## Candidate demos (pick one)

### Option A — Audit, migrate, capture, repeat ✅ **CONFIRMED PATH**
Four beats, mirroring slide 3's four-step framing:

1. **Audit (~45s).** Eva asks AI for a dependency audit through the deps lens. AI scans both `package.json` files; lists deprecated/risky packages with `moment` flagged as priority.
2. **Migrate (~1.5 min).** Migrate [`backend/routes/settings.js`](backend/routes/settings.js) from `moment` to `dayjs`. Output strings byte-identical.
3. **Capture the rule (~30s).** AI updates `CLAUDE.md` / `AGENTS.md` with the new convention: no more `moment`; prefer `dayjs`. Callback to Clip 3's convention-capture beat.
4. **Capture the skill (~30s).** AI creates `.claude/skills/dependency-audit/SKILL.md` — a reusable artifact that captures today's audit prompt and heuristic. Next quarter's audit becomes one command.

**Why this version wins:** beats 3 and 4 stack two levels of capture. Beat 3 captures the *specific lesson* (don't use `moment` here). Beat 4 captures the *meta-process* (here's how to audit deps next time). Closing the module on a sustainable-practice artifact lands the M2 thesis ("five techniques, one habit") with real weight — the last action on screen is *creating the mechanism for the practice to continue*.

### Option B — React Router v5 → v6 plan (no execution)
Audit + plan only. AI writes a `ROUTER_V6_MIGRATION.md` that lists every Router v5 API in use, the v6 equivalent, and the breaking changes (no more `Switch`, `useHistory` → `useNavigate`, `render` prop changes, etc.). Outputs a phased migration plan but doesn't change code.

**Shines because:** the "AI as research assistant for an upgrade I'm afraid of" use case. Most teams *delay* router upgrades because they're scared of breaks — AI removes the scariness. Plan-only is honest about a 5-minute budget.

### Option C — ~~Full `DEPENDENCY_AUDIT.md`~~ ❌ Dropped
Originally I considered a standalone dependency audit document, but the M2 design has Clip 1 produce the single audit doc for the whole module. Dependencies live as a section in that doc — Clip 5 reads it rather than writing its own.

### Option D — Repetitive-migration demo (`moment` everywhere)
Use `moment` migration as the vehicle for a different lesson: AI can do mechanical, repetitive work across many files in parallel. Migrate `moment` in BOTH backend routes that use it, showing how AI handles the same pattern twice with no extra effort.

**Shines because:** matches the outline phrase "AI can accelerate repetitive modernization work" most literally. Two files in five minutes is achievable.

### Option E — CVE / security audit framing
Ask AI to flag dependencies with known security concerns (or where the version is far enough behind that there are likely advisories). Combine with a quick `npm audit` and have AI interpret the output and propose a remediation order.

**Shines because:** brings security into the modernization story, which the outline explicitly mentions ("potential CVEs"). Risk: `npm audit` output is unpredictable on screen — could surface a lot, or very little, depending on the day.

## My take
**Option A** is now the recommended path: the audit already exists (Clip 1), so this clip jumps straight to execution. The "this is the only backend demo" angle is the variety differentiator. **Option D** is the strongest alternative if you want to spotlight AI's repetition-handling explicitly. **Option B** would shift the clip into "AI as planner" territory — fine for a module closer, but breaks the do-not-tell rhythm we just committed to.

## Library decision: `dayjs` (resolved)
Validated against the actual usage. The full `moment` surface in this repo is **format-only** — no timezones, durations, comparisons, relative time, or locales — so every candidate technically works. `dayjs` is the pick for this clip:

- **Token-compatible with moment** (`YYYY-MM-DD HH:mm:ss`, `YYYY-MM-DD`, `YYYYMMDD-HHmmss` all carry over unchanged), so the migration is a near-mechanical `require` swap — a clean, fast, legible diff on camera.
- **Byte-identical output guaranteed**, including the trap below. `.toISOString()` also exists on `dayjs`, so [legacyExport.js](backend/routes/legacyExport.js) maps over 1:1 too.
- **Why not `date-fns`** (the "obvious modern pick"): its headline advantage — tree-shaking / bundle size — is a *frontend* concern and irrelevant to a Node backend, where the whole module loads regardless. Meanwhile it forces token rewrites (`YYYY`→`yyyy`, `DD`→`dd`, and v2+ *throws* on the uppercase forms) plus an explicit `parseISO` — more edits, more risk. Nice on-camera contrast: the trendy choice isn't the right one here.
- **Why not native `Intl`/`Date`**: zero deps (truest "modernize"), but needs a hand-rolled local-time pad helper and careful handling of the trap below — more code, more byte-identical risk for a 5-min clip.

**The byte-identical trap (a strong on-camera "AI caught it" moment):** `formatTimestamp` is called with both a real `Date` ([settings.js:37](backend/routes/settings.js#L37)) *and* a date-only **string** (`'2024-03-01'`) at [settings.js:77](backend/routes/settings.js#L77). `moment('2024-03-01')` and `dayjs('2024-03-01')` both parse it as **local** midnight → `2024-03-01 00:00:00`; a naive `new Date('2024-03-01')` would parse as **UTC** midnight and silently shift the date a day for anyone west of UTC. This is exactly the kind of subtlety to let the AI surface — it gives the "keep output byte-identical" instruction a concrete, demonstrable reason.

**Scope note:** Option A migrates only `settings.js`. [legacyExport.js](backend/routes/legacyExport.js) also imports `moment` but is dead code — leave it (defer to Module 3) or, if you want the cleaner end state, mention on camera that it could just be deleted. Don't half-migrate it without saying why, or the leftover `moment` in `grep` looks like a miss.

## What to ignore for this clip
- Bootstrap migration (Module 1 / Module 3 own that thread)
- React 17 → 18 / 19 (too big for one clip — mention in the audit, defer)
- CRA → Vite (also too big — flag in audit if it comes up, defer)

## Suggested AI prompts (Option A — four beats)

**Beat 1 — the deps audit (in chat):**
> "We've already audited this codebase for code quality and for performance. Now I want a third audit through a different lens: **dependencies**. Look at both `package.json` files. For each dependency tell me: current version, whether it's outdated/deprecated/unmaintained, any known security concerns, and how complex an upgrade would be. List it in chat — no document. Prioritize what to tackle first."

**Beat 2 — the migration:**
> "Top of the list is `moment`. I'm weighing `dayjs`, `date-fns`, and native `Intl` for this file — recommend one and explain the tradeoff, then migrate `backend/routes/settings.js` to it. Keep the formatted-string output byte-identical so downstream consumers don't break — watch for any inputs that aren't full timestamps."

(The "recommend one, explain the tradeoff" framing reliably lands on `dayjs` and lets the AI articulate *why* on camera — token-compatibility + byte-identical safety. The "inputs that aren't full timestamps" nudge invites it to catch the date-only-string trap.)

**Beat 3 — capture the rule:**
> "We just decided to move away from `moment` in this codebase. Update `CLAUDE.md` (or `AGENTS.md`) with the new rule: no new code should use `moment`; prefer `dayjs`. Keep it short — the rule and a one-line reason."

**Beat 4 — capture the skill:**
> "Now let's make this audit repeatable. Create a Claude Code skill at `.claude/skills/dependency-audit/SKILL.md` that captures what we just did — the prompt template for scanning `package.json` through the deps lens, what to flag (deprecated / unmaintained / known CVEs), and the prioritization heuristic. The goal is for next quarter's audit to be one command."

Voiceover beat for Beat 4: *"Next quarter, this is one command. The audit becomes a skill, the skill becomes a habit."*

## Expected outcome shape
- `backend/package.json` — `moment` removed, `dayjs` added
- `backend/routes/settings.js` — `moment` calls replaced by `dayjs` (tokens unchanged); output byte-identical
- `CLAUDE.md` / `AGENTS.md` — small append: "no `moment`; prefer `dayjs`"
- `.claude/skills/dependency-audit/SKILL.md` — new file, ~10–20 lines

## Key files to reference
- [frontend/package.json](frontend/package.json), [backend/package.json](backend/package.json)
- [backend/routes/settings.js](backend/routes/settings.js) — live route using `moment`
- [backend/routes/legacyExport.js](backend/routes/legacyExport.js) — dead route using `moment` (can also be deleted entirely — Module 3 will revisit dead endpoints)
- `.claude/skills/dependency-audit/SKILL.md` — does not exist yet; Beat 4 creates it
