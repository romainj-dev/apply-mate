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

Sizing:

- `h-X w-X` -> `size={X * 4}`

Color:

- Use `color="var(--token)"` for theme-like token colors in JSX props
- If icon is inside a styled wrapper setting `color`, prefer inherited
  `currentColor` and omit icon `color` prop

Spacing:

- Prefer parent `gap` over inline icon styles
- Use `styled(Icon)` only when parent gap cannot express the layout

## 8) Tailwind extended palette without theme tokens

Extended palette colors like `green-100`, `orange-700` may not exist in
`theme.ts`. Using raw hex/rgb is acceptable for these semantic status colors.

Document intent with a short comment when using raw literals.
