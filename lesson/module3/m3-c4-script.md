# Clip 4: Design Debt and Consistency Audits — Script Draft

**Total clip duration:** ~5:44 min (recorded) — **Demo portion:** ~3:38 (recorded; voiceover transcribed below — 527 words at ~145 wpm) — **Spoken slide budget:** ~2:06 min (295 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *design debt is real debt — it costs engineers and users alike, and we pay it down with consistency, not a rewrite* — **Outline coverage status:** all slide bullets covered (engineer cost, user cost, the front-end quote, audit of color/font/spacing, tokens + incremental migration); demo recorded and transcribed below.

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

Our front-end application looks like this. We have a few pages with dashboards and tables, and a bunch of common components like buttons, inputs, badges and links.

First thing we are going to do is audit the CSS and inline styles across the whole front-end for design consistency. We want to know how many distinct colors, font sizes and spacing values we are actually using. We will ask our AI agent to group the near duplicates. For example, if we have two blues that are almost exactly the same, we want to merge them. Then we also want to know if we already have design tokens, and if we do, we want to know how consistently they are being used.

This will take a couple of minutes because it will go through all our codebase. At the end, Claude asks what we want the plan to be: a full migration, just consolidating the duplicates, expanding the tokens, or simply an informational audit. In this case, we'll ask it to build a plan for a full migration — an expanded token system that replaces the hardcoded values and inline styles we have today. It is the biggest effort, but it will be worth it, since it creates a single source of truth.

Once done, it does the breakdown of its findings. For example, we have 27 distinct values for 10 intended color roles. This means that our primary blue, for example, has five near identical blues, and only one of them is tokenized. This means we could merge them all into one blue, and make that our main token. Similar things happen with our light or accent blues, our muted grays and the colors for success or danger. These can all be merged together, improved and tokenized.

Next it moves into font sizes, and it tells us a very similar story about how we use different sizes and different units. Sometimes we mention pixels, sometimes EMs or R.E.M.s — and the same thing with the spacing, which looks like it's a little bit cleaner, but not enough. So, let's open our plan and take a look.

It begins with a breakdown and then it proposes an approach.
It is broken down into different steps. Step 1 is to reconcile and expand the token set in the root. Steps 2 and 3 modify the hardcoded values — first in the CSS files, then in the inline styles. Step 4 collapses the competing sources of truth, so we only have one. And Step 5 adds a guard against regressions — a style-lint rule that flags any raw hex value in CSS or inline styles, so no one can reintroduce literals.

Let's also ask Claude to add a final step that updates our CLAUDE.md or agents file, so our coding agents know about this new rule too.

And that's our plan — a complete, staged migration. From here, we could take it one step at a time: start with steps 1 and 2, and review each change on its own before moving on. The audit and the plan are the real deliverable; the migration itself can happen incrementally, whenever we're ready.

<!-- Demo recorded — voiceover transcribed above. The video ends on the PLAN (execution trimmed):
     audit → findings breakdown (colors / fonts / spacing) → a full-migration plan (5 steps, incl. a stylelint
     guard + a CLAUDE.md note step) → trimmed before "accept" → hand off to incremental execution. So this stays
     "audit & propose," and the thesis ("consistency, not a rewrite") + slide-5 "never one big rewrite" hold.

     Verified code facts: main.css :root ALREADY defines the --dc-* tokens (--dc-primary #2563eb, --dc-spacing-md 16px,
     --dc-font-sm 0.875rem); the debt is non-adoption, not absence. #1d4ed8 is reused for both --dc-primary-hover and
     --dc-info-fg (a real "competing sources of truth" case → Step 4). Full brief: lesson/09-m3-c4-design-consistency.md.

     NUMBERS CAVEAT: the on-screen counts in the narration (27 distinct values / 10 color roles / 5 near-identical blues,
     one tokenized) are screen-sourced and pre-date the C5 cleanup (MetricsSummary tidied, QuickStats deleted, MetricsCard
     migrated). Current code has only 19 distinct hexes and inline blue is down to just #2563eb — so these can't be
     re-derived from code; confirm they match the video. -->

[back to slides]

The goal isn't a perfect design system on day one — it's consistency before perfection. Fewer patterns mean less to maintain, faster changes, and an interface that finally feels trustworthy to use.

---

## Notes for Eva

- **Word count:** slides 295 words ≈ 2:06 (140 wpm); demo voiceover 527 words ≈ 3:38 (145 wpm). Total ≈ 5:44 — still the longest clip in the module. Confirm against the actual recorded demo length (the video may run longer with on-screen AI time, but you trimmed the execution tail).
- **Safest cut if running long:** the demo voiceover is the long pole (≈3:38); the worst run-ons are already tightened. If you need more, slide 4's middle sentence ("They'll never say 'the spacing is inconsistent' — but they feel the friction.") drops ~13 words / ~6s on the slide side.
- **Thread to lean into:** "design debt costs us twice" → "consistency before perfection." Name the dual cost on slide 2 (engineers) and slide 3 (users), pay it off on slide 4 (users feel it), and land "consistency before perfection" in the close. Lean on the word "consistency."
- **Clip independence:** nothing points at sibling clips — the demo is framed as "audit and propose," and the close talks about incremental migration as a principle, not "the migration clip." Keep it that way so this stands alone for anyone landing here cold.
- **Demo note:** recorded — voiceover transcribed inline under `[demo time]`. The video ends on the **plan** (you trimmed before clicking "accept"), so it stays *audit & propose*: audit → findings → a full-migration plan → hand off to incremental execution. The reconciled comment and the numbers caveat live in the `[demo time]` block; full brief: `lesson/09-m3-c4-design-consistency.md`.
- **Swappable reference:** none — no names or external specifics in the spoken copy.
