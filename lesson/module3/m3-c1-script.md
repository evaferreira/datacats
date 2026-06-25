# Clip 1: Why Large-Scale Refactoring Is Different — Script Draft

**Total clip duration:** ~3:50 min (recorded) — **Demo portion:** ~1:45 (recorded; voiceover transcribed below — 249 words ≈ 1:43 at ~145 wpm) — **Spoken slide budget:** ~2:08 min (299 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *at scale, the hard part stops being the code and becomes the coordination — and we can't coordinate what we can't see* — **Outline coverage status:** module map (slide 1) + all slide bullets covered; the outline's "merge conflicts" and "daily-commits vs untouched" distinctions land in slide 4's narration; demo recorded and transcribed below.

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

Here's the thing: we currently have a monorepo application, a NodeJS backend and a frontend built with React. Our backend exposes a number of endpoints, and the frontend calls them — they live in the routes directory of the backend. Something that we have noticed recently is that some of those files mention that a certain endpoint is... DEAD. But before removing anything, I want to make sure those are really not being used in the frontend in any way.

So let's open a new session and let's ask our AI agent to help us list all the available routes in the backend, then we will ask it to search the frontend for everywhere they're called and finally, to cross-reference that information so we can confirm which endpoints are truly deprecated. We simply don't want to blindly trust a code comment that could be very stale.

Alright, it has finished. As expected, it begins with a breakdown of all our backend routes, and notes that out of those, 19 are called from the frontend. And there are almost 10 that are truly unused and can be removed.

It makes a very important note at the end where it mentions that in fact, that file that mentioned 3 dead endpoints... was wrong. Out of those 3, there are two that are still being referenced in the frontend code.

This is exactly the kind of cross-cutting research AI is great at — reading a large codebase across frontend and backend at once.

[back to slides]

And that's the technique. We didn't trust that an endpoint was dead just because it looked dead — we read both sides of the call and let the evidence decide. What is safe in isolation often isn't at scale. So we map the code, then the dependencies, we coordinate — and only then, we execute. The change is the easy part; knowing what it touches is the work.

---

## Notes for Eva

- **Word count:** slides 299 words ≈ 2:08 (140 wpm); demo voiceover 249 words ≈ 1:43 (145 wpm). Total ≈ 3:50 — confirm against the actual recorded demo length (the video may run a bit longer than the voiceover with on-screen AI-processing time).
- **Safest cut if running long:** on slide 4, drop the closing "actively-changing codebase… untouched for years" sentence (~20 words / ~9s). The four-row contrast above it still carries the "scale is different" point.
- **Thread to lean into:** "coordination" — name it on slide 1 ("becomes the coordination"), hit it hard on slide 3 ("changing fifty is coordination"), and land it in the close ("the change is the easy part — knowing what it touches is the work"). The recurring image is that we can't see the whole system at once, which the demo's zombies prove.
- **Clip independence:** slide 1 lists the module's topics as areas of work, not "the next clips," and the close says "we map the dependencies, then coordinate" rather than naming a planning clip — keep it that way so this stands alone for anyone landing here cold.
- **Demo note:** the demo is now recorded — the voiceover is transcribed inline under `[demo time]` (no longer a beats comment). The zombie reveal (2 of the 3 "dead" legacy routes are actually called) is the on-camera proof of the "can't see it all at once" thread.
- **Swappable reference:** none — no names or external specifics in this clip.
