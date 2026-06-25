# Clip 4: Design Debt and Consistency Audits — Script Draft

**Total clip duration:** ~5:15 min — **Demo portion:** ~3:00 (narrated live, not scripted here) — **Spoken slide budget:** ~2:10 min (307 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *design debt is real debt — it costs engineers and users alike, and we pay it down with consistency, not a rewrite* — **Outline coverage status:** all slide bullets covered (engineer cost, user cost, the front-end quote, audit of color/font/spacing, tokens + incremental migration); demo intentionally unscripted.

---

[slideshow]

Let's talk about design debt and consistency audits. We usually think of technical debt as ones and zeroes — but not all debt is about logic. Design debt is just as real as an old API endpoint we wish to retire.

[slideshow]

Design debt costs us twice. First, the engineering cost: inconsistency makes maintenance harder. We end up with duplicated components and no single source of truth. When there are six blues and four button styles, which one is the real one? Every change means hunting for the right pattern.

[slideshow]

Then, there's the user cost — the one we tend to forget. Inconsistent interfaces are harder to learn: if the primary action is on the left on one screen, and on the right on the next one... that will be a hard pattern to pick up. That friction lowers the perceived quality of the product, and over time, it erodes trust.

[slideshow]

Remember, the front-end is the way we introduce ourselves to our users. They'll never say "the spacing is inconsistent" — but they feel the friction. The interface is the visible face of our engineering quality, and design debt quietly chips away at the trust users place in us.

[slideshow]

So how do we pay it down? With design tokens, in three steps. First, inventory — find the inconsistencies, and the dominant patterns we already have. Second, define the tokens: a spacing scale, a type scale, and a color system. And third, replace incrementally — swapping hardcoded values for tokens a little at a time, never in one big rewrite.

[slideshow]

Let's run a design audit!

[demo time]

<!-- Demo not scripted — narrated live over the screen recording. Outcome: a design audit that surfaces an existing-but-unadopted token system, plus a consolidation proposal (audit & propose, NOT a full migration). Full brief: lesson/09-m3-c4-design-consistency.md.

     KEY: main.css :root ALREADY defines the tokens (--dc-primary, --dc-spacing-*, --dc-font-sm). The debt is
     non-adoption — so the story is "adopt what we already have," not "invent a system." (It's --dc-*, not --dp-*.)

     Beats:
       1. (~1 min) COLORS. Find every unique color hex across the CSS (main / dashboard / users / reports / settings.css)
          and inline styles. Group the near-duplicates — 7 blues, almost all meant to be --dc-primary, which already exists.
       2. (~1 min) FONTS + SPACING. Font sizes: 10+ distinct, with near-misses like 0.925rem / 0.975rem around
          --dc-font-sm (0.875rem). Spacing in three forms: raw px, rem, and var(--dc-spacing-*) — used in ONLY
          settings.css. Inline offenders: MetricsCard.jsx, Sidebar.jsx, TopBar.jsx, UserRow.jsx.
       3. (~45s) CONSOLIDATE. AI surfaces that main.css already has the tokens and they're barely used — propose
          consolidating onto them and filling the gaps, not inventing a new system.
       4. (~15s) ONE-FILE PROOF. Swap one hardcoded value for the existing token in a single file — e.g. #2563eb →
          var(--dc-primary), or 16px → var(--dc-spacing-md). The pattern, not the sweep.

     Voiceover thread: "We're standardizing onto the tokens we already have, not redesigning."
     Watch: audit & propose only — no full migration this clip.
-->

[back to slides]

And there's our audit, with a token system we can now grow. The goal isn't a perfect design system on day one — it's consistency before perfection. Fewer patterns mean less to maintain, faster changes, and an interface that finally feels trustworthy to use.

---

## Notes for Eva

- **Word count (spoken, slides only):** 307 words — roughly 2:10 of slide time at your 140 wpm pace. Paired with a ~3:00 demo, the clip lands around 5:15.
- **Safest cut if running long:** on slide 4, drop the middle sentence ("They'll never say 'the spacing is inconsistent' — but they feel the friction.") — ~13 words / ~6s. The quote and the "visible face of engineering quality" line still carry it.
- **Thread to lean into:** "design debt costs us twice" → "consistency before perfection." Name the dual cost on slide 2 (engineers) and slide 3 (users), pay it off on slide 4 (users feel it), and land "consistency before perfection" in the close. Lean on the word "consistency."
- **Clip independence:** nothing points at sibling clips — the demo is framed as "audit and propose," and the close talks about incremental migration as a principle, not "the migration clip." Keep it that way so this stands alone for anyone landing here cold.
- **Demo note:** the `[demo time]` comment holds the four beats (colors → fonts+spacing → propose tokens → one-file proof) and the "standardizing, not redesigning" thread — narrate those live; full detail is in `lesson/09-m3-c4-design-consistency.md`. Audit & propose only — no full migration on camera.
- **Swappable reference:** none — no names or external specifics in the spoken copy.
