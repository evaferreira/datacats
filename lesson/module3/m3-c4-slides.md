**Clip 4: Design Debt and Consistency Audits**   (~5 minutes)

Tech debt is not always about code, it is also about design debt. Large code bases often generate design inconsistencies that lower maintainability and reduce the perceived product quality of our applications. We will use AI to audit font sizes, spacing values, and color usage, then propose tokens and standards for gradual migration.

                **Demo idea:** Audit every color, font-size, and spacing value across the frontend, group the near-duplicates, and propose a CSS custom-property token system.

## Slide outline

### Slide 1

**Title — "Design debt and consistency audits"**

### Slide 2

**The hidden cost of design debt**

For engineers:

- Harder maintenance
- Duplicated components
- Lack of source of truth

Script note: *Which color is the final one? Which button component should I use?*

### Slide 3

**The hidden cost of design debt**

For users:

- Difficult to learn interfaces
- Lower perceived quality
- Lack of trust

Script note: *Primary action button sometimes on the left, sometimes on the right. Inconsistencies makes it harder to learn UX patterns*

### Slide 4

**"The front-end is the way you introduce yourself to your users."**

Script note: *They won't say "the spacing is inconsistent" but they feel the friction. Visible representation of your engineering quality. Design debt affects into user's trust.*

### Slide 5

**Design tokens**

1. **Inventory**
   - Find inconsistencies
   - Identify dominant patters
2. **Define tokens**
   - Spacing
   - Typography
   - Color system
3. **Incremental replacement**

### Slide 6

demo introduction

**Running a design audit**

Script note: *We are standardizing behavior, not redesigning.*

### DEMO HERE (around 3 minutes)

**\[demo placeholder — audit and propose (no full migration):**

- **Beat 1 (~1 min):** Find every unique color hex across the CSS files ([main.css](frontend/src/styles/main.css), [dashboard.css](frontend/src/styles/dashboard.css), [users.css](frontend/src/styles/users.css), [reports.css](frontend/src/styles/reports.css), [settings.css](frontend/src/styles/settings.css)) and inline styles. Group the near-duplicates — *"these 6 blues are all meant to be brand primary."*
- **Beat 2 (~1 min):** Find all font-size values (6+ distinct sizes for "small text") and all spacing values — three different approaches: raw `px`, `rem`, and `var(--dp-spacing-*)`. Inline offenders live in [MetricsCard.jsx](frontend/src/components/dashboard/MetricsCard.jsx), [Sidebar.jsx](frontend/src/components/layout/Sidebar.jsx), [TopBar.jsx](frontend/src/components/layout/TopBar.jsx), [UserRow.jsx](frontend/src/components/users/UserRow.jsx).
- **Beat 3 (~45s):** Propose a CSS custom-property token system — spacing scale, type scale, color palette.
- **Beat 4 (~15s):** Show what migrating one hardcoded value to a token looks like in a single file — proof of the pattern, not the whole sweep.\]

### Slide 7

**"Consistency before perfection."**

Script note: *Fewer patterns, less maintenance, faster change. Happier users!*
