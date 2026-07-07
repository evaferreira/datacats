# Clip 2: Git Discipline for AI Changes — Script Draft

**Total clip duration:** ~5:40 speaking time (recorded; voiceover transcribed below) — **Demo portion:** two demos (git-discipline commit split + worktrees parallelization), transcribed below — 387 words ≈ 2:40 at Eva's 145 wpm demo pace; instructor briefs in HTML comments under slides 6 and 8 — **Spoken slide budget:** ~3:00 min (419 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *Git isn't just version control — it's the safety net that keeps fast, AI-driven change reviewable, reversible, and recoverable; and AI assists in the workflow, not just the code* — **Outline coverage status:** all slide bullets covered; outline bullets (branching, focused PRs, conventional commits, rollback; AI splits diffs / drafts messages / summarizes PRs / suggests reviewers) land across slides 2 & 4 + demo 1; worktrees demo (slide 8) = two unrelated tasks in parallel.

---

[slideshow]

Let's talk about Git discipline for AI changes. When an agent can generate a large change in seconds, what keeps that speed safe is the discipline around it. Git isn't just version control — it's our safety net. It's what lets us move fast and still undo, review, and recover when something goes wrong.

[slideshow]

So why does Git matter so much here? It enables safe experimentation. It keeps our work reviewable, so a change is understood before it lands. It's reversible — if a refactor goes sideways, we roll it back. And it's recoverable — the history is there even when we slip. It's how we reduce risk.

[slideshow]

And all is based on one thing: a traceable history. Every change, who made it, and why.

[slideshow]

That history is only useful if we're disciplined about how we build it. There are three principles we need to follow. Keep changes small and isolated. Keep commits focused. And lean on peer review, ideally from whoever knows that part of the system best.

[slideshow]

Another great tool is to use Conventional commits. This is a lightweight convention that we can use on top of the commit message we usually write. Following a small, structured format.

[browser — conventionalcommits.org]

Each one opens with a type — feat, fix, refactor, chore, docs — and then a short description of the change.

This helps create a history that's readable at a glance, and one that tools can parse to generate changelogs or drive versioning.

[slideshow]

Here's where AI helps with the workflow itself, not just the code. After a long agent session, our working tree is often a jumble of unrelated changes. So let's look at how AI can bring that back under control — reading the diff, splitting it into focused commits with conventional messages, summarizing the pull request, and suggesting who should review it.

[demo time]


In my repository, I have three unrelated changes in a new branch. A change to a README, a clearer naming convention on the UserRow file and a new feature on our date utils file.


Let’s ask our AI agent for help creating meaningful commits for each one of these. I will mention that we want standard conventional commits and that it should carefully read the git diff to understand the changes.


It proposes 3 different commits: a feat for the date-utils feature, a refactor for the rename and a docs for the README improvements.


Let’s go ahead and ask it to create those three commits.


Once done, we can create a new pull request with those 3 commits, and… why not? Ask our agent to help us write a description for it. Whenever I do this, I make sure the description is written for human readers. Otherwise it drowns in details my coworkers don’t need — things they’d get just by reading the diff.


Now that the PR is ready, it’s time to ask for reviews! If you have a repository with many committers and a good history, GitHub will automatically suggest reviewers for you. This is great data because it will pick the users according to who has recently edited those files, so you will be able to quickly find your subject matter experts, in case you weren’t familiar with that piece of the code.


[slideshow]

There's one more piece of Git that's a quiet superpower when we work with agents: worktrees. A worktree lets us check out more than one branch at once, each in its own folder. That means that we can run parallel experiments without constant branch switching — no constant git stash nor pop needed.

[slideshow]

So let's put worktrees to work, running two unrelated tasks at the same time.

[demo time]

Here, I’m working on extending the Badge component to handle different sizes, and imagine that while I do this, I get a request to update the way we handle numbers so we can render Billions better.


Since I don’t want to stash my changes and interrupt my workflow, I will ask my AI agent to do this for me. I will ask it to work on this feature, but I will clearly state that I want it to do so in a worktree, and that we will name it the-billions-fix.


So, Claude makes the changes in a new worktree, and then I can ask it to commit and push the changes, so I can review them in the PR while I keep on working on my other updates.


Once you are done, don’t forget to clean your worktree with git worktree remove or… simply ask Claude to do so for you!

[slideshow]

So Git isn't just version control — it's our safety net. It's what makes fast, AI-driven change reviewable, reversible, and recoverable. And as we saw, AI assists in the workflow, not just in the code — helping us keep the history clean and run our experiments in parallel.

---

## Notes for Eva

- **Word count:** slides 419 words ≈ 3:00 @140 + demo voiceover 387 words ≈ 2:40 @145 = **~5:40 speaking time** (recorded; voiceover transcribed below). Excludes the HTML-comment briefs. Slide 5 (Conventional commits) includes a brief screen-share of conventionalcommits.org.
- **Safest cut if running long:** slide 2's four reasons can compress to a bare list ("safe experimentation, reviewable, reversible, recoverable — that's how we reduce risk"), recovering ~35 words / ~15s. Slide 1's open is the next most trimmable.
- **Thread to lean into:** "safety net" — plant it on slide 1, echo "reviewable / reversible / recoverable" on slide 2, land it on slide 9. Second thread: "AI assists in the workflow, not just the code" (slide 6 → close).
- **Clip independence:** no references to other clips; "as we saw" in the close (slide 9) points back to this clip's own demos, and the close stays thematic. Stands alone for anyone landing here cold.
- **Demo note:** BOTH demos are recorded; voiceover transcribed above (was narrated live). Demo 1 brief = `lesson/12-m4-c2-git-discipline.md` (messy working tree → atomic commits → PR summary → reviewers). Demo 2 (worktrees) — beats are in the HTML comment under slide 8, and a full "Demo 2 — Worktrees for parallelization" section now exists in the C2 brief. Reviewer-suggestion is narrated straight (no caveat), per your call.
- **Swappable reference:** demo-1 mixed-tree edits are swappable (see brief); the worktrees demo needs two genuinely independent tasks so they don't collide on the same files.
