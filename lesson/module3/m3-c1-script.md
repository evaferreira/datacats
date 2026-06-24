# Clip 1: Why Large-Scale Refactoring Is Different — Script Draft

**Total clip duration:** ~4:10 min — **Demo portion:** ~2:00 (narrated live, not scripted here) — **Spoken slide budget:** ~2:08 min (~299 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *at scale, the hard part stops being the code and becomes the coordination — and we can't coordinate what we can't see* — **Outline coverage status:** module map (slide 1) + all slide bullets covered; the outline's "merge conflicts" and "daily-commits vs untouched" distinctions land in slide 4's narration; demo intentionally unscripted.

---

[slideshow]

Welcome to Scaling AI-Assisted Refactoring Across Large Codebases. We will look at why large-scale refactoring is different, how to choose a refactor strategy, plan cross-cutting changes, audit design debt and consistency, scale example-driven migrations, and set the limits and guardrails for AI on a large codebase. At scale, the hard part stops being the code and becomes the coordination.

[slideshow]

So let's begin with why large-scale refactoring is different.

[slideshow]

Here's the key. Changing one component is engineering. Changing fifty is coordination. At scale, the edit itself is rarely the hard part — it's everything around it.

[slideshow]

This is the hidden complexity of scale. A small refactor lives in local context — everything we need is in front of us; a large one is distributed, where dependencies are scattered and easy to miss. A small refactor has a single owner; a large one has many — more people in the same files, more merge conflicts. A small refactor is one deployment with an easy rollback; a large one is a phased rollout, a coordinated one. And an actively-changing codebase, with commits landing daily, needs a different strategy than one that has been untouched for years.

[slideshow]

So where does AI help us first? It can read the whole system at once — and build an evidence trail. Let's put that to work, and hunt for unused endpoints across the backend and the frontend together.

[demo time]

<!-- Demo not scripted — narrated live over the screen recording. Outcome: cross-reference backend ↔ frontend, classify, update ENDPOINT_REGISTRY.md. Full brief: lesson/07-m3-c1-dead-endpoints.md.

     Beats:
       1. (~30s) Ask AI to list every backend route (server.js + route files) AND search the frontend src/ for all
          API calls — account for all three fetch clients (api.js, apiHelpers.js, apiClient.js).
       2. (~45s) Cross-reference → the clean four with no frontend caller: GET /reports/export, POST /reports/schedule,
          GET /legacy/export/pdf, POST /settings/migrate.
       3. (~30s) Push on legacyExport.js — the payoff: 2 of its 3 routes are STILL called
          (ApiKeyManager.jsx:57 → /legacy/export/csv; UserExportButton.jsx:16 → /legacy/export/bulk). Not cleanly
          dead — these are "zombies" (hardcoded CSV / fabricated jobId). This is the hidden-dependency beat — name it.
       4. (~15s) Update ENDPOINT_REGISTRY.md, splitting truly-uncalled from called-but-obsolete.

     Voiceover hook (the thread): "'Dead' is a claim you verify by reading both sides of the call — not a grep result."
     Watch: identify + classify only — don't fix or remove anything this clip.
-->

[back to slides]

And that's the technique. We didn't trust that an endpoint was dead just because it looked dead — we read both sides of the call and let the evidence decide. What is safe in isolation often isn't at scale. So we map the code, then the dependencies, we coordinate — and only then, we execute. The change is the easy part; knowing what it touches is the work.

---

## Notes for Eva

- **Word count (spoken, slides only):** 299 words — roughly 2:08 of slide time at your 140 wpm pace. Paired with a ~2:00 demo, the clip lands around 4:10 — right on target. Taking the safest cut below brings slides to ~2:00 (~4:00 total).
- **Safest cut if running long:** on slide 4, drop the closing "actively-changing codebase… untouched for years" sentence (~20 words / ~9s). The four-row contrast above it still carries the "scale is different" point.
- **Thread to lean into:** "coordination" — name it on slide 1 ("becomes the coordination"), hit it hard on slide 3 ("changing fifty is coordination"), and land it in the close ("the change is the easy part — knowing what it touches is the work"). The recurring image is that we can't see the whole system at once, which the demo's zombies prove.
- **Clip independence:** slide 1 lists the module's topics as areas of work, not "the next clips," and the close says "we map the dependencies, then coordinate" rather than naming a planning clip — keep it that way so this stands alone for anyone landing here cold.
- **Demo note:** the `[demo time]` comment holds the four beats, the zombie payoff, and the voiceover hook — narrate those live; they're not in the spoken slide copy. The zombies are the on-camera proof of the "hidden dependencies / can't see it all at once" thread.
- **Swappable reference:** none — no names or external specifics in this clip.
