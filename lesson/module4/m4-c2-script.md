# Clip 2: Git Discipline for AI Changes — Script Draft

**Total clip duration:** ~6 min (recorded) — **Demo portion:** two demos, not scripted — git-discipline commit split + worktrees parallelization; narrated live over the recording, instructor briefs in HTML comments under slides 6 and 8 — **Spoken slide budget:** ~3:00 min (419 words at Eva's 140 wpm pace) — **Voice:** Eva — collaborative, warm, direct, conversational — **Threaded thesis:** *Git isn't just version control — it's the safety net that keeps fast, AI-driven change reviewable, reversible, and recoverable; and AI assists in the workflow, not just the code* — **Outline coverage status:** all slide bullets covered; outline bullets (branching, focused PRs, conventional commits, rollback; AI splits diffs / drafts messages / summarizes PRs / suggests reviewers) land across slides 2 & 4 + demo 1; worktrees demo (slide 8) = two unrelated tasks in parallel.

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

<!-- Demo 1 — NOT scripted; narrate live over the recording. Full brief: lesson/12-m4-c2-git-discipline.md.
 Setup (off-camera): stage a realistic mixed working tree — ~3 unrelated edits so `git diff` spans multiple logical
 changes (e.g. fix: add the months branch to timeAgo in frontend/src/utils/dateUtils.js; refactor: a readability-only
 rename in a component — keep OFF metrics.js, that's C3's file; chore/docs: bump a dep in frontend/package.json or edit
 README). Leave all three uncommitted so `git status` shows a jumble.
 Beats: (1) show `git status` / `git diff` — one messy tree. (2) Ask AI to read the diff and group it into focused
 commits. (3) A conventional message per group (feat/fix/refactor/chore/docs). (4) Stage + commit the groups → clean,
 readable history. (5) Draft a PR description that explains the WHY, not just the what. (6) Suggest reviewers (narrated
 straight, no caveat). Opening prompt is in the brief. Watch-for: keep commits atomic — each should pass CI on its own. -->

[slideshow]

There's one more piece of Git that's a quiet superpower when we work with agents: worktrees. A worktree lets us check out more than one branch at once, each in its own folder. That means that we can run parallel experiments without constant branch switching — no constant git stash nor pop needed.

[slideshow]

So let's put worktrees to work, running two unrelated tasks at the same time.

[demo time]

<!-- Demo 2 — NOT scripted; narrate live. Full brief: lesson/12-m4-c2-git-discipline.md → "Demo 2 — Worktrees for parallelization".
 Concept: two UNRELATED tasks in parallel, each in its own git worktree, no branch-switching.
 Beats: (1) from module4, add two worktrees on two branches, e.g. `git worktree add ../datacats-feat feat/xyz` and
 `git worktree add ../datacats-fix fix/abc`. (2) Open an agent session in each folder — one works a small feature, the
 other a bug fix — at the same time. (3) Show the main checkout is never disturbed: no stash, no thrash. (4) Commit each
 in its own worktree; clean up with `git worktree remove`.
 Watch-for: pick two genuinely independent tasks so they don't touch the same files. Keep it short — the point is the
 parallel workflow, not the code itself. -->

[slideshow]

So Git isn't just version control — it's our safety net. It's what makes fast, AI-driven change reviewable, reversible, and recoverable. And as we saw, AI assists in the workflow, not just in the code — helping us keep the history clean and run our experiments in parallel.

---

## Notes for Eva

- **Word count (spoken slide narration only):** 419 words ≈ 3:00 at your 140 wpm pace. Excludes both demos (narrated live) and the HTML-comment briefs. Total clip lands ~6 min depending on demo length — ~3:00 of slides leaves ~3:00 for the two demos (~1–1.5 min each). Slide 5 (Conventional commits) includes a brief screen-share of conventionalcommits.org.
- **Safest cut if running long:** slide 2's four reasons can compress to a bare list ("safe experimentation, reviewable, reversible, recoverable — that's how we reduce risk"), recovering ~35 words / ~15s. Slide 1's open is the next most trimmable.
- **Thread to lean into:** "safety net" — plant it on slide 1, echo "reviewable / reversible / recoverable" on slide 2, land it on slide 9. Second thread: "AI assists in the workflow, not just the code" (slide 6 → close).
- **Clip independence:** no references to other clips; "as we saw" in the close (slide 9) points back to this clip's own demos, and the close stays thematic. Stands alone for anyone landing here cold.
- **Demo note:** BOTH demos are unscripted — live narration over the recording. Demo 1 brief = `lesson/12-m4-c2-git-discipline.md` (messy working tree → atomic commits → PR summary → reviewers). Demo 2 (worktrees) — beats are in the HTML comment under slide 8, and a full "Demo 2 — Worktrees for parallelization" section now exists in the C2 brief. Reviewer-suggestion is narrated straight (no caveat), per your call.
- **Swappable reference:** demo-1 mixed-tree edits are swappable (see brief); the worktrees demo needs two genuinely independent tasks so they don't collide on the same files.
