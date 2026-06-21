**Clip 3: Architectural Refactoring**   (\~7 minutes)

Now that our code is more understandable, it's time to tackle architectural systems design. This time we will audit a large legacy frontend component and we will work alongside our AI coding agents to break this down into smaller, focused components, hooks, and utilities. This will teach us about modularity and separation of concerns. Finally, we will ask our AI coding agent to update tests and documentation accordingly.

                **Demo idea:** Decompose a 450-line page component — start with dead-code cleanup, then extract one custom hook.

## Slide outline

### Slide 1

**Title — "Architectural Refactoring"**

### Slide 2

**Why this matters**

Understanding the bigger picture.

Script note: *When we talk about architectural refactoring we are not talking about a simple aesthetic problem — it's a daily-work problem. Every developer knows how feeling lost in a codebase feels when things aren't clear enough. Good decomposition gives you the needed clarity: one screen / one concern, conflicts stay local, each piece tests alone, import instead of duplicate.*

### Slide 3

**Clean up and extract**

1. Remove dead code
2. Extract one piece at a time
3. Reuse the abstractions
4. Capture the conventions

### Slide 4

demo introduction

**Three beats, one file**

- **Clean** — delete what the audit flagged
- **Extract** — pull data-fetching into a hook
- **Capture** — record the new rule

Voiceover hook: *"454 lines, but maybe 150 of them are actually about rendering. Let's find out what the rest is doing."*

### DEMO HERE (around 3.5 – 4 minutes)

**\[demo placeholder — three beats on `DashboardPage.jsx`:**
- **Beat 1 (~1 min):** Remove dead code — `processData2`, `tempFix`, commented-out dark-mode block, commented-out `legacyExportBlock`. File drops ~454 → ~400 lines.
- **Beat 2 (~2 min):** AI lists remaining responsibilities, proposes decomposition, then extracts `useDashboardMetrics` into a new `src/hooks/` directory. File drops to ~350 lines.
- **Beat 3 (~30s):** Update `CLAUDE.md` with the new convention: hooks live in `src/hooks/`, pages stay thin.**\]**

### Slide 6

**It's not just rewriting code.**
**It is improving the experience for the next contributor.**

Script note: *The convention isn't real until it's captured. We refactor, ship, move on — and six months later someone reinvents the old pattern because nobody wrote it down. Code says what. Conventions say why and how.*
