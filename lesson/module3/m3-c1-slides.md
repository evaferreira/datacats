**Clip 1: Why Large-Scale Refactoring Is Different**   (~4 minutes)

Explore the difference between small refactors and large-scale modernization efforts. AI can help us with multi-team coordination, merge conflicts, ownership and hidden dependencies. A codebase with daily commits requires a different strategy than a system untouched for years.

                **Demo idea:** Cross-reference backend routes against frontend API calls in one pass to find dead endpoints — and discover the "zombies" that look dead but are still wired to the UI.

## Slide outline

### Slide 1

1. **Title — "Scaling AI-Assisted Refactoring Across Large Codebases"**

2. **What this module covers** *(quick map, not much detail needed)*

   - Why large-scale refactoring is different
   - Choosing the right refactor strategy
   - Planning cross-cutting changes
   - Design debt and consistency audits
   - Example-driven, repetitive migrations
   - Limits and guardrails for AI at scale

3. **The thesis** — *"AI scales the doing. At scale, the hard part stops being the code and becomes the coordination."*

### Slide 2

* let's begin with "Why large-scale refactoring is different"

### Slide 3

**"Changing one component is engineering, changing 50 components is coordination."**

### Slide 4

**The hidden complexity of scale**

| Small refactor | Large refactor |
| ----- | ----- |
| Local context | Distributed context |
| Single owner | Multiple owners |
| One deployment | Phased rollout |
| Easy rollback | Coordinated rollback |

### Slide 5

demo introduction

**Build evidence trails of unused code**

### DEMO HERE (around 2 minutes)

**\[demo placeholder — cross-reference backend ↔ frontend, then classify:**

- **Beat 1 (~30s):** Ask AI to list every route registered in the backend ([server.js](backend/server.js)) and search the frontend `src/` for all API calls, accounting for all three fetch clients ([api.js](frontend/src/utils/api.js), [apiHelpers.js](frontend/src/utils/apiHelpers.js), [apiClient.js](frontend/src/utils/apiClient.js)).
- **Beat 2 (~45s):** Cross-reference — which endpoints have no frontend caller. The clean four surface: `GET /reports/export`, `POST /reports/schedule`, `GET /legacy/export/pdf`, `POST /settings/migrate`.
- **Beat 3 (~30s):** Push on [legacyExport.js](backend/routes/legacyExport.js) — the payoff: 2 of its 3 routes ARE still called ([ApiKeyManager.jsx:57](frontend/src/components/settings/ApiKeyManager.jsx#L57), [UserExportButton.jsx:16](frontend/src/components/users/UserExportButton.jsx#L16)). The file isn't cleanly dead — those are "zombies."
- **Beat 4 (~15s):** Update [ENDPOINT_REGISTRY.md](backend/ENDPOINT_REGISTRY.md), splitting *truly uncalled* from *called-but-obsolete*.

Voiceover hook: *"'Dead' is a claim you verify by reading both sides of the call — not a grep result."*\]

### Slide 6

**"Code, dependencies, coordination and then, execution."**
