# Clip 5: Modernizing Frameworks and Dependencies — Script Draft

**Total clip duration:** ~5:50 min — **Demo portion:** ~3:30 (audit → migrate → capture rule → capture skill, narrated live, not scripted here) — **Spoken slide budget:** ~2:20 min (~330 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *the code you ship is the code you maintain — modernization is a habit, not a project* — **Module closer:** slide 7 lands the whole-module thesis ("none of these are projects, all of them are practices") — **Outline coverage status:** all slide bullets covered (slides 1–4, 6, 7; demo intentionally unscripted)

---

[slideshow]

Let's talk about modernizing our frameworks and dependencies so we can keep up with current standards, avoid compatibility problems, and stay ahead of security issues.

[slideshow]

Let's start with why dependency debt is so dangerous. Old dependencies are security vulnerabilities waiting to happen. And when a library goes unmaintained, the patches never come, and we also miss out on any new cool features we could get. Worst of all, it compounds — the longer we wait, the more breaking changes pile up, until one clean upgrade quietly turns into four major versions of difference.

[slideshow]

So how do we approach it? With the same instinct we bring to any audit. First, we audit the dependencies. Then we upgrade or replace what's risky. Then we write down the rule, so the decision sticks. Then we repeat! Because dependencies fall out of date the moment we stop watching, so the cycle matters more than any single migration.

[slideshow]

Let's put that to work and upgrade some dependencies. We'll audit a project's npm packages, migrate a deprecated library, record the new rule, and then turn the audit itself into a reusable skill. Because AI shines on the boring stuff — and the best boring work is the kind you only have to do once.

[demo time]

<!-- Demo not scripted — narrated live over the screen recording. Option A from the brief; only backend-touching demo in M2.
     Audit is conversational — findings live in chat, NO new audit doc (Clip 1 owns that artifact).

     Note to self (four beats — audit, migrate, capture rule, capture skill):
       1. (~45s) Open both package.json files. Ask AI to flag deprecated/unmaintained/risky packages.
          moment flagged (maintenance mode since 2020); Router v5 / React 17 / CRA noted as candidates, DEFER those.
          Reminder line: npm audit complements this — it catches known CVEs; for deprecation-by-design like moment,
          asking AI to read package.json directly is faster.
       2. (~1.5 min) Migrate backend/routes/settings.js from moment → date-fns (or native Intl; explain tradeoff).
          Output strings byte-identical. Joke lands: "AI shines on the boring stuff." Note the second route uses the
          same pattern — next migration is seconds away.
       3. (~30s) AI appends to CLAUDE.md / AGENTS.md: no new moment; prefer date-fns. Callback to Clip 3's capture beat.
       4. (~30s) AI creates .claude/skills/dependency-audit/SKILL.md capturing today's prompt + heuristic.
          Beat: "Next quarter, this is one command. The audit becomes a skill, the skill becomes a habit."
-->

[back to slides]

The code we ship is the code we maintain. Dependencies don't pause when we stop looking — every release of every library moves the ecosystem forward, which means standing still is the same as falling behind. Modernization isn't a project we finish once. It's the habit of keeping up.

[slideshow]

And that's the heart of improving and modernizing with AI. We audit, so we know what actually needs fixing. We migrate one piece at a time, so any change can be tested and reverted on its own. We decompose and reuse, so what we build today can be used tomorrow. And we make the work repeatable, so nobody learns the same lesson twice. None of these is a project by itself, they are practices.

---

## Notes for Eva

- **Word count (spoken, slides only):** ~330 words — roughly 2:20 of slide time at your 140 wpm pace. With a ~3:30 demo the clip lands around 5:50. It runs a touch long because this is the module closer and carries two closing slides (6 and 7); see the safest cut if you need to pull it back toward 5:30.
- **Demo not scripted:** the `[demo time]` note-to-self block holds the four beats (audit → migrate `moment` → capture the rule → capture the skill) plus the `npm audit` reminder and the two voiceover jokes. This is the only backend demo in the module — worth calling that out lightly while narrating.
- **Slide 7 is the module close, not a clip beat:** slow down here. You're talking past this clip into what the viewer does next — land "none of these are projects by itself, they are practices" as the final line of the whole module. Let it breathe.
- **Thread to lean into:** "the code we ship is the code we maintain" and the word *habit / practice* — set up "we repeat" on slide 3, land "the habit of keeping up" on slide 6, and close on "practices" on slide 7.
- **Clip independence:** slide 3 names "a code-quality or a performance audit" as types of audits, not as previous clips, and slide 7 recaps the practices as principles rather than a chronological tour — keep it that way so the closer works for anyone landing here cold.
- **Safest cut if running long:** in slide 3, drop the opening "same instinct" sentence and start at "First, we audit the dependencies." Recovers ~13 words / ~6 seconds without touching the four steps or the closer. For more, slide 2's "Worst of all, it compounds…" sentence can also go (~25 words) — the security and unmaintained points already carry the slide.
