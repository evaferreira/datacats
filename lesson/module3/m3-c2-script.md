# Clip 2: Choosing the Right Refactor Strategy — Script Draft

**Total clip duration:** ~4:05 min — **Demo portion:** none (discussion / comparison clip — all slides) — **Spoken budget:** ~4:05 min (579 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *there's no single right strategy — we understand the system first, then match execution to its behavior* — **Outline coverage status:** all slides covered, including the continuous-cleanup (Boy Scout) vs dedicated-migration contrast, active vs dormant, ownership models, and release cadence.

---

[slideshow]

Let's talk about choosing the right refactor strategy. When we take on a large change, the first question isn't how to write the code — it's how change actually moves through the system. We need an execution model before we touch anything.

[slideshow]

And here's why that matters: not all systems absorb change the same way. The same migration that's a quick afternoon in one codebase is a three-month coordination effort in another. And the right strategy depends on the system in front of us.

[slideshow]

That comes down to two factors. The first is change capacity — how much change the system can take on right now. The second is coordination cost — how many people and moving pieces have to align for that change to land. Those two factors decide the strategy.

[slideshow]

Let's look at change capacity first. A system with low change capacity is one that is shipping daily, in which the team has limited engineering time, and there's always another customer deadline on the calendar — there's no room for a big migration. A system with high change capacity is the opposite: there's a dedicated migration window, engineers have time to invest in it, and the release cadence is slower. High capacity means we can take on more at once.

[slideshow]

Activity level also matters greatly. A dormant system has few commits, stable ownership, and a wide-open migration window — we can change it freely, because nothing else is moving. An active system has daily changes, multiple teams in the code, and constant merge pressure — every day we spend migrating is a day the ground shifts under us. So dormant systems usually give us high capacity; active ones, low.

[slideshow]

But capacity alone doesn't tell us how hard a change will be. That's why the second factor to look for is coordination cost.  Low coordination cost looks like one team, clear ownership, an isolated module we can deploy on its own — think a single-page application the team owns end to end. High coordination cost looks like multiple teams, shared libraries, cross-service dependencies, and releases that have to be synchronized. The more coordination a change demands, the more expensive each change becomes.

[slideshow]

With those two factors together, we get a strategy selector. Quick reminder before we read it: low coordination makes each change cheap, and capacity decides how much we can take on at once.

When changes are cheap and capacity is low, that's continuous cleanup — also known as the Boy Scout Rule, leaving each file a little better than we found it. A cheap change with high capacity means continuous and opportunistic work: gradual modernization while we're already working in that part of the code.

Expensive changes with low capacity call for a hybrid strategy — standards have to be set centrally, then rolled out incrementally. An expensive change with high capacity means a dedicated effort: a migration initiative with coordinated execution.

So the real choice is between improving continuously as we go or setting up a dedicated program — and the system tells us which one fits.

[slideshow]

In practice, most real refactors land in the middle — a blend of these strategies. We plan centrally, create a couple of examples, let teams adopt them incrementally, and retire the old patterns as we go.

[slideshow]

So there's no single right strategy. We match execution to the behavior of our system — its capacity, and its coordination cost. Understand the system first, then choose the strategy that fits.

---

## Notes for Eva

- **Word count (spoken):** 579 words — roughly 4:05 at your 140 wpm pace. No demo, so this is the whole clip. Slightly over 4:00 by design — clarity is the priority (the slide-7 anchor and the slide-6 SPA example earn their keep).
- **Safest cut if running long:** clarity's the priority, so no cut is really needed — but if you must, slide 6's closing line ("The more coordination a change demands, the slower it has to go.") is the most expendable (~12 words / ~5s); the low- vs high-coordination examples above it already make the point.
- **Thread to lean into:** "match the strategy to the system." Plant it on slide 2 ("not all systems absorb change the same way"), pay it off on slide 7 ("the system tells us which one fits"), and land it on slide 9 ("understand the system first, then choose the strategy that fits"). Lean on "capacity" and "coordination cost" as the two recurring words.
- **Outline distinctions to hit clearly:** the Boy Scout Rule (continuous cleanup) versus a dedicated migration effort (coordinated execution) is the outline's headline comparison — both are named on slide 7; don't blur them if you ad-lib. Active vs dormant (slide 5), ownership (slides 5–6), and release cadence (slides 4–5) all need to stay in.
- **Clip independence:** slide 1 frames "we need an execution model" as a standing idea, not "after the scale clip." Keep it that way so this stands alone for anyone landing here cold.
- **Swappable reference:** "the Boy Scout Rule" is the one named concept — it's standard, but if your audience might not know it, the slide 7 line already defines it inline ("leaving each file a little better than we found it").
