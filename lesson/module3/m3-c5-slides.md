**Clip 5: Using AI for Example-Driven, Repetitive Migrations**   (~5 minutes)

Once one or two examples are complete, AI can accelerate the remaining work. We will use example-driven migrations to scale changes consistently across many files.

                **Demo idea:** From two reviewed class→functional migrations, derive a `MIGRATION_CONTRACT.md`, scale it across eight components in one pass, verify, and capture it as a reusable skill.

## Slide outline

### Slide 1

**Title — "Using AI for example-driven, repetitive migrations"**

### Slide 2

**Repetitive migrations**

- Manual repetition creates inconsistencies
- Scale increases effort level
- Proven patterns can help us automate

Script note: *Large migrations eventually turn repetitive*

### Slide 3

**Migration contracts**

- Rules
- Constrains
- Patterns

Script note: *Apply approved patterns, follow examples, preserve behavior, a11y and tests. Do not redesign components, nor rename unrelated code… Teach the pattern before scaling*

### Slide 4

**"Bad patterns scale as well."**

### Slide 5

demo introduction

**Migrating at scale**

### DEMO HERE (around 3.5 minutes)

**\[demo placeholder — derive → scale → verify → capture (class components → functional with hooks):**

- **Beat 1 (~1.5 min):** Derive the contract. Point AI at the two reviewed examples — [ActivityFeed.jsx](frontend/src/components/dashboard/ActivityFeed.jsx) (the `setInterval` → `useEffect` cleanup pattern) and [MetricsCard.jsx](frontend/src/components/dashboard/MetricsCard.jsx) (the ref-guarded effect that preserves the `filters` refetch timing). AI writes `MIGRATION_CONTRACT.md`: mapping rules, DO/DON'T, constraints. Record one up front — `UserFilters.jsx` is **out of scope** (notifies its parent during `render()`).
- **Beat 2 (~1.5 min):** Scale. Hand AI the contract + the two examples and migrate **exactly these eight** by name: `MetricsSummary`, `ChurnCohortChart`, `ReportFilters`, `ReportTable`, `ApiKeyManager`, `TeamSettings`, `UserExportButton`, `UserTable`. The explicit allowlist is what keeps `UserFilters` out — never fall back to "migrate all class components."
- **Beat 3 (~45s):** Verify. Run the existing tests ([UserTable.test.jsx](frontend/src/components/users/UserTable.test.jsx), [UserRow.test.jsx](frontend/src/components/users/UserRow.test.jsx)). Audit shape consistency: no extracted hooks, nothing renamed, no behavior "fixed." Spot-check that `ChurnCohortChart` keys its effect on `refreshKey` (scalar) and that `ReportTable` / `UserTable` came out identical.
- **Beat 4 (~30s):** Capture. Save the contract as a reusable skill at `.claude/skills/class-to-function-migration/SKILL.md` — next batch is one command.

Voiceover: *"The contract was the asset, not the migration. Next time this is one command — the contract becomes a skill, the skill becomes a habit."*\]

### Slide 6

**Repetitive migrations**

- Examples reduce ambiguity
- Contracts reduce risks
- AI helps execute proven patterns

Script note: *Large migrations eventually turn repetitive*
