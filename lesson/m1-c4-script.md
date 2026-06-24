\[slideshow\]

Let's plan our modernization work so we can ship changes safely without breaking the systems we are trying to improve.

\[slideshow\]

Large refactors fail when teams change too much before they understand the risk.

This usually happens for three reasons

First, the changes are too broad. We touch dozens of files and multiple modules, and suddenly the diff is impossible to reason about.

Second, those huge pull requests are extremely hard to review. Hidden dependencies appear that nobody anticipated, and the team cannot easily tell what is intentional and what is accidental. An 8-thousand lines of code PR that touches 200 files will sit unreviewed for weeks.

Third, the team loses the ability to roll back quickly. When something breaks, we cannot find the change that caused it. Behavior changes unintentionally, and we are stuck debugging in production.

\[slideshow\]

So what is the alternative? Small, reversible steps. The safest refactor is usually a series of small refactors. Each step isolates concerns, reduces blast radius, and keeps a rollback option open.

\[slideshow\]

Consider a plan like this: "migrate the entire frontend to React 19 by next sprint."

That usually ends in a missed deadline, or a rollback weeks later when unrelated features break.

\[slideshow\]

Instead, let’s create a plan and migrate one component at a time — each change shipped, reviewed, and reverted independently.

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

On our front-end application, we want to migrate some of our bootstrap components into our own library. In order to do that, we will first ask Gemini Code Assist to build a bootstrap inventory markdown file that lists every bootstrap usage in our repository. The file path, the components, and whether we have a design system equivalent or not. And we will ask it to group the results by component.

Once it finishes, it looks like this. Our inventory begins listing the components that are part of our own design system. Buttons, cards, badges and inputs and then it lists all the bootstrap entry points and it tells us whether those have an equivalent on our design system or not.

At the end of the inventory, it mentions that there are some gaps that are blocking a full bootstrap removal. Some components we use from bootstrap are not a one-to-one match with the components in our own design system.

But there is one that we can definitely migrate, which is the badge component. The badge component mentions no feature gaps. Therefore we could migrate it straight away.

So let's ask our AI assistant to use this bootstrap inventory to create a migration plan. We can link the file as a context so our AI assistant can find it faster. As we have talked about, the plan will follow the six sections we just walked through.

We will also clarify that phase one will remove all the bootstrap badges usage from the app and that it will use the design system component instead.

The most interesting part of the refactor plan that our AI assistant created is the risk areas. This is where our AI assistant tells us that there will be a visual difference between the bootstrap badge and the one that we have in our library. In this case it's OK because what we want is our design system badge to be the one that is being used.

When it comes to safety mechanisms, not only it talks about visual inspection, but also, about component tests, letting us know that we will need to retrain the User Row test once we migrate our component.

Since this is a simple migration, the rollback strategy is pretty simple as well. We could do a git revert as long as we make granular commits.

At the end, it mentions that this is part of a larger investment in removing bootstrap and this is only phase one.

One thing that I always recommend whenever we are about to implement a refactor is to verify the current coverage that we have. Even if the previous agent told us that there was some coverage, it is always important to validate with a new, different, agent. We cannot refactor with confidence when we do not actually know what the code should be doing.

In this case the agent tells us that the user row component has some coverage but not direct coverage for the status badge class. So let’s ask our AI agent to help us create coverage for the current implementation before we dive into the migration.

Once the coverage is ready, we are ready to begin our migration. We will ask Gemini code assist to implement Phase 1 of the migration plan.

It’s done now\! Let’s take a look at the code. It has modified our components to use the Design system badge instead of the bootstrap classes.

When we run it, we can see the different styles that indicate that this has worked correctly.

\[back to slides\]

AI accelerates refactoring, but it does not replace validation.

AI-generated tests can miss edge cases — sometimes a test passes and coverage goes up, but it is written in a way that it would have passed whether the underlying logic works correctly or not.

So two things stay non-negotiable. Human review is essential. And CI/CD checks remain required.

\[slideshow\]

Remember, safe modernization is incremental.

Take some time to sketch out a refactor plan for a piece of your codebase using these six steps. The plan itself is the first safety net.