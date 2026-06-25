# Demo Brief — Module 3, Clip 4: Design Consistency Audit

## What this demo covers
Using AI to audit the frontend for design inconsistencies — color, font size, spacing —
and discover that a token system **already exists but has drifted**: it's defined in
`main.css :root` and barely used anywhere else. The work is to *consolidate onto it and
prune the strays*, not to invent tokens from scratch.

## ⚠️ Reality check — verified against the code (read before scripting)
`frontend/src/styles/main.css` already defines a full token system in `:root`:
`--dc-primary: #2563eb`, `--dc-primary-hover: #1d4ed8`, `--dc-text: #111827`,
`--dc-text-muted: #6b7280`, `--dc-bg`, `--dc-surface`, `--dc-border`,
`--dc-spacing-xs…xl`, `--dc-font-sm: 0.875rem`, `--dc-font-md`. The debt is **non-adoption**,
and that's what makes the audit land:

- The brand blue `#2563eb` is hardcoded **16×** instead of `var(--dc-primary)` — plus **5 rogue blues** that match no token: `#2460e8`, `#3b82f6`, `#60a5fa`, `#245fe6`, `#1e56d9`.
- `--dc-spacing-*` is used in **exactly one file** (`settings.css`); everywhere else it's raw `px`/`rem`.
- `--dc-font-sm` is `0.875rem`, but sizes drift around it with near-misses like `0.925rem` and `0.975rem`.

So the framing is **"adopt the tokens we already have," not "propose a new system."** A
naive "design a token system" prompt would have the AI awkwardly point out the tokens
already exist — lead with the consolidation story instead. (Earlier materials said
`--dp-spacing-*`; that's the old "DataPulse" prefix — the real one is `--dc-`.)

## What to demonstrate
1. Find every unique color hex across the CSS files and inline styles — how many distinct values?
2. Group the near-duplicates ("these 7 blues are almost all meant to be the brand primary — and `--dc-primary` already *is* that blue").
3. Find all font-size values — how many distinct sizes, and how many are near-misses around `--dc-font-sm`?
4. Find how spacing is applied — raw `px`, `rem`, and the `--dc-spacing-*` tokens used in only `settings.css`.
5. Surface that `main.css :root` already defines the tokens, and show how to **consolidate onto them and fill the gaps** — not invent a system from scratch.
6. Show one hardcoded value becoming the existing token in a single file — e.g. `#2563eb` → `var(--dc-primary)`, or `16px` → `var(--dc-spacing-md)`.

## What to ignore for this clip
- Actually migrating all files (audit and propose only)
- Bootstrap migration (Module 1)
- The class-component migration sweep (Clip 5)

## Suggested opening AI prompt
"Audit the CSS and inline styles across the frontend for design consistency — how many
distinct colors, font sizes, and spacing values are we actually using? Group the
near-duplicates. And check whether we already have design tokens; if we do, tell me how
consistently they're used and what it'd take to standardize on them."

(Letting the AI *check for* tokens is what surfaces the `--dc-*` system in `main.css` — and
the fact it's barely adopted — instead of pretending none exist.)

## Key files to reference
- `frontend/src/styles/main.css` — **the `:root` token block: the system that already exists**
- `frontend/src/styles/dashboard.css`, `users.css`, `reports.css`, `bootstrap-overrides.css`
- `frontend/src/styles/settings.css` — the one file actually using `var(--dc-spacing-*)`
- Inline styles in: `MetricsCard.jsx`, `Sidebar.jsx`, `TopBar.jsx`, `UserRow.jsx`

## What to find
- ~23 distinct hex colors, including 7 blues — while `--dc-primary` (the canonical blue) already exists
- 10+ distinct font-size values, with near-misses (`0.925rem`, `0.975rem`) around `--dc-font-sm` (`0.875rem`)
- 3 spacing approaches: raw `px`, `rem`, and `var(--dc-spacing-*)` — the tokens, adopted in only `settings.css`
