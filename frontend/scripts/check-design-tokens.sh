#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Design-token guard (dependency-free).
#
# Fails if a hardcoded color or font size is used instead of a --dc-* token.
# Tokens are defined in src/styles/main.css (:root) and are the single source
# of truth — see frontend/CLAUDE.md.
#
# Run with: npm run lint:tokens
# ---------------------------------------------------------------------------
set -uo pipefail

cd "$(dirname "$0")/.."

fail=0

# 1. Hex colors inside inline style objects: style={{ color: '#fff' }}.
#    Recharts SVG attributes (stroke="#..") and anchor hrefs (href="#..") use
#    ="#" — not : '#' — so they are intentionally NOT matched here.
hits=$(grep -rnE ":[[:space:]]*['\"]#[0-9a-fA-F]" src --include=*.js --include=*.jsx || true)
if [ -n "$hits" ]; then
  echo "✗ Hardcoded hex color in an inline style — use var(--dc-*) instead:"
  echo "$hits"
  echo
  fail=1
fi

# 2. Hardcoded font sizes in inline styles: fontSize: 14  /  fontSize: '1rem'.
#    var() values (fontSize: 'var(--dc-font-sm)') start with a quote+letter, so
#    they are not matched.
hits=$(grep -rnE "fontSize:[[:space:]]*['\"]?[0-9]" src --include=*.js --include=*.jsx || true)
if [ -n "$hits" ]; then
  echo "✗ Hardcoded fontSize in an inline style — use var(--dc-font-*) instead:"
  echo "$hits"
  echo
  fail=1
fi

# 3. Hex / rgba literals in CSS outside the :root token definitions (token
#    declaration lines all contain '--dc-', so they are excluded).
hits=$(grep -rnE "#[0-9a-fA-F]{3,6}|rgba?\(" src/styles --include=*.css | grep -v -- '--dc-' || true)
if [ -n "$hits" ]; then
  echo "✗ Hardcoded color in CSS — reference a --dc-* token instead:"
  echo "$hits"
  echo
  fail=1
fi

if [ "$fail" -eq 0 ]; then
  echo "✓ design tokens: no hardcoded colors or font sizes outside the token set"
fi
exit $fail
