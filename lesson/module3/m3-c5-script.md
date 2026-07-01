# Clip 5: Using AI for Example-Driven, Repetitive Migrations — Script Draft

**Total clip duration:** ~4:10 min (speaking time) — **Demo portion:** ~2:21 (recorded; voiceover transcribed below — 341 words at Eva's 145 wpm demo pace) — **Spoken slide budget:** ~1:49 min (255 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *AI scales whatever pattern we hand it — good or bad — so we standardize first: two examples and a contract before we scale* — **Outline coverage status:** all slide bullets covered (repetition/inconsistency/effort, the contract's rules/constraints/patterns, "bad patterns scale," examples reduce ambiguity / contracts reduce risk / AI executes); demo intentionally unscripted.

---

[slideshow]

Let's talk about using AI for example-driven, repetitive migrations.

[slideshow]

Large migrations eventually turn repetitive. When we make that change by hand, file after file, inconsistencies creep in — and the more we scale, the more effort it takes. But proven patterns can help us automate it — once we have a pattern that works, that repetition is exactly the kind of work AI can take on.

[slideshow]

We do that safely with a migration contract. It includes three things: the rules of the transformation, its constraints, and the patterns to follow. For example, it might say to apply the approved patterns, follow the examples, and preserve behavior, accessibility, and tests. The point is to teach the pattern before we scale it.

[slideshow]

One very important note before we dive in: bad patterns scale just as well as good ones. AI will apply whatever we hand it across every file, fast — so a sloppy pattern becomes sloppy everywhere. The contract is how we make sure it's the good version that scales.

[slideshow]

So let's migrate at scale.

[demo time]


This old front end repository has a lot of class components and our goal today is to migrate class components to functional ones. We have a few examples like activity feed and metrics card which we have already migrated. Claude will have access to the commit history, the before and after for those two files. That will be a great tool for our mass migration of components.

So let's open a new chat session and ask our AI agent to write a migration contract based on these two examples. Let’s ask it to focus on a 1:1 conversion that preserves behavior, accessibility and tests, just like those two files were previously migrated.

We will ask it to go through all the remaining class components and categorize their migrations as either simple, medium, or complex, explaining the choice.
As part of the research, the AI agent will go into the commit history to review the before and after of those files we have submitted as examples.

Once it’s done, it quickly reviews its work. It tells us which rules it followed and how it applied the categories.

Let’s take a look at the contract. As you can see, it goes into detail on how to approach each class method and transform it into a React hook for the functional component. At the end, it mentions a verification checklist and it lists all the files that can be migrated. It also includes a special note about the only file that was categorized as complex, and the reason why.

So, let’s get started! Let’s begin with the migration of all the simple ones. Once it finishes, don’t forget to ask the agent to update the migration contract, so we can track the work.

And this is something we can actually run as a team — because the contract locks in the pattern, we split the work between teammates, each following the same contract, and still get one uniform migration. The components we left out of this batch simply become follow-up PRs anyone can take.


[back to slides]

To recap: examples reduce ambiguity — they show exactly what "done" looks like. The contract reduces risk — it pins down the rules so every file comes out the same. And AI executes that proven pattern across all of them.

Git history is one of the best tools for this — the before-and-after of each reviewed migration lives in the commits, so the AI can see exactly how the pattern was applied. Standardize first, and the repetition becomes the easy part.

---

## Notes for Eva

- **Word count (spoken):** slides 255 words (~1:49 @140 wpm) + demo voiceover 341 words (~2:21 @145 wpm) = **~4:10 total speaking time**. The raw video runs longer — agent-thinking pauses aren't speaking time; check the recorded length if you need the true clip duration.
- **Safest cut if running long:** the slides are lean (~1:49) and the demo is the long pole, so no cut is really needed. If you must, slide 2's "file after file" aside trims a beat.
- **Thread to lean into:** "bad patterns scale as well" → "standardize first." The fulcrum is slide 4 — let it land as a beat. Reinforce with "teach the pattern before we scale it" (slide 3) and close on "standardize first, and the repetition becomes the easy part." Lean on the word "contract."
- **Clip independence:** the spoken slides don't name the example components or the eight files — those live in the `[demo time]` note and get named live during the demo. Nothing references sibling clips. Keep it that way so this stands alone.
- **Demo note:** the `[demo time]` comment holds the planned beats (derive → scale → verify → capture, plus a note on follow-up PRs off the contract), the UserFilters exclusion, and the "contract becomes a skill, skill becomes a habit" voiceover; full detail is in `lesson/10-m3-c5-example-driven-migration.md`. **As recorded, the scale pass migrated the simple set only** (not the full simple+medium eight the note plans) — the medium files fold into "the next batch" the closing line hands off as follow-up PRs. Branch prep (MetricsCard migrated, MetricsSummary cleaned, QuickStats deleted) is already done.
- **Swappable reference:** none — no names or external specifics in the spoken copy.
