# Clip 4: Detecting Side Effects Early — Script Draft

**Total clip duration:** ~3:34 min (slides only) — **Demo portion:** none (this clip is slides only) — **Spoken slide budget:** ~3:34 min (499 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *mistakes happen — what matters is how fast we see them and how calmly we react* — **Outline coverage status:** all slide bullets covered; outline bullets (staged rollouts, canary, logs, monitoring, error rates, performance baselines, user feedback; AI analyzes logs / groups errors / compares releases / highlights suspicious changes) land across slides 3–5; no demo.

---

[slideshow]

Let's talk about detecting side effects early. We can do everything right — small, careful changes, a solid test suite, a pipeline full of checks — and a regression can still slip through. That's not failure; it's reality. No matter how much we test, some problems only show up once the code is live. So the question that matters here isn't how do we never break anything — it's how do we notice quickly, and how do we react when we do.

[slideshow]

Because here's the truth: not all bugs will be caught with testing. Some only emerge with real traffic — the load and timing we never reproduced. Others show up only with real data — the messy, edge-case records our test data never had. And a few surface only with real users, clicking on things we never thought possible! Our tests run against our assumptions; production runs against the world.

[slideshow]

The first way we catch them early is a gradual rollout. Instead of shipping to everyone at once, we let a change move through stages. It clears deployment, then it sits in staging, where it runs like production but without real users. Then a canary release — we put the new version in front of a small slice of traffic, or a group of early users, and we watch. If something goes wrong, it surfaces here, affecting a few people instead of everyone. And only once it's tested, does it reach full production. Every stage is one more chance to catch the problem before it's everywhere.

[slideshow]

But a rollout only helps if we're watching, so we observe the running system. We read the logs, for the errors and warnings the code is emitting. We track error rates — a sudden spike right after a release is a loud, early signal. We watch performance against a baseline, so we notice when a change quietly makes things slower. And we listen for user feedback — even something as simple as an NPS score or an active community in Slack can tell us something's off before our own metrics do.

[slideshow]

Now, that's a lot of signal — and this is where AI helps, because it's remarkably good at interpreting telemetry. It can summarize and group thousands of log lines into the handful of things actually going wrong. It can compare one release against the last and tell us what changed. It can search the git history to connect a new error back to the commit that likely caused it. And it can highlight unusual patterns we'd never catch by eye. It turns a wall of data into a short list of things to look at.

[slideshow]

Mistakes happen — what matters is how we react to them. Safe refactoring was never about never breaking anything. It's about keeping our changes small, our signals clear, and our reaction fast. When we can see a problem early and undo it calmly, a regression stops being a disaster and becomes just another thing we handle.

---

## Notes for Eva

- **Word count (spoken, slides only):** 499 words ≈ 3:34 at your 140 wpm pace — comfortably inside the ~4-min target. Slides-only clip, no demo.
- **Safest cut if running long:** slide 3's stage-by-stage walk can compress to the bare sequence ("deployment → staging → canary → production"), keeping just the canary sentence — recovers ~30 words. Slide 2's three "real X" elaborations are the next trim.
- **Thread to lean into:** "mistakes happen — what matters is how we react." Plant it on slide 1 ("notice quickly, react when we do"), carry it through the three layers (rollout catches it → observing surfaces it → AI interprets it), and land it on slide 6. The one word doing the work is **react**.
- **Clip independence:** slide 1 lists good practices generically ("we can do everything right — small changes, tests, checks") rather than "earlier we did X," so it stands alone; the close is a thematic module wrap, not a reference to other clips. No cross-clip references.
- **Demo:** none — the deck has no demo slide for this clip, so it's continuous narration.
- **Swappable reference:** "NPS" (slide 4) is just one example of a user-feedback signal — swap for support tickets, reviews, or community chatter if that reads better. No names or code references in this clip.
