# Clip 6: Limits and Guardrails for AI at Scale — Script Draft

**Total clip duration:** ~3:50 min — **Demo portion:** none (discussion clip — all slides) — **Spoken budget:** ~3:50 min (538 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *AI amplifies output but not certainty — so at scale, safety lives in the process around the automation, not the automation itself* — **Module closer:** slide 7 lands the M3 throughline — **Outline coverage status:** all slide bullets covered (small-vs-large stakes, the three failure modes = context-window / hallucinated deps + invented APIs / unsafe assumptions, guardrails, controls, human review).

---

[slideshow]

Let's talk about the limits, and the guardrails, for using AI at scale.

[slideshow]

Let's start with the core tension. A bad suggestion in a single file is just annoying — we spot it, fix it, and move on. But a bad assumption applied across a hundred files becomes expensive, fast. That's the thing about AI at scale: it increases our output, but it doesn't increase our certainty. It amplifies both our strengths and our weaknesses — so a small change stays a small mistake, but a large change can mean large consequences, landing everywhere at once.

[slideshow]

So where does AI actually fail at scale? In three ways. First, a visibility failure: it can't hold the whole codebase in its context window, so it acts on a partial view — it'll happily rebuild a helper that already exists two folders over, because it never saw it. Second, an inference failure: to fill the gaps, it guesses, and it guesses confidently — hallucinated dependencies, invented APIs that look completely plausible but simply don't exist. And third, a scope failure: it quietly does more than we asked, making unsafe assumptions about what else should change — "fixing" a bug we never told it to touch. Any one of these is easy to catch in a single file. Across a hundred, they compound before we even notice.

[slideshow]

So guardrails are how we shrink the blast radius. We limit the scope of each change, so a mistake can't spread far. We review the outputs and validate the assumptions the AI made — not just the code it wrote. And we expand gradually: prove the pattern on a little, before we apply it more broadly.

[slideshow]

Here's the main issue: AI made writing code cheap, so the real bottleneck moves to verifying AI output. These controls aren't bureaucracy — they're our leverage. And different risks call for different controls: tests catch behavior changes before they ship. Git discipline — small, focused commits — keeps every change reviewable, and easy to revert if we need to. CI/CD quality gates stop problems before they ever merge. And phased rollouts release gradually, so a bad change hits a small group of users, not all of them. This allows us to fail gracefully.

[slideshow]

Through all of it, human review stays essential — it just changes shape. At scale, we're no longer reading every line of code. We're validating that it actually works, checking that it follows our standards, and challenging the assumptions the AI made along the way. Two traps to watch for: AI output is fluent — it can read as right even when it's wrong. And we don't let the AI grade its own homework: if one agent writes the change and the test that proves it, that test can pass without proving anything. That judgment is the part that doesn't automate.

[slideshow]

And that's the real lesson — not just here, but for everything we scale with AI. The tools will keep getting faster, and the temptation will be to trust them more. But safety isn't something we automate; it lives in the processes around the automation. AI gives us the output, but the guardrails, the controls, and the human review are what let us trust it.

---

## Notes for Eva

- **Word count (spoken):** 538 words — roughly 3:50 at your 140 wpm pace. No demo, so this is the whole clip — the three added senior-engineer beats put it near the outline's ~4:00 target. If you'd rather land ~3:30, see the safest cut below.
- **Safest cut to land ~3:30:** trim slide 3's three concrete examples down to the named failure modes (~30 words / ~13s); slide 5's "This allows us to fail gracefully" can also go (~6 words). Keep the slide-5 reframe and the slide-6 traps — those are the clip's payload.
- **Thread to lean into:** "output, not certainty" → "safety lives in the process." Plant it on slide 2 ("increases output, but not certainty"), carry it through the failure modes and controls, and land slide 7 ("safety isn't something we automate; it lives in the process"). Lean on "blast radius" (slide 4) as the vivid image. The senior-engineer beats to land deliberately: "writing is cheap, verifying is the bottleneck" (slide 5), and the two review traps — fluency isn't correctness, and don't let AI grade its own homework (slide 6).
- **Module closer:** slide 7 is the last beat of Module 3 — slow down and let it land. "Not just here, but for everything we scale with AI" is the whole-module takeaway; it's phrased universally so it doesn't depend on the other clips.
- **Clip independence:** nothing references sibling clips by name — git discipline, CI/CD gates, and phased rollouts are named as controls, not as "the clip where we cover them." Keep it that way so this stands alone.
- **Slide 7 wording (flag for the deck, not the script):** the slide reads "Safety is found **on** processes, not automation" — should be "found **in** processes." I narrated it correctly ("it lives in the process"); just flag the slide text for a quick fix.
- **Swappable reference:** none — no names or external specifics in the spoken copy.
