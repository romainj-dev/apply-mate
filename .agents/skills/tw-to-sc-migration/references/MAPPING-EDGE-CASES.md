# Tailwind -> styled-components Edge Cases

Read this only when core mapping is insufficient.

## E1) Radix primitive preservation

If original code imports a Radix primitive directly (for example
`@radix-ui/react-progress`), preserve that pattern during migration.
Do not swap to a shadcn wrapper unless intentionally refactoring behavior.

## E2) Removing shadcn `Input` focus ring

When original classes include `focus-visible:ring-0
focus-visible:ring-offset-0`, mirror in styled wrapper:

```ts
export const StyledInput = styled(Input)`
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`
```

`ring-0` maps to `box-shadow: none` (not `ring: none`).

## E3) Custom utilities from `globals.css`

Utilities with no theme equivalent are handled case by case:

- `glass` -> recreate as styled mixin/component
- `glass-card` -> recreate as styled component
- `bg-grid-pattern` -> keep as className or recreate with raw CSS

## E4) Tailwind `transition-*` utilities

Preserve Tailwind easing (`cubic-bezier(0.4, 0, 0.2, 1)`), not CSS
default `ease`.

The CSS `transition` shorthand requires every property to carry its own
duration. Listing properties comma-separated without individual durations
is **invalid** — only the last item gets the timing.

**WRONG** (only `stroke` gets the duration):

```css
transition:
  color,
  background-color,
  fill,
  stroke 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

**CORRECT** — use `all` for Tailwind's multi-property `transition` utility:

```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

Use `all` when Tailwind's base `transition` utility (which targets color,
background-color, border-color, etc.) is intended. For single-property
transitions, be explicit:

- `transition-all` -> `transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)`
- `transition` (no `-all`) -> `transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)`
- `transition-transform duration-500` ->
  `transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1)`
- `transition-colors` -> `transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)`

## E5) Tailwind animation utilities

`animate-*` utilities map to styled-components `keyframes`.

Before migrating custom `animate-*` classes:

1. Verify class exists in `globals.css` or plugin config.
2. If not defined, omit it (do not invent behavior).

`tw-animate-css` note:

- valid enter/exit form is two classes (`animate-in` + modifier like
  `fade-in`)
- single-class `animate-fade-in` is usually invalid/no-op

## E6) `filter: drop-shadow` vs `theme.shadows`

`theme.shadows.*` are `box-shadow` values, not `filter: drop-shadow`.
Translate `drop-shadow-*` utilities directly to `filter` CSS.

## E7) Font weights missing from theme

If theme lacks weight (for example 800, 900), use raw numeric values:

- `font-extrabold` -> `font-weight: 800`
- `font-black` -> `font-weight: 900`

## E8) Next.js `<Image fill>` styling

For `Image fill` with styling classes like `object-cover`, wrap with
`styled(Image)` in `.styles.ts` instead of keeping className/inline style.

## E9) Tailwind `shadow-{color}`

`shadow-{color}` changes shadow color while preserving geometry from
paired shadow size utility. Do not stack `theme.shadows.*` on top of it.
Use explicit colored `box-shadow` layers with `color-mix()` as needed.

## E10) Framer Motion: `styled(motion.*)`

When a component uses both Framer Motion and styled-components, wrap
the `motion.*` primitive with `styled()` in the `.styles.ts` file.
All Framer Motion props (`animate`, `initial`, `whileHover`, `layoutId`,
etc.) are forwarded correctly through the styled wrapper.

```ts
// hero.styles.ts
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const HeroCard = styled(motion.div)`
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
`
```

```tsx
// hero.tsx
<HeroCard
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.02 }}
>
  ...
</HeroCard>
```

Use the parent-reference selector pattern (MAPPING-CORE.md §5) for
hover-triggered child styling. The styled motion component acts as a
regular styled component for selector purposes:

```ts
export const BubbleWrapper = styled(motion.div)``
export const BubbleInner = styled.div`
  ${BubbleWrapper}:hover & {
    box-shadow: ...;
  }
`
```

## E11) Responsive Lucide icon sizing

When a Lucide icon has responsive Tailwind sizing (`h-5 w-5 sm:h-6 sm:w-6`),
keep sizing in CSS (not JSX props) and:

**Wrap with `styled()`** and override `width`/`height` in the
`belowMobile` media query. Use only when the size delta is visually
significant and the icon is a prominent UI element.

If a reusable icon abstraction genuinely needs runtime visual overrides,
document that intent and allow overrides there (consistent with core rule §7).
