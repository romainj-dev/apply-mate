# Tailwind -> styled-components Mapping Index

This folder is split for lower context cost:

- `MAPPING-CORE.md`: high-frequency rules used in most migrations
- `MAPPING-EDGE-CASES.md`: uncommon patterns and special handling
- `MAPPING-EXAMPLES.md`: worked migration examples

## Loading strategy

Default:

1. Read `MAPPING-CORE.md`.
2. Read `apps/web/styles/theme.ts`.

On-demand:

- Open `MAPPING-EDGE-CASES.md` only when a utility/pattern is not covered
  by core guidance.
- Open `MAPPING-EXAMPLES.md` only when you need a reference transform.

## Quick topic map

Use `MAPPING-CORE.md` for:

- spacing aliases and `spaceCalc`
- opacity modifiers via `color-mix`
- gradients, responsive inversion, and `group-hover`
- layout values that intentionally stay raw CSS
- Lucide icon defaults and extended palette handling

Use `MAPPING-EDGE-CASES.md` for:

- direct Radix primitive preservation
- shadcn `Input` focus ring removal
- project custom utilities from `globals.css`
- transition/animation edge handling
- drop-shadow filter vs `theme.shadows`
- non-token font weights
- Next.js `Image fill` styling
- colored `shadow-{color}` rules
