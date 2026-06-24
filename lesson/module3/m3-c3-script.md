# Clip 3: Planning Cross-Cutting Changes — Script Draft

**Total clip duration:** ~5:15 min — **Demo portion:** ~3:00 (narrated live, not scripted here) — **Spoken slide budget:** ~2:15 min (315 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *the safest, cheapest cross-cutting change is the one we never have to make — so plan to retire, not migrate* — **Outline coverage status:** all slide bullets covered (map dependencies, retire-vs-migrate, reduce scope, checklists/milestones/phased rollouts/rollback); demo intentionally unscripted.

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

<!-- Demo not scripted — narrated live over the screen recording. Outcome: map → decide → sequence, producing DECOMMISSION_PLAN.md. Full brief: lesson/08-m3-c3-cross-cutting-plan.md.

     Beats:
       1. (~1 min) MAP. Feed AI the obsolete endpoints (ENDPOINT_REGISTRY.md). For each: where it's mounted
          (server.js), what it returns, every caller, what breaks on removal. Classify retire / migrate / keep.
       2. (~1 min) DECIDE + cut scope. Everything here is retire — obsolete since 2022. The two zombies are fake
          (hardcoded CSV at ApiKeyManager.jsx:57; no-op job at UserExportButton.jsx:16), so we retire the features,
          not rebuild them. That's the scope cut.
       3. (~1 min) SEQUENCE. AI writes DECOMMISSION_PLAN.md:
            Phase 0 — neutralize the callers first (ships before any route is deleted)
            Phase 1 — delete the 4 truly-dead routes (no callers)
            Phase 2 — remove the legacy/export module, its mount + require, and the dead utils/legacyExport.js
          Plus: milestone per phase, a checklist, verification (logger shows zero hits before delete), rollback
          (per-phase commits + git revert).

     Voiceover thread: "The callers come down first, the routes second, the module last. That sequence is the whole game."
     Watch: plan only — no deletions this clip.
-->

[back to slides]

The big lesson here is that the safest migration is the one you never perform.

---

## Notes for Eva

- **Word count (spoken, slides only):** 315 words — roughly 2:15 of slide time at your 140 wpm pace. Paired with a ~3:00 demo, the clip lands around 5:15.
- **Safest cut if running long:** slide 5's artifact descriptions can collapse back to the bare list ("a dependency list, the migration tasks, a rollout-and-monitoring plan, then the cleanup") — recovers ~35 words / ~15s. The clip's already ~5:20, so it's optional.
- **Thread to lean into:** "the safest migration is the one you never perform." Plant it on slide 1 ("finding the work we can avoid"), reinforce on slide 2 ("every module we retire is a migration we never have to run"), and land it in the close. The demo's "callers come down first" is the execution-side proof.
- **Clip independence:** slide 6 says "a set of obsolete endpoints" rather than "the endpoints from the earlier clip" — keep it that way so this stands alone for anyone landing here cold. (The `[demo time]` note references `ENDPOINT_REGISTRY.md`, but that's instructor-facing, not spoken.)
- **Demo note:** the `[demo time]` comment holds the three beats (map → decide → sequence), the Phase 0/1/2 shape, and the "callers first" voiceover thread — narrate those live; full detail is in `lesson/08-m3-c3-cross-cutting-plan.md`. The demo is plan-only — no deletions on camera.
- **Swappable reference:** none — no names or external specifics in the spoken copy.
