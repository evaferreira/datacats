# Clip 5: Modernizing Frameworks and Dependencies — Script Draft

**Total clip duration:** ~7:10 min — **Demo portion:** ~4:55 (audit → research → migrate moment → capture skill; narrated live, full text in lesson/m2-c5-demo-script.md; ~737 words at your measured ~150 wpm demo pace) — **Spoken slide budget:** ~2:15 min (~310 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *the code you ship is the code you maintain — modernization is a habit, not a project* — **Module closer:** slide 7 lands the whole-module thesis ("none of these are projects, all of them are practices") — **Outline coverage status:** all slide bullets covered (slides 1–4, 6, 7; demo intentionally unscripted)

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

<!-- Demo not scripted — narrated live over the screen recording. Full narration in lesson/m2-c5-demo-script.md.
     Audit findings live in chat — no audit doc this clip. Only backend-touching demo in M2.

     Recorded beats:
       1. Show the project layout — the root package.json runs both apps; backend and frontend each have their own.
          Focus on backend + frontend, skip the root.
       2. Ask AI for a dependency audit on both package.json files: current version, out-of-date / deprecated /
          unmaintained, known security concerns, upgrade complexity. Findings in chat. Flags moment (unmaintained),
          express (vuln), Bootstrap 4 (EOL → v5), react-scripts/CRA + React-testing libs. Defer the big ones.
       3. Caution beat: always double-check the version numbers the agent suggests against npm — guard against
          hallucinated versions. (Recovered lesson from the cut Express 4.22.2 attempt.)
       4. Pick moment. Ask AI to research Day.js vs date-fns vs native Intl, capture how we use moment today, find
          feature gaps, and recommend one — research only, no code changes. It recommends Day.js (near-identical
          syntax, lightweight, maintained).
       5. Migrate moment → Day.js. Formatted outputs stay the same; swap is quick.
       6. Make it repeatable: AI creates .claude/skills/dependency-audit/SKILL.md capturing today's audit checklist.
          Next quarter it's one command — /dependency-audit. Beat: "the audit becomes a skill, the skill becomes a habit."
     NOTE: the recording skips the CLAUDE.md "no more moment" rule-capture beat from the brief — here the skill IS the capture.
-->

[back to slides]

The code you ship is the code you maintain. Standing still is the same as falling behind — so modernization isn't a project we finish once, it's a habit instead!

[slideshow]

And that's the heart of improving and modernizing with AI. We audit, so we know what actually needs fixing. We migrate one piece at a time, so any change can be tested and reverted on its own. We decompose and reuse, so what we build today can be used tomorrow. And we make the work repeatable, so nobody learns the same lesson twice. None of these is a project by itself, they are practices.

---

## Notes for Eva

- **Word count (spoken, slides only):** ~310 words — roughly 2:15 of slide time at your 140 wpm pace. The demo narration (lesson/m2-c5-demo-script.md) is ~737 words ≈ 4:55 at your measured ~150 wpm demo pace, so the whole clip lands around ~7:10 — the longest in the module. It carries two closing slides (6 and 7); see the safest cut if you want to trim further.
- **Demo not scripted:** the `[demo time]` note-to-self block holds the four beats (audit → migrate `moment` → capture the rule → capture the skill) plus the `npm audit` reminder and the two voiceover jokes. This is the only backend demo in the module — worth calling that out lightly while narrating.
- **Slide 7 is the module close, not a clip beat:** slow down here. You're talking past this clip into what the viewer does next — land "none of these are projects by itself, they are practices" as the final line of the whole module. Let it breathe.
- **Thread to lean into:** "the code we ship is the code we maintain" and the word *habit / practice* — set up "we repeat" on slide 3, land "the habit of keeping up" on slide 6, and close on "practices" on slide 7.
- **Clip independence:** slide 3 names "a code-quality or a performance audit" as types of audits, not as previous clips, and slide 7 recaps the practices as principles rather than a chronological tour — keep it that way so the closer works for anyone landing here cold.
- **Safest cut if running long:** in slide 3, drop the opening "same instinct" sentence and start at "First, we audit the dependencies." Recovers ~13 words / ~6 seconds without touching the four steps or the closer. For more, slide 2's "Worst of all, it compounds…" sentence can also go (~25 words) — the security and unmaintained points already carry the slide.
