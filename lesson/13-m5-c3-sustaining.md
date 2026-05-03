# Demo Brief — Module 5, Clip 3: Sustaining the Investment

## What this demo covers
Using AI to set up enforcement mechanisms — PR templates, ESLint rules, and recurring
audit prompts — that prevent old patterns from re-entering the codebase after the
migration work is done.

## What to demonstrate
1. Show the PR template — walk through each checklist item and explain why it exists
2. Show the `.eslintrc.js` — run it against the existing codebase to show it already
   catches `no-unused-vars` violations and deprecated import paths
3. Ask the AI to write a custom ESLint rule (or no-restricted-syntax config) that flags
   any JSX `className` containing `btn ` or `badge ` — catching new Bootstrap usage at lint time
4. Ask the AI to write a recurring audit prompt: "scan this codebase and tell me if any
   new Bootstrap class names, class components, or copies of fetchWithAuth have been added
   since the last audit" — show how this can be run periodically as a health check
5. Discuss: refactoring is complete when the old patterns stop coming back, not when the PR merges

## Suggested opening AI prompt
"We've finished a round of legacy refactoring. Help me set up guardrails so the old
patterns don't come back. I want: an ESLint rule that flags new Bootstrap className usage
in JSX, and a reusable audit prompt I can run monthly to check for regressions toward
class components, Bootstrap, or duplicate fetch utilities."

## Key files to reference
- `.github/PULL_REQUEST_TEMPLATE.md` — the PR checklist
- `.eslintrc.js` — the partial lint config to extend
- `src/components/ui/` — the design system to enforce adoption of
- `src/utils/apiClient.js` — the canonical fetch client to enforce use of

## Builds on
This clip works best after Branch 11 (CI/CD) — the ESLint config here can be wired
into the GitHub Actions workflow established there.
