# Clip 1: Auditing Code Quality — Script Draft

**Total clip duration:** ~4:00 min — **Demo portion:** ~2:00 (narrated live, not scripted here) — **Spoken slide budget:** ~2:10 min (~305 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *we don't fix what we don't know — and we scope every audit by lens* — **Outline coverage status:** slides 1–5 and 7 fully covered; slide 6's two dimensions + dead-code bonus now land in the demo, not the slides (note in the demo section)

---

[slideshow]

Welcome to Improving and Modernizing Legacy Code with AI. Across this module we will audit code quality, improve maintainability through cleaner naming and less repetition, refactor architecture for modularity and separation of concerns, optimize for performance, and modernize our frameworks and dependencies. AI accelerates every one of those steps — but only if we audit first.

[slideshow]

So let's begin with auditing code quality.

[slideshow]

Let's first ask, why do we even audit? The honest answer is that we don't fix what we don't know. "This codebase is messy" is a feeling, not a plan. The audit is what turns that feeling into a concrete, prioritized backlog we can actually work through.

[slideshow]

And not every audit is worth the same. So let's look at the shape we want.

We want it prioritized, instead of a flat list — so we know what to fix first.

We want it specific, instead of vague — real evidence, real file paths.

We want it actionable, instead of just descriptive — it names the next move, and even predicts what could break.

And we want it living, instead of static — a backlog we keep returning to, not a one-time report.

When it's all four, this audit will become the plan.

[slideshow]

Another important thing is to scope every audit by lens. Code quality, performance, and dependencies are three different audits — different prompts, different findings, different decisions. Bundle them together and we get noise instead of a backlog. So it's better to do more audits than to put them all in one place.

[slideshow]

Let's work through the code-quality lens and see how this works in practice.

[demo time]

<!-- Demo not scripted — narrated live over the screen recording. Outcome: produce MIGRATION_AUDIT.md.

Today we are working through the code-quality lens, across two dimensions and one bonus. First, class components, ranked by migration complexity, so we know which ones are cheap to modernize and which ones are risky. Second, architectural debt — oversized files, mixed responsibilities, and inline duplicates. And as a bonus, dead code we can simply delete. So let's take a look at how this works in practice.

     Note to self (from slide 6): name these three surfaces out loud while narrating the audit —
       1. Class components, ranked by migration complexity
       2. Architectural debt — oversized files, mixed responsibilities, inline duplicates
       3. Dead code (bonus surface)
-->


[back to slides]

And that is our code-quality audit. The backlog is built, the priorities are set, and the evidence is captured. We identified what was messy, and now we have a plan we can actually work from.

---

## Notes for Eva

- **Word count (spoken, slides only):** ~305 words — roughly 2:10 of slide time at your 140 wpm pace. Pairs with a ~2:00 demo for a clip right around 4:00. Comfortable margin if the demo runs a little long.
- **Safest cut if running long:** drop the slide 4 "specific / vague" line ("We want it specific, instead of vague — real evidence, real file paths."). File paths also show up in the demo, so the arc survives losing it — recovers ~12 words.
- **Thread to lean into:** "we don't fix what we don't know" (slide 3) and "this audit becomes the plan" (slide 4). The closing echoes it with "we identified what was messy" — lean on that line to land the through-line.
- **Clip independence:** The module map on slide 1 lists what the *module* covers (fine), but I avoided pointing at sibling clips — slide 5 says each lens "deserves its own focused pass" rather than "we'll cover those later." Keep it that way if you ad-lib.
- **Swappable reference:** none — no names or external specifics in this clip.
