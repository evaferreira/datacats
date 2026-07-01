# Demo Brief — Module 4, Clip 2: Git Discipline for AI Changes

## What this demo covers
Using AI to bring discipline to version control when the changes were generated fast:
reading a messy working tree, splitting it into focused atomic commits, writing
conventional commit messages, and drafting a PR description that explains the *why*.

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
6. Discuss: what makes a good atomic commit vs. a "too small" commit, and why each commit
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
file if recorded from the same repo state. Reviewer-suggestion ("who should review this")
is a weak beat here — the repo has no real contributor history, so AI can only guess. Skip
it or frame it explicitly as "in a real repo, AI can use `git log`/CODEOWNERS."
