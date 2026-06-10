# Clip 3: Architectural Refactoring — Script Draft

**Total clip duration:** ~7:00 min — **Demo portion:** ~3:30–4:00 (three beats on one file, narrated live, not scripted here) — **Spoken slide budget:** ~2:40 min (~380 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *it's not just rewriting code — it's improving the experience for the next contributor; conventions govern what comes next* — **Outline coverage status:** all slide bullets covered (slides 1–4 and 6; demo intentionally unscripted)

---

[slideshow]

Let's talk about architectural refactoring. Readable code isn't automatically well-structured code — a file can be perfectly clear line by line and still be doing far too much. So let's look at how we improve the shape of the system itself, and why that matters for everyone who works on it.

[slideshow]

Because this isn't an aesthetic problem — it's a daily-work problem. Every developer knows what it feels like to open a file and feel lost, because too much is happening in one place. Good decomposition gives us the clarity we need. When each piece owns one concern our mental model of the codebase is clear. Conflicts stay local, so two people can work in the same area without colliding. Each piece can be tested on its own.

[slideshow]

So, this is how we are going to approach it. First, we remove dead code — the noise that makes everything harder to read. Second, we extract one piece at a time, taking small, reversible steps instead of rewriting everything at once. Third, we reuse the abstractions we just created. And fourth — the step that teams forget the most — we capture the new conventions we just established.

[slideshow]

Let's put that to work on a single file: a dashboard page that has grown up to 470 lines of code. We'll do it in three beats. First, clean — we delete the dead code our audit already flagged. Then, extract — we pull the data-fetching out into its own custom hook. And finally, capture — we record the new rule so they stick around. 470 lines of code, let's find out what they are doing!

[demo time]

<!-- Demo not scripted — narrated live over the screen recording. Reads MIGRATION_AUDIT.md; writes code + a small CLAUDE.md/AGENTS.md append.

     Note to self (demo shape — Option A+ from the brief, three beats on DashboardPage.jsx):
       1. Clean (~1 min): remove processData2, tempFix, the commented-out dark-mode block,
          the commented-out legacyExportBlock, and the misleading handleStuff comment. ~454 → ~400 lines.
       2. Extract (~2 min): AI lists remaining responsibilities (data fetching, derived metrics, filters,
          layout), proposes a decomposition, then extracts useDashboardMetrics into a NEW src/hooks/ dir.
          ~400 → ~350 lines. Extract ONE hook only; document the rest of the plan in the conversation.
       3. Capture (~30s): append to CLAUDE.md / AGENTS.md — hooks live in src/hooks/, pages stay thin,
          data-fetching belongs in hooks. Short: the rule + a one-line reason.
     Watch for: QuickStats unused import (App.js:14) — fine if quick, else defer. AI may want to extract
     multiple hooks at once — pre-decide on camera that we do exactly one.
-->

[back to slides]

So what did we really do here? It's not just rewriting code — it's improving the experience for the next contributor. The refactor itself is only half of it. The other half is the convention, and a convention isn't real until it's captured. We refactor, we ship, we move on — and six months later someone reinvents the old pattern, because nobody wrote the new one down. Code tells us what the system does. Conventions tell us why, and how to add to it. So when we establish a new pattern, let's write it down for whoever comes next, whether it is a human or a bot!

---

## Notes for Eva

- **Word count (spoken, slides only):** ~380 words — roughly 2:40 of slide time at your 140 wpm pace. Pairs with a ~3:30–4:00 three-beat demo for a clip around 7:00, the longest in the module.
- **Demo not scripted:** the `[demo time]` note-to-self block holds the three beats and the two "watch for" traps from the brief — narrate those out loud; they aren't in the spoken slide copy.
- **Thread to lean into:** "the next contributor" — name it on slide 1 ("everyone who works on it"), then pay it off in the close ("write it down for whoever comes next, whether a human or a bot"). The convention-capture idea on slide 3 (step 4) and slide 6 is the durable lesson; lean on "a convention isn't real until it's captured."
- **Clip independence:** slide 4 says "the dead code our audit already flagged" rather than naming a previous clip — keep it that way so this stands alone for anyone landing here cold.
- **Safest cut if running long:** in slide 2, the three benefits can drop to two — cut "Each piece can be tested on its own." The clear-mental-model and local-conflicts points carry the idea. Recovers ~10 words.
