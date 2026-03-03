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

### Tailwind breakpoint → theme media mapping

Our theme only has two breakpoints (`belowTablet` = 1023px,
`belowMobile` = 767px). Use the closest available breakpoint:

| Tailwind prefix | Tailwind width | Use           |
| --------------- | -------------- | ------------- |
| `sm:` (≥640px)  | 640px          | `belowMobile` |
| `md:` (≥768px)  | 768px          | `belowMobile` |
| `lg:` (≥1024px) | 1024px         | `belowTablet` |
| `xl:` (≥1280px) | 1280px         | `belowTablet` |

When the mobile-first `sm:` or `md:` utility sets the **larger** value,
invert to desktop-first by making the larger value the default and
overriding with `belowMobile` for smaller screens.

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

## 7. Lucide icons: size, color, and spacing

### Sizing

`h-X w-X` on a Lucide icon → use the `size` prop (N = X × 4 px):

```tsx
// h-4 w-4
<ArrowRight size={16} />

// h-7 w-7
<FeatureIcon size={28} />
```

### Color

`text-primary` (or any Tailwind color class) on a Lucide icon → use the
`color` prop with the raw CSS variable. Theme context is not available
in JSX props (only in styled-components template literals):

```tsx
<FeatureIcon size={28} color="var(--primary)" />
```

For colors not in the theme (e.g. `text-orange-600`), pass the raw
`rgb()` value:

```tsx
<AlertCircle size={24} color="rgb(234 88 12)" />
```

### Spacing between icon and text

`ml-*` / `mr-*` on an icon inside a button or flex container → **do not
use inline `style={{}}`**. Instead, add `gap` to the parent styled
component:

```tsx
// hero.styles.ts
export const PrimaryButton = styled(Button)`
  gap: ${({ theme }) => theme.space.sm}; /* ml-2 / mr-2 = 0.5rem */
`
```

```tsx
// hero.tsx — no inline style needed
<PrimaryButton size="lg">
  Start for free
  <ArrowRight size={16} />
</PrimaryButton>
```

### Color via parent wrapper

When a Lucide icon is nested inside a styled container whose sole
purpose includes setting a foreground color (e.g., an `IconWrapper`),
let the icon inherit `currentColor` from the parent instead of passing
the `color` prop. This removes redundancy and keeps the color
semantically tied to the wrapper:

```tsx
// icon-wrapper sets the color; AlertCircle inherits it automatically
export const IconWrapper = styled.div`
  color: #ea580c; /* text-orange-600 */
`

// no color prop needed — currentColor is inherited
<IconWrapper>
  <AlertCircle size={20} />
</IconWrapper>
```

Use the `color` prop approach (§7 guidance above) only when the icon is
a standalone element not nested inside a same-purpose color container.

### Fallback: `styled(Icon)` when `size`/`color` props are not enough

If an icon needs both a margin **and** it cannot be handled by `gap` on
the parent (e.g., the icon is the only flex child, or the parent already
has a fixed `gap`), wrapping with `styled()` is acceptable:

```ts
export const ArrowIcon = styled(ArrowRight)`
  height: 1rem; /* h-4 */
  width: 1rem;
  margin-left: ${({ theme }) => theme.space.sm}; /* ml-2 */
`
```

Prefer the `size` prop + `gap` approach; use `styled()` only when the
parent layout makes `gap` impractical.

## 8. Tailwind extended palette colors with no theme equivalent

Some components use Tailwind's extended palette (e.g., `bg-green-100`,
`text-green-700`, `text-orange-600`) for semantic status colours (success,
warning, error). These do **not** map to any token in `theme.ts`.

| Approach                                                                 | When to use                                                                                      |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Hardcode the hex literal (e.g., `#dcfce7`)                               | Acceptable — these are not design tokens, so the no-hardcoded-values rule in B1 does not apply   |
| Use the Tailwind v4 CSS custom property (e.g., `var(--color-green-100)`) | Preferred when you want to stay dynamic and the project exposes palette vars via `@theme inline` |

The current project hardcodes the hex values. This is correct and
consistent with MAPPING.md §6 (raw values for things with no theme
token). Use the same hex values that Tailwind's palette resolves to, and
add a comment identifying the Tailwind utility:

