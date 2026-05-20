\[slideshow\]

Let's plan our modernization work so we can ship changes safely without breaking the systems we are trying to improve.

\[slideshow\]

Large refactors fail when teams change too much before they understand the risk. The biggest failures usually do not come from bad code — they come from changing too much, too fast.

This usually happens because

The changes are too broad. We touch dozens of files and multiple modules, and suddenly the diff is impossible to reason about.

Second, those huge pull requests are extremely hard to review. Hidden dependencies appear that nobody anticipated, and the team cannot easily tell what is intentional and what is accidental. A 8 thousand lines of code PR that touches 200 files will sit unreviewed for weeks.

Third, the team loses the ability to roll back quickly. When something breaks, we cannot find the change that caused it. Behavior changes unintentionally, and we are stuck debugging in production.

\[slideshow\]

So what is the alternative? Small, reversible steps. The safest refactor is usually a series of small refactors. Each step isolates concerns, reduces blast radius, and keeps a rollback option open.

\[slideshow\]

Consider a plan like this: "migrate the entire frontend to React 19 by next sprint."

That kind of instruction usually ends one of two ways — a missed deadline, or a rollback three weeks later, when the team realizes the React 19 changes also broke a bunch of unrelated features.

\[slideshow\]

Instead, let’s approach this differently. First, we create a plan. Then migrate one component at a time. Each component’s change becomes a self-contained work that we can ship, review, validate, and revert independently, without affecting anything else.

\[slideshow\]

So let's talk about that plan. A good refactor plan has six pieces.

Scope — what exactly is changing? We want a precise definition, not "modernize the dashboard."

Dependencies — what systems and modules are affected? What else gets pulled along when we change this?

Risk areas — what could break? Which paths are critical, and which are fragile?

Safety mechanisms — what validates the current behavior? Tests, monitoring, type checks.

Rollback strategy — how do we revert safely if something goes wrong?

And finally, incremental milestones — what are the smallest deployable steps? We want each milestone to be small enough to ship and to roll back independently.

\[demo time\]

Let's build a refactor plan together, using AI to help us through each of these six pieces.

Notice we're not starting from zero. The AI inherits context from the AGENTS file we created earlier — so when we ask for a refactor plan, it already knows what this app is and where the design system sits.

\[Demo (\~1 minute) — building a refactor plan with AI. Not scripted.\]

\[back to slides\]

Now we have a plan. But a plan is only as safe as the tests that protect it. We cannot refactor with confidence when we do not actually know what the code should be doing.

Before we touch a single line, we want to find the gaps — low test coverage, fragile tests, untested edge cases, and missing validations.

Let's use AI to identify those gaps in our example codebase.

\[Demo (\~1 minute) — identifying missing coverage with AI. Not scripted.\]

\[back to slides\]

As you can see, AI accelerates refactoring, but it does not replace validation.

AI-generated tests can miss edge cases. We have all seen this pattern many times — the AI generates a test, it passes, the coverage number goes up, and nobody notices that the test would pass whether the underlying logic works correctly or not.

So two things stay non-negotiable. Human review is essential. And CI/CD checks remain required. AI is a fast collaborator, not a replacement for the safety net we already rely on.

\[slideshow\]

Remember, safe modernization is incremental. AI works best when we combine it with small changes, strong validation, and continuous feedback.

And here is where AI genuinely helps us reduce risk. It can map the scope of a change, identify missing coverage, generate safety nets like initial unit tests, and help us plan smaller iterations.

Take some time to sketch out a refactor plan for a piece of your codebase using these six steps. The plan itself is the first safety net.