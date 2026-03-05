---
name: tw-to-sc-migration
description: Migrates React components from Tailwind CSS utility classes to styled-components using the app theme. Use when converting className-based Tailwind styling to styled-components, or when the user mentions migrating, converting, or removing Tailwind from feature code.
---

# Tailwind to styled-components Migration

Converts components from Tailwind utility classes (`className`) to
styled-components using the typed theme at `apps/web/styles/theme.ts`.

## Before You Start

Read these files to understand the codebase conventions:

- `apps/web/styles/theme.ts` — available theme tokens
- `apps/web/types/styled.d.ts` — TypeScript theme augmentation
- `.cursor/rules/styled-components-rsc-boundary.mdc` — RSC vs Client
  Component decision guide (styled-components requires `'use client'`)

For non-obvious mapping decisions, read:

- [references/MAPPING-CORE.md](references/MAPPING-CORE.md) first
- [references/MAPPING-EDGE-CASES.md](references/MAPPING-EDGE-CASES.md)
  only when a case is not covered by core guidance

## Scope

- **Migrate**: all components outside `components/ui/` and all app
  layouts/pages that use Tailwind utility classes.
- **Do NOT touch internals of**: `components/ui/*` (shadcn primitives
  keep Tailwind internally).
- **Do migrate**: Tailwind `className` overrides passed to
  `components/ui/*` elements from the outside. Use the component's
  built-in variant/size props when they cover the styling, or wrap in a
  styled component when custom CSS is needed.

## Migration Process

For each component file:

1. **Read** the component and identify every `className` with Tailwind utilities.
2. **Migrate all Tailwind classNames** — on both plain HTML elements and
   `components/ui/*` consumers. For ui components, prefer the built-in
   variant/size props first; wrap in a styled component only when the
   variant API doesn't cover the needed styling.
3. **Ensure client boundary.** If the component file lacks `'use client'`,
   follow the decision flow in
   `.cursor/rules/styled-components-rsc-boundary.mdc`:
   - No server-only APIs → add `'use client'`.
   - Server-only APIs present → apply the Server/Client split pattern
     (extract styled markup into a `'use client'` component, pass server
     data via props or a children slot).
4. **Create** a co-located `*.styles.ts` file with styled component
   definitions (e.g., `hero.styles.ts` next to `hero.tsx`).
5. **Map** each Tailwind utility to its theme-token equivalent using
   `references/MAPPING-CORE.md`. If unresolved, consult
   `references/MAPPING-EDGE-CASES.md`.
   Do not add Tailwind trace comments in output code (for example
   `/* max-w-2xl */` or `/* shadow-xl shadow-primary/25 */`).
6. **Replace** Tailwind-styled HTML elements with styled components in
   the component file.
7. **Convert** conditional classes (`cn(base, cond && cls)`) to transient
   props (`$isActive`, `$variant`).
8. **Remove** the `cn` import if no longer needed.
9. **Verify** the result against the checklist below.

## File Conventions

### Styled file naming

Co-locate a `<component-name>.styles.ts` next to the component:

```
features/marketing/
├── hero.tsx
├── hero.styles.ts    ← styled components
├── pricing.tsx
└── pricing.styles.ts
```

### Exports

- Named exports only — no default exports.
- Prefix styled components with `Styled` only when a name collision
  exists. Prefer semantic names: `Section`, `Container`, `Title`.
- Do not add Tailwind trace comments in output code (for example
  `/* max-w-2xl */` or `/* shadow-xl shadow-primary/25 */`). Keep
  comments only for non-obvious rationale.

### Transient props

Use the `$` prefix for props that control styling but should not forward
to the DOM:

```tsx
interface WrapperProps {
  $isActive: boolean
}

const NavLink = styled.a<WrapperProps>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.mutedForeground};
`
```

## Handling UI Component consumers

Tailwind is only allowed **inside** `components/ui/*` files. Tailwind
`className` overrides passed to ui components from outside must be
removed. In order of preference:

0. **Check for redundancy first.** Before wrapping or styling, verify
   whether the Tailwind className override duplicates styling already
   provided by the component's active variant. If so, drop the
   `className` entirely — no migration step is required.

   ```tsx
   // GlassCard variant="accent" already applies border-orange-200 internally.
   // The explicit className is redundant → drop it.
   // Before:
   <GlassCard variant="accent" className="border-orange-200">
   // After:
   <GlassCard variant="accent">
   ```

1. **Use built-in props.** If the component's variant/size API already
   covers the styling, drop the `className` entirely:

   ```tsx
   // Before — redundant className override
   <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">

   // After — default variant already applies these styles
   <Button size="sm">
   ```

2. **Wrap in a styled component.** When the variant API is not enough,
   wrap the ui component with `styled()` in a `*.styles.ts` file:

   ```tsx
   // button-cta.styles.ts
   import { Button } from '@/components/ui/button'
   import styled from 'styled-components'

   export const CtaButton = styled(Button)`
     height: 3rem;
     padding-inline: ${({ theme }) => theme.space.xl};
     border-radius: ${({ theme }) => theme.radii.full};
   `
   ```

## Before/After Example

See the worked transform in
[references/MAPPING-EXAMPLES.md](references/MAPPING-EXAMPLES.md).

## Validation

### Code review checklist

- [ ] No Tailwind `className` on any element (plain HTML or ui component consumers)
- [ ] No `cn()` import from `@/lib/utils`
- [ ] Design tokens (colors, spacing, typography, radii, shadows) use `theme.*`
- [ ] Style-related values are in `*.styles.ts` (including icon visual props
      like `size`/`color` and inline `style={{ ... }}`).
- [ ] Exception only for clearly reusable icon abstractions with documented
      visual-prop override intent.
- [ ] Layout dimensions (`width`, `height`, `max-width`, `min-height`, etc.)
      use plain CSS values — these are not design tokens
- [ ] Responsive styles use `theme.media.belowTablet` / `belowMobile`
- [ ] Transient props use `$` prefix
- [ ] `*.styles.ts` file is co-located with the component
- [ ] `'use client'` is present (added or preserved) per the RSC boundary rule

### Build verification

Run both commands after migration and fix any errors before considering
the migration complete:

1. `pnpm type-check` (from `apps/web`) — type-checking must pass.
2. `pnpm build` — the production build must succeed. RSC boundary
   violations (e.g., `theme` is `undefined`) surface here as runtime
   errors. If they occur, follow
   `.cursor/rules/styled-components-rsc-boundary.mdc` to resolve them.
