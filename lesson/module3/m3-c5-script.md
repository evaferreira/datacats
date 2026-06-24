# Clip 5: Using AI for Example-Driven, Repetitive Migrations — Script Draft

**Total clip duration:** ~5:05 min — **Demo portion:** ~3:30 (narrated live, not scripted here) — **Spoken slide budget:** ~1:35 min (224 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *AI scales whatever pattern we hand it — good or bad — so we standardize first: two examples and a contract before we scale* — **Outline coverage status:** all slide bullets covered (repetition/inconsistency/effort, the contract's rules/constraints/patterns, "bad patterns scale," examples reduce ambiguity / contracts reduce risk / AI executes); demo intentionally unscripted.

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

<!-- Demo not scripted — narrated live over the screen recording. ~3.5 min. Outcome: MIGRATION_CONTRACT.md → scale 8 class components → verify → capture as a reusable skill. Full brief: lesson/10-m3-c5-example-driven-migration.md.

     Beats:
       1. (~1.5 min) DERIVE. Point AI at the two reviewed examples — ActivityFeed (setInterval → useEffect cleanup) and
          MetricsCard (ref-guarded effect preserving the filters refetch timing). AI writes MIGRATION_CONTRACT.md: mapping
          rules, DO/DON'T, constraints. Record up front: UserFilters is OUT of scope (notifies its parent in render()).
       2. (~1.5 min) SCALE. Migrate exactly these eight by name: MetricsSummary, ChurnCohortChart, ReportFilters,
          ReportTable, ApiKeyManager, TeamSettings, UserExportButton, UserTable. The explicit allowlist keeps UserFilters
          out — never fall back to "migrate all class components."
       3. (~45s) VERIFY. Run the tests (UserTable.test, UserRow.test). Audit shape: no extracted hooks, nothing renamed,
          no behavior "fixed." Spot-check ChurnCohortChart keys its effect on refreshKey (scalar); ReportTable / UserTable
          came out identical.
       4. (~30s) CAPTURE. Save the contract as .claude/skills/class-to-function-migration/SKILL.md — next batch is one command.
       5. Mention something about follow up PRs that me or our coworkers can take based on the contract and the migration checklist.

     Voiceover: "The contract was the asset, not the migration. Next time it's one command — the contract becomes a skill, the skill becomes a habit."
     Watch: 1:1 conversion (no hook extraction); preserve behavior (don't fix bugs); if short, drop TeamSettings and say so.
-->

[back to slides]

To recap: examples reduce ambiguity — they show exactly what "done" looks like. The contract reduces risk — it pins down the rules so every file comes out the same. And AI executes that proven pattern across all of them. Standardize first, and the repetition becomes the easy part.

---

## Notes for Eva

- **Word count (spoken, slides only):** 224 words — roughly 1:35 of slide time at your 140 wpm pace. Paired with a ~3:30 demo, the clip lands around 5:05.
- **Safest cut if running long:** the slides are already lean (~1:35) and the demo is the long pole, so no cut is really needed. If you must, slide 2's "file after file" aside trims a beat.
- **Thread to lean into:** "bad patterns scale as well" → "standardize first." The fulcrum is slide 4 — let it land as a beat. Reinforce with "teach the pattern before we scale it" (slide 3) and close on "standardize first, and the repetition becomes the easy part." Lean on the word "contract."
- **Clip independence:** the spoken slides don't name the example components or the eight files — those live in the `[demo time]` note and get named live during the demo. Nothing references sibling clips. Keep it that way so this stands alone.
- **Demo note:** the `[demo time]` comment holds the beats (derive → scale → verify → capture, plus a note on follow-up PRs off the contract), the 8-file allowlist, the UserFilters exclusion, and the "contract becomes a skill, skill becomes a habit" voiceover — narrate those live; full detail is in `lesson/10-m3-c5-example-driven-migration.md`. Branch prep (MetricsCard migrated, MetricsSummary cleaned, QuickStats deleted) is already done.
- **Swappable reference:** none — no names or external specifics in the spoken copy.
