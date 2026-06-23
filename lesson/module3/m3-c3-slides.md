**Clip 3: Planning Cross-Cutting Changes**   (~5 minutes)

Use AI to map dependencies, identify obsolete modules that should be retired instead of migrated, and reduce modernization scope. Then generate checklists, milestones, phased rollouts, and rollback plans.

                **Demo idea:** Turn the dead/zombie endpoints from Clip 1 into an executable, phased `DECOMMISSION_PLAN.md` — callers neutralized before any route is deleted.

## Slide outline

### Slide 1

**Title — "Planning cross-cutting changes"**

Script note: *Ai helps reduce modernization scope by exposing dependencies and planning safe retirement. Planning is reducing unnecessary work.*

### Slide 2

**Is a migration worth it?**

| Retire | Migrate |
| ----- | ----- |
| Unused modules | Core capabilities |
| Abandoned endpoints | Business critical flows |
| Duplicated abstractions | Active dependencies |
| Dead experiments | Evolving functionality |

Script note: *Is it still in use? Does it provide value?*

### Slide 3

**The role of AI**

Build dependency usage

- Summarize usage
- Identify references
- Ownership discovery
- Estimate impact

### Slide 4

**Retirement plan**

1. Inventory
2. Retire consumers
3. Disable
4. Remove

### Slide 5

**Planning artifacts**

1. Inventory
   - **Dependencies**
2. Retire consumers
   - **Migration tasks**
3. Disable
   - **Rollout + monitoring**
4. Remove
   - **Cleanup**

Script note: *Milestones, checklists, rollback checkpoints. Every phase should be reversible.*

### Slide 6

demo introduction

**From obsolete to retirement plan**

### DEMO HERE (around 3 minutes)

**\[demo placeholder — map → decide → sequence, producing `DECOMMISSION_PLAN.md`:**

- **Beat 1 (~1 min):** Map. Feed AI the obsolete endpoints from [ENDPOINT_REGISTRY.md](backend/ENDPOINT_REGISTRY.md). For each: where it's mounted ([server.js](backend/server.js)), what it returns, every caller, what breaks on removal. Classify **retire / migrate / keep**.
- **Beat 2 (~1 min):** Decide & cut scope. Everything here is *retire* — obsolete since 2022. The two zombie features are fake (hardcoded CSV at [ApiKeyManager.jsx:57](frontend/src/components/settings/ApiKeyManager.jsx#L57), no-op job at [UserExportButton.jsx:16](frontend/src/components/users/UserExportButton.jsx#L16)), so we retire the features rather than rebuild them. That's the scope cut.
- **Beat 3 (~1 min):** Sequence. AI writes `DECOMMISSION_PLAN.md`:
  - **Phase 0 — neutralize the callers first** (ships before any route is deleted)
  - **Phase 1 — delete the 4 truly-dead routes** (no callers)
  - **Phase 2 — remove the `legacy/export` module**, its mount + require, and the dead [utils/legacyExport.js](frontend/src/utils/legacyExport.js)
  - Plus: milestone per phase, a checklist, verification ([logger](backend/middleware/logger.js) shows zero hits before delete), and rollback (per-phase commits + `git revert`).

Voiceover thread: *"The callers come down first, the routes second, the module last. That sequence is the whole game."*\]

### Slide 7

**"The safest migration is the one you never perform."**
