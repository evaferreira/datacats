# Demo Brief — Module 4, Clip 2: Git Discipline for AI Changes

## What this demo covers
Using AI to bring discipline to version control when the changes were generated fast:
reading a messy working tree, splitting it into focused atomic commits, writing
conventional commit messages, drafting a PR description that explains the *why*, and
suggesting reviewers.

## Robustness note
No fake `CHANGES_IN_PROGRESS.md`. The demo is grounded in **real, uncommitted git state** —
we make a genuinely mixed working tree across unrelated files, then let the AI read the
actual `git diff` and propose the split. This is honest (it's exactly what a developer
faces after an AI session) and reproducible.

## Setup — stage a realistic mixed working tree (do this before recording)
Make ~3 unrelated edits so the diff spans more than one logical change. Concrete,
grounded candidates (all real files — swap freely, the point is the *mix*, not these
exact edits):

1. **fix:** `timeAgo` in [dateUtils.js](../frontend/src/utils/dateUtils.js) never rolls
   past days — it returns `"400d ago"` forever, while `formatRelativeTime` in
   [dates.js](../frontend/src/utils/dates.js) correctly returns `"13mo ago"`. Add the
   months branch to `timeAgo`. (Self-contained, real bug.)
2. **refactor:** in a component, a readability-only rename or extract — e.g. clarify a
   local variable / pull a small helper. Something with no behavior change.
3. **chore/docs:** a non-code touch — bump a dependency in
   [frontend/package.json](../frontend/package.json) or edit `README.md`.

Leave all three uncommitted (`git status` shows a jumble). That jumble is the whole point.

## What to demonstrate
1. Show `git status` / `git diff` — one messy working tree, several unrelated changes.
2. Ask the AI to read the actual diff and propose how to group it into focused commits.
3. Ask it to write a conventional commit message for each group (feat/fix/refactor/chore/docs).
4. Have it actually stage + commit the groups (`git add -p` style, or per-file), so we
   end with a clean, readable history instead of one blob commit.
5. Ask it to draft a PR description that summarizes the changes and explains *why*.
6. Ask it to suggest reviewers for the PR (narrated straight — see the note below).
7. Discuss: what makes a good atomic commit vs. a "too small" commit, and why each commit
   should pass CI on its own.

## Suggested opening AI prompt
"I ran an AI session and now my working tree has several unrelated changes mixed together.
Read the current `git diff`, group the changes into focused commits, and give me a
conventional commit message (feat/fix/refactor/chore/docs) for each group. Then draft a
PR description that explains the why, not just the what. Don't commit anything yet —
propose the plan first."

## Key concepts to cover
- Conventional commits: feat, fix, refactor, chore, docs
- One logical change per commit; each commit passes CI independently
- PR descriptions that explain WHY, not just WHAT
- Why fast AI-generated diffs make this discipline *more* important, not less

## Watch for / overlap note
Candidate edit #2 could touch `metrics.js`, which is C3's territory — keep C2's edits off
`metrics.js` (use a component rename instead) so the two demos don't fight over the same
file if recorded from the same repo state. Also keep this demo's component rename off
`Badge.jsx` (Demo 2's feature file). Reviewer-suggestion ("who should review this") is
narrated straight, per the clip decision — just note the datacats repo has thin contributor
history, so on camera it's more illustrative than real; in a production repo, AI leans on
`git log` and CODEOWNERS to pick the right reviewer.

## Demo 2 — Worktrees for parallelization

### What this demo covers
Running **two genuinely unrelated tasks at the same time**, each in its own git worktree,
with its own AI session — no branch-switching, no stashing. The point is the *parallel
workflow*, not the code: one small feature in one worktree, one small bug fix in another,
both moving concurrently, each committed in place, then cleaned up. Keep it to ~45 seconds.

### The two tasks (real files, truly independent)
1. **feat:** add a `size` prop to the Badge component
   ([Badge.jsx](../frontend/src/components/ui/Badge.jsx)) — e.g. `sm` (current look) and a
   larger variant, referencing existing `--dc-*` type/spacing tokens (if a larger size has
   no token yet, add the token first — never a raw literal; see `frontend/CLAUDE.md`).
2. **fix:** `formatCompactNumber` in [formatters.js](../frontend/src/utils/formatters.js)
   caps at `M`, so a value ≥ 1e9 renders as `"1500.0M"`. Add the billions (`B`) branch.
   (Verified: [formatters.js:24](../frontend/src/utils/formatters.js#L24) has only the
   `M` / `K` branches.)

*Why they're independent:* different files with no import relationship (`Badge.jsx` doesn't
import `formatters.js`, and the util is pure) — the two worktrees can never touch the same
lines. Both stay off `metrics.js` (Clip 3) and `dateUtils.js` (Demo 1). Also keep `Badge.jsx`
out of Demo 1's "component refactor" slot, so the two demos don't collide on the same file.

### The worktree flow (base off `module4`)
```bash
git worktree add ../datacats-badge-size  -b feat/badge-size      module4
git worktree add ../datacats-compact-num -b fix/compact-billions module4
# ...open an AI session in each dir, work in parallel, commit in each...
git worktree remove ../datacats-badge-size
git worktree remove ../datacats-compact-num
```

### Suggested opening AI prompt
"I have two unrelated changes to make and I want to work them in parallel without switching
branches. Set up two git worktrees off the `module4` branch: one at `../datacats-badge-size`
on a new `feat/badge-size` branch, and one at `../datacats-compact-num` on a new
`fix/compact-billions` branch. Show me the `git worktree add` commands and run them, then
tell me which directory to open for each task. Don't start editing yet."

### Beats in order
1. Show `git worktree list` / `git status` on `module4` — one repo, one clean tree.
2. Run the two `git worktree add` commands — two working dirs, two branches, no stashing.
3. Split-screen (or cut between): an AI session in each worktree, both running at once —
   feature in one, bug fix in the other.
4. Commit inside each worktree independently (conventional messages: `feat:` / `fix:`).
5. `git worktree remove` both — call out that history/branches survive the cleanup.

### Watch for
- Emphasize **no branch-switching and no stashing** — that's the whole payoff over one
  working tree. If you catch yourself `git checkout`-ing, the demo has drifted.
- Worktrees share the same `.git`; you can't check out the *same* branch in two of them —
  each needs its own branch (the `-b` flags above), which is why the two tasks must be
  independent.
- Don't let the code balloon on camera — if a task grows past a few lines, it's too big for
  this beat. The lesson is the concurrent workflow, not the diff.
