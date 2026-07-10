# Clip 2: Measuring Refactoring Success — Script Draft

**Total clip duration:** ~3:25 min (slides only) — **Demo portion:** none (this clip is slides only) — **Spoken slide budget:** ~3:25 min (478 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational; audience = tech leads & engineering managers (this final module) — **Threaded thesis:** *if we can't measure the improvement, we can't justify the investment — so we turn refactoring into evidence, and communicate the return* — **Outline coverage status:** all slide bullets covered (the five metrics; AI gathers signals from repositories / tickets / CI-CD; AI generates reports / summaries / dashboards); no demo.

---

[slideshow]

Let's talk about measuring refactoring success. Here's the uncomfortable truth for anyone who's ever had to defend this work: if we can't measure the improvement, it's very hard to justify the investment. Modernization competes with features for time and budget, and "the code is cleaner now" doesn't win that argument. So if we want to keep investing in the health of our codebase, we need evidence — numbers that connect the work we did to outcomes the business recognizes.

[slideshow]

So let's measure what actually matters. Not "the code looks prettier now" — that's a feeling, not a result. We want technical and business outcomes we can point to. Delivery speed: are we shipping changes faster than before? Defect rates: are fewer bugs reaching production? Migration progress: how much of the old pattern is actually gone — twenty percent, eighty? Dependency reduction: fewer libraries to patch, fewer things that can break, fewer things to maintain. And performance: is the app measurably faster for the people using it? Each of these is a number we can track over time — and a number is something a stakeholder can act on.

[slideshow]

Gathering all of that used to be the hard part — it's scattered across a dozen places. This is where AI earns its place, because it remembers and searches faster than any of us. It can pull signals straight from the repositories — how much of the old pattern is left, and how, for example, the dependency count has changed over time. From the tickets — how many bugs, and how long they take to close. From the CI/CD pipeline — build times, test coverage, failure rates. And from whatever else we already track — production error rates and latency from our monitoring tools, incident counts and time-to-recovery, even the cloud bill. The data was always there; AI just makes gathering it cheap.

[slideshow]

And once it has the signals, AI can turn them into something we can actually share. Migration reports that show how far a modernization effort has come. Stakeholder summaries that translate the engineering work into business terms. Progress dashboards we can keep an eye on — velocity of delivery, pull requests merged, regressions caught. One caution worth holding onto: measure team outcomes and customer value, not individual output. The moment a number becomes a way to rank people, like how many PRs this or that engineer made — it stops telling us the truth.

[slideshow]

Because in the end, our job here is to communicate the return on the investment. What improved, what still remains, and what's next. When we can show a stakeholder the before and the after — backed by real data, not vibes — modernization stops looking like a cost the team keeps asking for, and starts looking like the investment it actually is. And that's what keeps the green light on modernization.

---

## Notes for Eva

- **Word count (spoken, slides only):** 478 words ≈ 3:25 at your 140 wpm pace. Slides-only, no demo. Still a little headroom to ~4:00 — the natural place to add is a concrete before/after example on slide 5 (e.g. "build went from nine minutes to three"). (Re-verify with a tool after edits.)
- **Audience lens (tech leads / EMs):** the whole clip is built around defending the budget — "competes with features for time and budget," "something a stakeholder can act on," "the investment it actually is," "keeps the green light on modernization." That's the hook for this audience: modernization survives when it's legible to whoever funds it.
- **The metrics caveat (slide 4):** dashboards are narrated at team level ("pull requests merged"), and the "PRs per engineer" idea from the deck note now appears explicitly as the *anti-pattern* to avoid ("the moment a number becomes a way to rank people… it stops telling us the truth"). That's the right use of it for a leadership audience — the Goodhart warning, not a metric to adopt.
- **Thread to lean into:** measure → justify → communicate the return. Plant it on slide 1 ("can't measure it, can't justify it"), and land it on slide 5 ("communicate the return on the investment"). The keyword is **evidence**.
- **Clip independence:** opens on its own topic (not a module opener), and never points at a sibling clip — stands alone for anyone landing here cold.
- **Demo:** none — the deck has no demo slide; continuous narration.
- **Swappable reference:** the five metrics are examples — swap for whatever your org already tracks (lead time, change-failure rate, MTTR, etc.) if those land better with your stakeholders.
