# Frontend conventions

## Custom hooks

- **All custom React hooks live in `src/hooks/`** — one hook per file. Do not define
  reusable hooks inline in components or pages, and do not scatter them under
  `components/` or `utils/`.
- **Name the file after the hook**, and export the hook as the file's `default` export:
  `src/hooks/useDashboardData.js` exports `useDashboardData`.
- Hook names start with `use` (required by React's rules of hooks).

## Styling / design tokens

- **The `--dc-*` custom properties in [`src/styles/main.css`](src/styles/main.css) (`:root`)
  are the single source of truth** for color, spacing, radius, and type. Never hardcode a
  hex/rgb or px/rem literal for color, font size, or spacing — reference a token with
  `var(--dc-*)`. This applies in CSS **and** in inline styles, e.g.
  `style={{ color: 'var(--dc-text-muted)', padding: 'var(--dc-spacing-md)' }}`.
- **Need a value that has no token?** Add the token to `:root` first, then reference it.
  Don't introduce a new raw literal, and don't add a token whose value duplicates an
  existing one — reuse the existing token.
- **The one allowed exception:** color props on Recharts/SVG elements (`stroke`, `fill`)
  must stay hex literals — CSS `var()` does not resolve in SVG presentation attributes.
  Keep them equal to the matching token's value (e.g. `stroke="#2563eb"` = `--dc-primary`).
- **There is no JS brand-color constant** — the old `BRAND_PRIMARY` was removed. Style with
  `var(--dc-primary)`, not a constant imported from `constants/`.
- **Enforced by:** `npm run lint:tokens` (dependency-free grep guard) and
  `npm run lint:css` (stylelint). Run both before committing styling changes.