```ts
export const StatusBadge = styled(Badge)<StatusBadgeProps>`
  /* bg-green-100 text-green-700 / bg-orange-100 text-orange-700 */
  background-color: ${({ $isComplete }) =>
    $isComplete ? '#dcfce7' : '#ffedd5'};
  color: ${({ $isComplete }) => ($isComplete ? '#15803d' : '#c2410c')};
`
```

---

## 9. Radix UI primitives used directly in original code

If the original component imports a Radix UI primitive directly (e.g.,
`@radix-ui/react-progress`) rather than the shadcn/ui wrapper
(`@/components/ui/progress`), **preserve this pattern** during migration.

Switching to the shadcn wrapper adds extra Tailwind classes (backgrounds,
border-radius, overflow handling) that are not present in the original
render — an out-of-scope visual change.

When wrapping for height/size override, use `styled()` on the same
Radix primitive the original code used:

```ts
// Original used @radix-ui/react-progress directly — keep that import
import { Progress } from '@radix-ui/react-progress'

export const ProgressBar = styled(Progress)`
  height: 0.5rem; /* h-2 */
`
```

Note: in new code written from scratch, prefer the shadcn wrapper.

---

## 18. Removing the shadcn focus ring from `Input`

shadcn `Input` applies a focus ring via `box-shadow` on `:focus-visible`.
When the original component suppresses it with `focus-visible:ring-0
focus-visible:ring-offset-0`, replicate this in the styled wrapper:

```ts
export const StyledInput = styled(Input)`
  &:focus-visible {
    outline: none;
    box-shadow: none; /* focus-visible:ring-0 focus-visible:ring-offset-0 */
  }
`
```

`ring-0` maps to `box-shadow: none` because shadcn implements the ring as a
box-shadow value. Do **not** use `ring: none` (not a valid CSS property).

---

## 10. Custom Tailwind utilities from `globals.css`

These utilities are defined in `globals.css` and have no theme
equivalent. Handle case by case:

| Utility           | Migration approach                           |
| ----------------- | -------------------------------------------- |
| `glass`           | Recreate as a styled mixin or component      |
| `glass-card`      | Recreate as a styled component               |
| `bg-grid-pattern` | Keep as `className` or recreate with raw CSS |

## 16. Tailwind `transition-*` utilities → CSS `transition`

Tailwind's transition utilities use a specific timing function. Always
use these exact values when replicating them in `styled-components`:

| Tailwind utility       | CSS equivalent                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `transition-all`       | `transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)`                                                                                                                                 |
| `transition`           | `transition: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter 150ms cubic-bezier(0.4, 0, 0.2, 1)` |
| `transition-transform` | `transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`                                                                                                                           |
| `transition-opacity`   | `transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)`                                                                                                                             |
| `transition-colors`    | `transition: color, background-color, border-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)`                                                          |
| `duration-300`         | `transition-duration: 300ms`                                                                                                                                                         |
| `ease-in-out`          | `transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)`                                                                                                                           |

**General rule for `transition-{property}`:** Replace with
`transition: {property} 150ms cubic-bezier(0.4, 0, 0.2, 1)`. When a
`duration-*` modifier accompanies it, substitute that duration value.

**Common mistake:** Omitting the cubic-bezier easing (e.g. writing
`transition: all 150ms` or `transition: transform 500ms`). Tailwind's
default easing is `cubic-bezier(0.4, 0, 0.2, 1)`, not the CSS keyword
`ease` (`cubic-bezier(0.25, 0.1, 0.25, 1)`).

```css
/* transition-transform duration-500 — correct */
transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);

/* wrong — missing cubic-bezier */
transition: transform 500ms;

/* wrong — ease != Tailwind's default easing */
transition: all 0.15s ease;
```

---

## 11. Tailwind animation utilities → `keyframes`

Tailwind's `animate-pulse`, `animate-spin`, and arbitrary
`animate-[...]` values must be replaced with `styled-components`
`keyframes`. Reuse the same keyframe object across all components that
share the animation:

```ts
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  50% { opacity: 0.5; }
`

// animate-pulse (default: 2s, cubic-bezier(0.4, 0, 0.6, 1))
const PulsingEl = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

