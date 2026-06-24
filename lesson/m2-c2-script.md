# Clip 2: Improving Maintainability — Script Draft

**Total clip duration:** ~5:00 min — **Demo portion:** ~3:00 (two migrations, narrated live, not scripted here) — **Spoken slide budget:** ~1:55 min (~265 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *maintainability work is incremental — small, reversible steps, and AI does the translation (and catches bugs along the way)* — **Outline coverage status:** all slide bullets covered (slides 1–4 and 6; demo intentionally unscripted)

---

[slideshow]

Let's talk about improving maintainability so we can make a legacy codebase easier and safer to work in over time.

[slideshow]

Once we have a migration audit — a prioritized backlog of the components we could migrate, the architectural debt, and the dead code worth cleaning up — it's time to start working that backlog. An audit only pays off when we act on it.

[slideshow]

And the way we work it is incremental. We migrate one component at a time. Each migration is small enough to review and ship on its own, and small enough to revert on its own if something goes wrong. We're not modernizing the whole app in a single pull request — we're taking small, reversible steps, and starting with the easiest items on the list.

[slideshow]

Let's start with one of the most common maintainability wins: migrating a React class component into a functional one. The goal isn't just newer syntax. We want to improve readability, clean up our naming, and remove duplication so we can follow the DRY principle — don't repeat yourself. And because AI reads the whole file as it translates, it will often flag things that look wrong along the way — bugs that have been sitting there for years. So let's take a look at how this works in practice.

[demo time]

<!-- Demo not scripted — narrated live over the screen recording. Reads MIGRATION_AUDIT.md; updates it at the end.

     Note to self (demo shape — Option C from the brief): two migrations back-to-back, ~3 min.
       1. MetricsCard — the teaching migration. Walk the mapping out loud:
          constructor/this.state → useState, componentDidMount → useEffect([]),
          componentDidUpdate → useEffect([deps]), this.formatValue → local function. Behavior identical.
       2. UserFilters — the payoff. AI catches onFiltersChange called inside render() (render-loop bug,
          UserFilters.jsx:28-31). Pre-decide on camera which fix to accept: useEffect([filters]) vs. event handler.
     Watch for: AI may suggest React.memo — defer that to the performance clip.
-->

[back to slides]

Once those first few migrations are done, let's go back and update the migration audit and cross off what we've finished. The audit is a living document, not a one-time deliverable. Every time we work an item, we update it, so it always reflects what's left to do.

---

## Notes for Eva

- **Word count (spoken, slides only):** ~265 words — roughly 1:55 of slide time at your 140 wpm pace. Pairs with a ~3:00 two-migration demo for a clip around 5:00.
- **Demo not scripted:** the `[demo time]` note-to-self block holds the migration order and the bug-catch beat from the brief — name those out loud while narrating, they aren't in the spoken slide copy.
- **Thread to lean into:** "incremental" and "small, reversible steps" (slide 3), landing on "living document" in the close. The through-line is that maintainability is worked one safe step at a time, not done all at once.
- **Clip independence:** slide 2 re-states what a migration audit is in its own words rather than pointing back at the previous clip — keep it that way if you ad-lib, so the clip stands alone for anyone landing here cold.
- **Safest cut if running long:** in slide 4, drop the DRY gloss ("so we can follow the DRY principle — don't repeat yourself") down to just "and remove duplication." Recovers ~10 words without losing the beat.
