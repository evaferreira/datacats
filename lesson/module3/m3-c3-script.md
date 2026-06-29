# Clip 3: Planning Cross-Cutting Changes — Script Draft

**Total clip duration:** ~5:05 min (recorded) — **Demo portion:** ~2:48 (recorded; voiceover transcribed below — 407 words at ~145 wpm) — **Spoken slide budget:** ~2:15 min (315 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *the safest, cheapest cross-cutting change is the one we never have to make — so plan to retire, not migrate* — **Outline coverage status:** all slide bullets covered (map dependencies, retire-vs-migrate, reduce scope, checklists/milestones/phased rollouts/rollback); demo recorded and transcribed below.

---

[slideshow]

Let's talk about planning cross-cutting changes. The ones that span many files and modules at once. Even though our instinct might be to jump straight to executing, a lot of important planning is really about finding the work we can avoid.

[slideshow]

So the first question isn't how to migrate — it's whether to migrate at all. Two things decide it: is it still in use, and does it provide value? When the answer is no — unused modules, abandoned endpoints, duplicated abstractions, dead experiments — we retire it. When it's yes — core capabilities, business-critical flows, active dependencies, evolving functionality — we migrate it. Every module we retire is a migration we never have to run.

[slideshow]

This is where AI helps most: mapping how a module is actually used across the codebase. It can summarize where it's used, identify every reference to it, discover who owns it, and estimate the impact of removing it. That dependency map is what tells us, with evidence, what's safe to retire and what we can't touch yet.

[slideshow]

Once we know what's going to be removed, we take it down in four phases: inventory what's leaving, retire the consumers still calling it, disable it, and finally, remove it for good.

[slideshow]

Each phase produces an artifact we can work from. The inventory gives us a dependency list — every place that still touches what we're removing. Retiring the consumers gives us the migration tasks — the work to move each caller off it. Disabling gives us a rollout-and-monitoring plan — how we switch it off in stages and watch for fallout. And removal gives us the cleanup — the leftover code and anything still pointing at it will be gone.

[slideshow]

So let's take a set of obsolete endpoints and turn them into an executable retirement plan.

[demo time]

Earlier, we identified a few of the unused endpoints on our repository. We have asked our AI agent to create an endpoint registry markdown file at the root of the repository and categorize them, so we can understand which ones could be removed.

Out of our 28 endpoints, there are a few that are confirmed dead that we can safely remove. Next, there are a few that are considered zombies which we could remove, but not before understanding a little bit more about the current code and the places where they are being referenced from.

So, let's go ahead and ask our coding agent to review this list of endpoints and classify them correctly. Should we remove them entirely? Or should we migrate them to another supported endpoint? Let's be very clear about those two zombie ones: we need to do extra research into the UI, see where those features are being used, and decide whether they're worth keeping or we should retire them.

All right, once that is done, it first helps us confirm which endpoints can be completely retired. Next, it does a deep dive into those two zombie calls — it recommends migrating the first one before retiring it; for the second, it recommends retiring it immediately.

Finally, let's ask it to create a decommission plan based on this research, with phased, reversible steps. We'll ask it to include a checklist, a verification plan, and a rollback plan. Let's make sure to mention not to change any code yet — we just want the plan.

The result is a markdown file with a set of guiding principles to make sure these changes are safe and reversible. These include, among others, recommendations like one PR per phase and manual verification.

Next, it breaks down the work into phases. Phase 0 is preparation: creating a new branch, running the app, and confirming the assumptions about those two zombie calls. Phase 1 is to decouple the UI from those legacy endpoints. Phase 2 is removing the truly dead endpoints. Phase 3 is removing the legacy modules. And finally, Phase 4 is updating the docs we use to track this work.

In each of these phases, the planning includes a verification strategy, so that while we manually test the application, we don't face any regressions.

Stepping back, notice how much of this plan is about retiring these endpoints, not migrating them — which is really the whole point.

<!-- Demo recorded — the voiceover is transcribed above. Original planning brief: lesson/08-m3-c3-cross-cutting-plan.md. (Note: the recorded plan came out in 5 phases (0–4), not the brief's planned 0/1/2 — the transcript above is the source of truth.) -->

[back to slides]

The big lesson here is that the safest migration is the one you never perform.

---

## Notes for Eva

- **Word count:** slides 315 words ≈ 2:15 (140 wpm); demo voiceover 407 words ≈ 2:48 (145 wpm). Total ≈ 5:05 — confirm against the actual recorded demo length (the video may run longer than the voiceover with on-screen AI time).
- **Safest cut if running long:** slide 5's artifact descriptions can collapse back to the bare list ("a dependency list, the migration tasks, a rollout-and-monitoring plan, then the cleanup") — recovers ~35 words / ~15s. The clip's ~4:55, so it's optional.
- **Thread to lean into:** "the safest migration is the one you never perform." Plant it on slide 1 ("finding the work we can avoid"), reinforce on slide 2 ("every module we retire is a migration we never have to run"), and land it in the close. The demo's "callers come down first" is the execution-side proof.
- **Clip independence:** slide 6 says "a set of obsolete endpoints" rather than "the endpoints from the earlier clip" — keep it that way so this stands alone for anyone landing here cold. (The `[demo time]` note references `ENDPOINT_REGISTRY.md`, but that's instructor-facing, not spoken.)
- **Demo note:** the demo is recorded — voiceover transcribed inline under `[demo time]` (the old beats comment was condensed to a pointer). The recorded plan came out in 5 phases (0–4); the "callers come down first" sequencing is the on-camera proof. Full brief: `lesson/08-m3-c3-cross-cutting-plan.md`.
- **Swappable reference:** none — no names or external specifics in the spoken copy.
