**Clip 5: Modernizing Frameworks and Dependencies**   (\~5 minutes)

AI can accelerate repetitive modernization work. We will work through framework, library, and dependency upgrades to keep up with the latest standards, avoid compatibility issues and potential CVEs.

                **Demo idea:** Audit dependencies through the deps lens. Replace one deprecated library. Record the new rule.

## Slide outline

### Slide 1

**Title — "Modernizing Frameworks and Dependencies"**

### Slide 2

**Dependency debt**

- Security risks
- No more updates
- As more time goes by, the harder it gets to get out

Script note: *Old dependencies are CVEs waiting to happen — and if the library is no longer maintained, the patches never come, and we also miss out on any new features we could get. The longer you wait, the worse it gets: breaking changes pile up, and what could have been one upgrade turns into four.*

### Slide 3

**Pick one. Migrate it well.**

1. Audit the dependencies
2. Upgrade or replace
3. Write down the rule
4. Repeat

Script note: *We use the same instinct as code quality and performance audits, just a little bit different. Dependencies drift the moment you stop watching, so the cycle matters more than any single migration.*

### Slide 4

demo introduction
Title: **"Upgrading and maintaining dependencies"**

### DEMO HERE (around 3.5 minutes)

**\[demo placeholder — four beats across frontend and backend:**

**Audit, migrate, capture, repeat.**

- read `package.json` through the deps lens
- migrate one deprecated library
- record the new rule for the next contributor
- turn the audit itself into a reusable skill

Voiceover hook: *"AI shines on the boring stuff — and the best boring work is the one you only do once."*

- **Beat 1 (~45s):** Eva opens both `package.json` files (frontend and backend). Asks AI to flag deprecated, unmaintained, or risky packages. AI lists findings — `moment` flagged as deprecated (maintenance mode since 2020), Router v5 / React 17 / CRA noted as upgrade candidates.
  - *Voiceover reminder:* "`npm audit` is a complement here — it catches known CVEs. For deprecation-by-design like `moment`, asking AI to read `package.json` directly is faster."
- **Beat 2 (~1.5 min):** Eva picks `moment` as today's target. Asks AI to migrate [`backend/routes/settings.js`](backend/routes/settings.js) from `moment` to `date-fns` (or native `Intl`). AI walks through the swap; output strings stay byte-identical.
  - *Voiceover joke lands here:* "AI shines on the boring stuff." Watch the model swap `moment().format(...)` calls one by one without complaining.
  - *Voiceover note:* "And the second route uses the same pattern — AI just learned it, so the next migration is seconds away."
- **Beat 3 (~30s):** Eva asks AI to update `CLAUDE.md` / `AGENTS.md` with the new rule: no more `moment` in this codebase; prefer `date-fns` for new code. Small append. Callback to Clip 3's convention-capture beat.
- **Beat 4 (~30s):** Eva asks AI to create a reusable Claude Code skill at `.claude/skills/dependency-audit/SKILL.md` that captures today's audit prompt and workflow (the deps lens, the prioritization heuristic, what to flag). Next quarter's audit becomes one command.
  - *Voiceover beat:* "Next quarter, this is one command. The audit becomes a skill, the skill becomes a habit."**\]**

### Slide 6

**The code you ship is the code you maintain.**

Script note: *Dependencies don't pause when you stop looking — every release of every library moves the ecosystem forward, and standing still is the same as falling behind. Modernization isn't a project. It's the habit of keeping up to date!*

### Slide 7

**Improving and modernizing with AI**

- audit what needs fixing
- migrate one piece at a time
- decompose and reuse
- create repeatable processes

Script note: *Audit so you know what to fix. Migrate piece by piece so any change can be tested and reverted independently. Decompose so what you build today gets reused tomorrow. And make it repeatable so nobody learns the same lesson twice. None of these are projects. All of them are practices.*
