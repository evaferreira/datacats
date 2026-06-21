# Demo Brief — Module 4, Clip 2: Git Discipline for AI Changes

## What this demo covers
Using AI to bring discipline to version control: splitting large diffs into
focused commits, generating conventional commit messages, and drafting PR descriptions.

## What to demonstrate
1. Show `CHANGES_IN_PROGRESS.md` — a realistic mixed-change situation
2. Ask the AI to look at the changes and propose how to split them into focused commits
3. Ask the AI to write conventional commit messages for each logical group
4. Ask the AI to draft a PR description summarizing the changes
5. Ask the AI to suggest who might be appropriate reviewers based on file history (even if no real history)
6. Discuss: what makes a good atomic commit vs a "too small" commit

## Suggested opening AI prompt
"I've been making several unrelated changes and want to split them into focused,
reviewable commits. Look at `CHANGES_IN_PROGRESS.md` and the current state of the
codebase. Propose how to group these changes into separate commits with conventional
commit messages (feat/fix/refactor/chore), and draft a PR description for each group."

## Key concepts to cover
- Conventional commits: feat, fix, refactor, chore, docs
- One logical change per commit
- PR descriptions that explain WHY, not just WHAT
- Atomic commits that pass CI independently
