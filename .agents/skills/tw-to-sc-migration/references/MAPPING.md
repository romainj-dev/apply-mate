# Tailwind → styled-components Conventions

The agent already knows how to translate Tailwind utilities to CSS.
This file covers only the **non-obvious, project-specific decisions**
the agent cannot derive from general knowledge.

For the full token API, read `apps/web/styles/theme.ts` directly.

## 1. Spacing: prefer named aliases

Use `theme.space.*` when a named alias exists. Fall back to
`theme.spaceCalc(n)` only for steps without one.

Named aliases cover: `none`, `px`, `1→xs`, `2→sm`, `4→md`, `6→lg`,
`8→xl`, `12→2xl`, `16→3xl`, `24→4xl`.

Steps **without** a named alias (3, 5, 10, 20, etc.) →
`theme.spaceCalc(n)`. Negative spacing → `theme.spaceCalcNeg(n)`.

Tailwind `space-y-*` → prefer `display: flex; flex-direction: column; gap: ...;`

## 2. Opacity modifiers → `color-mix()`

Tailwind `bg-primary/20` or `border-border/50` → use `color-mix`:

```css
background: color-mix(
  in oklch,
  $ {({theme}) => theme.colors.primary} 20%,
  transparent
);
```

Pattern: `<color>/<opacity>` →
`color-mix(in oklch, <theme-color> <opacity>%, transparent)`.

For plain white/black with opacity, use `rgb()` instead:
`bg-white/50` → `rgb(255 255 255 / 0.5)`.

## 3. Gradients → `linear-gradient()` with theme colors

```css
/* bg-gradient-to-br from-primary to-accent */
background: linear-gradient(
  to bottom right,
  $ {({theme}) => theme.colors.primary},
  $ {({theme}) => theme.colors.accent}
);

/* bg-clip-text text-transparent */
background-clip: text;
-webkit-background-clip: text;
color: transparent;
```

Gradient stops with opacity use the same `color-mix` pattern from above.

## 4. Responsive: invert Tailwind's mobile-first to desktop-first

Tailwind `md:text-7xl` means "text-7xl at ≥768px". Our theme is
desktop-first: the **larger** style is the default, overrides go inside
`theme.media.belowTablet` / `theme.media.belowMobile`.

```tsx
const Heading = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['7xl']};

  ${({ theme }) => theme.media.belowTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  }
`
```

## 5. Tailwind `group-hover:` → parent component reference

```tsx
const Parent = styled.div``
const Icon = styled.svg`
  ${Parent}:hover & {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.primary};
  }
`
```

## 6. Layout utilities with no theme equivalent

`max-w-*`, `w-*`, `min-h-*`, `h-*`, and similar sizing utilities have
no counterpart in `theme.ts`. Use the raw CSS value directly — these are
layout constraints, not design tokens:

```css
/* max-w-2xl */
max-width: 42rem;

/* w-full */
width: 100%;

/* min-h-screen */
min-height: 100vh;

/* h-12 */
height: 3rem;
```

The no-hardcoded-values rule applies to **design tokens** (colors,
spacing scale, typography, radii, shadows). Layout dimensions that
Tailwind itself derives from a fixed scale are acceptable as literals.
Do **not** use `theme.space.*` or `theme.spaceCalc()` for widths and
heights.

## 7. Custom Tailwind utilities from `globals.css`

These utilities are defined in `globals.css` and have no theme
equivalent. Handle case by case:

| Utility           | Migration approach                           |
| ----------------- | -------------------------------------------- |
| `glass`           | Recreate as a styled mixin or component      |
| `glass-card`      | Recreate as a styled component               |
| `bg-grid-pattern` | Keep as `className` or recreate with raw CSS |

---

## Worked Example

### Before: `DashboardHeader` (Tailwind)

```tsx
export function DashboardHeader({
  title,
  subtitle,
}: {
  title: string | React.ReactNode
  subtitle: string
}) {
  return (
    <div className="mb-8 relative">
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
      </div>
    </div>
  )
}
```

### After: `header.styles.ts`

```tsx
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

export const Inner = styled.div`
  position: relative;
  z-index: 10;
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  max-width: 42rem; /* max-w-2xl — layout constraint, no theme token */
`
```

### After: `header.tsx`

```tsx
import { Wrapper, Inner, Title, Subtitle } from './header.styles'

export function DashboardHeader({
  title,
  subtitle,
}: {
  title: string | React.ReactNode
  subtitle: string
}) {
  return (
    <Wrapper>
      <Inner>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Inner>
    </Wrapper>
  )
}
```