// animate-pulse with custom duration via inline style={{ animationDuration }}
// — fold the duration directly into the keyframe declaration:
const SlowPulsing = styled.path`
  animation: ${pulse} 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

// animate-[pulse_3s_ease-in-out_infinite]
const EaseInPulsing = styled.path`
  animation: ${pulse} 3s ease-in-out infinite;
`
```

## 12. `filter: drop-shadow` — use raw CSS, not `theme.shadows`

`theme.shadows.*` are `box-shadow` values and must not be used for the
CSS `filter: drop-shadow()` function. Translate `drop-shadow-*`
utilities directly to their CSS `filter` equivalent:

```css
/* drop-shadow-sm */
filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));

/* drop-shadow-md */
filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.07));
```

## 13. Font weights not in the theme scale

`theme.typography.fontWeight` covers `light (300)`, `normal (400)`,
`medium (500)`, `semibold (600)`, and `bold (700)`. Weights outside
this range (`font-extrabold` = 800, `font-black` = 900) have no theme
token. Use the raw numeric value:

```css
/* font-extrabold */
font-weight: 800;

/* font-black */
font-weight: 900;
```

## 14. Next.js `<Image>` with `fill` prop

When a Next.js `<Image fill>` element has `className="object-cover"` (or
similar styling classes), do **not** keep the `className` and do **not** use
an inline `style={{ objectFit: 'cover' }}`. Instead, wrap the component with
`styled()` in the `.styles.ts` file, exactly as you would for any other
third-party component:

```ts
// hero.styles.ts
import Image from 'next/image'
import styled from 'styled-components'

export const DashboardImage = styled(Image)`
  object-fit: cover;
`
```

```tsx
// hero.tsx — no inline style or className needed
<DashboardImage src="/hero-dashboard.png" alt="…" fill sizes="…" priority />
```

This keeps all styling in `.styles.ts` and is consistent with `styled(Icon)`,
`styled(Button)`, etc.

## 15. Custom `animate-*` utilities — verify the class exists before migrating

Before translating a Tailwind `animate-*` class to a `keyframes` animation,
check that the class is actually **defined** in `globals.css` or a CSS plugin:

1. Search `globals.css` for `--animate-<name>` or `@keyframes <name>`.
2. Search the installed animation plugin (e.g., `tw-animate-css`) for the
   same name.

If the class is **not defined anywhere**, it has no visual effect in the
original. Do **not** invent a new animation — omit it entirely rather than
adding behavior that wasn't there before.

If the class **is defined** (e.g., `--animate-float` in `globals.css`),
translate it to a `keyframes` object per §11.

### `tw-animate-css` compound utilities

`tw-animate-css` (used in this project) requires **two classes** for
enter/exit animations: `animate-in` + a modifier like `fade-in`,
`zoom-in`, `slide-in-from-top`, etc. The compound form `animate-fade-in`
(hyphenated, single class) is **not** a valid utility — it has no visual
effect. Only the two-class form `animate-in fade-in` works.

When migrating `animate-fade-in` (or similar), confirm the two-class
form was intended (check adjacent classes). If the class genuinely has
no effect in the original, omit it per the guidance above.

---

## 17. Tailwind `shadow-{color}` → colored `box-shadow`

Tailwind v4 `shadow-{color}` utilities change the shadow **color** while
keeping the geometry from a paired `shadow-{size}` utility. Do **not**
stack `theme.shadows.*` on top of a colored shadow — that produces an
extra (unintended) dark shadow layer.

```tsx
/* shadow-lg shadow-primary/25 */
box-shadow: 0 10px 15px -3px color-mix(in oklch, ${({ theme }) => theme.colors.primary} 25%, transparent),
            0 4px 6px -4px color-mix(in oklch, ${({ theme }) => theme.colors.primary} 25%, transparent);
```

The colored shadow replaces the geometry from `theme.shadows.lg`
(which uses black). Use the same offset/blur/spread values as the named
shadow size, but substitute the color-mixed color:

| Shadow size | Offsets / blur / spread             |
| ----------- | ----------------------------------- |
| `shadow-sm` | `0 1px 3px 0, 0 1px 2px -1px`       |
| `shadow-md` | `0 4px 6px -1px, 0 2px 4px -2px`    |
| `shadow-lg` | `0 10px 15px -3px, 0 4px 6px -4px`  |
| `shadow-xl` | `0 20px 25px -5px, 0 8px 10px -6px` |

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
