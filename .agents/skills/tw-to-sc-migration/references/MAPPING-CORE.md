# Tailwind -> styled-components Core Mapping

Read this file by default. It contains the high-frequency mapping rules.
For uncommon scenarios, consult `MAPPING-EDGE-CASES.md` on demand.

## 1) Spacing: prefer named aliases

Use `theme.space.*` when a named alias exists. Fall back to
`theme.spaceCalc(n)` only for missing steps.

Named aliases:

- `none`, `px`
- `1 -> xs`, `2 -> sm`, `4 -> md`, `6 -> lg`
- `8 -> xl`, `12 -> 2xl`, `16 -> 3xl`, `24 -> 4xl`

No alias (for example `3`, `5`, `10`, `20`) -> `theme.spaceCalc(n)`.
Negative spacing -> `theme.spaceCalcNeg(n)`.

Prefer `gap` over per-child spacing utilities:

- Tailwind `space-y-*` -> `display: flex; flex-direction: column; gap: ...;`

## 2) Opacity modifiers -> `color-mix()`

Tailwind `bg-primary/20` or `border-border/50`:

```css
background: color-mix(
  in oklch,
  ${({ theme }) => theme.colors.primary} 20%,
  transparent
);
```

Pattern:

- `<theme-color>/<opacity>` ->
  `color-mix(in oklch, <theme-color> <opacity>%, transparent)`

For plain white/black + opacity, use `rgb()`:

- `bg-white/50` -> `rgb(255 255 255 / 0.5)`

## 3) Gradients -> `linear-gradient()` with theme colors

```css
/* bg-gradient-to-br from-primary to-accent */
background: linear-gradient(
  to bottom right,
  ${({ theme }) => theme.colors.primary},
  ${({ theme }) => theme.colors.accent}
);

/* bg-clip-text text-transparent */
background-clip: text;
-webkit-background-clip: text;
color: transparent;
```

Gradient stops with opacity also use `color-mix()` from section 2.

## 4) Responsive: invert mobile-first to desktop-first

Tailwind is mobile-first; this project uses desktop-first media helpers.
Make the larger/desktop value default, then override for smaller breakpoints.

**Never** emit a raw `@media (min-width: …)` query. All responsive
overrides must use `theme.media.*` (max-width). Hardcoded min-width
queries are invisible to the theme system and violate the desktop-first
convention.

Tailwind prefix mapping:

| Tailwind | Use theme media |
| -------- | --------------- |
| `sm:`    | `belowMobile`   |
| `md:`    | `belowMobile`   |
| `lg:`    | `belowTablet`   |
| `xl:`    | `belowTablet`   |

Conversion pattern — always invert the logic:

```css
/* Tailwind (mobile-first): default column, row at sm+ */
flex-direction: column;
@media (min-width: 640px) { flex-direction: row; }

/* styled-components (desktop-first): default row, column below mobile */
flex-direction: row;
${({ theme }) => theme.media.belowMobile} { flex-direction: column; }
```

## 5) `group-hover:` -> parent reference selector

```tsx
const Parent = styled.div``

const Icon = styled.svg`
  ${Parent}:hover & {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.primary};
  }
`
```

## 6) Layout utilities with no theme equivalent

Use raw CSS values for layout constraints like:

- `width`, `height`, `min-height`, `max-width`, etc.

Do not force these through spacing tokens. These are layout constraints,
not design tokens.

Example:

```css
max-width: 42rem; /* max-w-2xl */
width: 100%; /* w-full */
min-height: 100vh; /* min-h-screen */
height: 3rem; /* h-12 */
```

## 7) Lucide icons: default handling

Default:

- Keep style-related icon values in `*.styles.ts`, not JSX props
  (`size`, `color`, inline `style`, CSS variable values, etc.)
- Map Tailwind icon sizing (`h-X w-X`) to wrapper CSS:
  - `h-5 w-5` -> `width: 1.25rem; height: 1.25rem;`
- Prefer inherited `currentColor` when parent already controls color
- Prefer parent `gap` for spacing; otherwise style icon wrappers in
  `*.styles.ts`

Exception:

- Allow visual prop overrides only on clearly reusable icon abstractions
  with documented intent (applies to size, color, and other visual props)

## 8) Tailwind extended palette without theme tokens

Extended palette colors like `green-100`, `orange-700` may not exist in
`theme.ts`. For semantic/app-state usage, prefer adding a token to
`globals.css` + `theme.ts` and consume it from styled-components.

Use raw literals only for truly one-off visual details that are not semantic
and not expected to be reused.
