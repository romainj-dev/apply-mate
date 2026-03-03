---
name: tw-to-sc-review
description: Reviews components migrated from Tailwind CSS to styled-components. Use after a batch migration to verify correctness, especially RSC boundary decisions, theme-token usage, and undocumented decisions made by the migrator.
---

# Tailwind → styled-components Migration Review

Reviews the output of the `tw-to-sc-migrator` agent. Catches
correctness issues, flags undocumented decisions, and feeds
improvements back into the migrator skill.

## Before You Start

Read these files to understand the rules the migrator was following:

1. `.agents/skills/tw-to-sc-migration/SKILL.md` — migrator process & rules
2. `.agents/skills/tw-to-sc-migration/references/MAPPING.md` — mapping conventions
3. `.cursor/rules/styled-components-rsc-boundary.mdc` — RSC boundary guide
4. `apps/web/styles/theme.ts` — available theme tokens

## Inputs

The reviewer receives a list of migrated component files (`.tsx` +
`.styles.ts` pairs). For each pair, run the full review process below.

## Review Process

For each component:

1. **Read** both the `.tsx` component and the `.styles.ts` file.
2. **Read** the original component if available via `git show HEAD~1:<path>`
   or `git diff HEAD -- <path>` to understand what was migrated.
3. Run every check in the [Review Checklist](#review-checklist).
4. Classify each finding as a **correctness issue** or an
   **undocumented decision** (see [Handling Undocumented Decisions](#handling-undocumented-decisions)).
5. **Fix** correctness issues directly in the code.
6. For undocumented decisions, follow the assessment + skill-update
   flow described below.
7. After all files are reviewed, produce the
   [Review Report](#review-report).

## Review Checklist

### A. RSC Boundary (critical)

| #   | Check                                                                                                                                  | How to verify                                                                             |
| --- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| A1  | `'use client'` is present in every file that imports from a `.styles.ts` file                                                          | Read the first line of the `.tsx` file                                                    |
| A2  | `'use client'` was **not** added to a file that uses server-only APIs (`async` component, `cookies()`, `headers()`, direct DB queries) | Scan component body for server-only patterns                                              |
| A3  | If a server component needed styled markup, the **slot pattern** was used (not an intermediate `-client.tsx` wrapper)                  | Check for new `-client.tsx` files; check whether server data is passed via props/children |
| A4  | Components that were **already** `'use client'` before migration remain so                                                             | Compare with git history                                                                  |
| A5  | No server component is imported by a `'use client'` file (would pull it into the client bundle)                                        | Check all imports in `'use client'` files for async/server components                     |

### B. Theme Token Usage

| #   | Check                                                                                                                                     | How to verify                                                                                       |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| B1  | Colors use `theme.colors.*` — no hardcoded hex/rgb/oklch literals for design tokens                                                       | Search `.styles.ts` for hex (`#`), `rgb(`, `oklch(` patterns that don't appear inside `color-mix()` |
| B2  | Spacing uses `theme.space.*` or `theme.spaceCalc(n)` — not raw pixel/rem values for spacing that maps to the design scale                 | Cross-reference spacing values against the theme scale                                              |
| B3  | Typography uses `theme.typography.*` for font-size, font-weight, line-height, font-family                                                 | Search for raw font declarations                                                                    |
| B4  | Border-radius uses `theme.radii.*`                                                                                                        | Search for raw radius values                                                                        |
| B5  | Shadows use `theme.shadows.*`                                                                                                             | Search for raw shadow values                                                                        |
| B6  | Layout dimensions (`width`, `height`, `max-width`, `min-height`) use **raw CSS values** (these are NOT design tokens — per MAPPING.md §6) | Verify no `theme.space.*` used for widths/heights                                                   |
| B7  | Opacity modifiers use `color-mix(in oklch, ...)` pattern per MAPPING.md §2                                                                | Check any opacity usage                                                                             |

### C. Styled-Components Patterns

| #   | Check                                                                                                                | How to verify                                              |
| --- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| C1  | `.styles.ts` is co-located next to the component                                                                     | Verify file placement                                      |
| C2  | Styled components use semantic names (`Section`, `Container`, `Title`), `Styled` prefix only for collisions          | Review named exports                                       |
| C3  | Transient props use `$` prefix to avoid DOM forwarding                                                               | Search for `<.*Props>` interfaces in `.styles.ts`          |
| C4  | No remaining `className` with Tailwind utilities on any element (plain HTML or ui component consumers)               | Search `.tsx` for `className` containing Tailwind patterns |
| C5  | No remaining `cn()` import from `@/lib/utils` (unless still needed for non-Tailwind logic)                           | Search imports                                             |
| C6  | UI components (`components/ui/*`) consumers handled correctly: built-in props preferred, `styled()` wrap when needed | Review how `Button`, `Badge`, `Input`, etc. are used       |
| C7  | Conditional classes converted to transient props, not inline ternaries in template literals                          | Review styled component interpolations                     |

### D. Responsive & Interactive

| #   | Check                                                                                             | How to verify                       |
| --- | ------------------------------------------------------------------------------------------------- | ----------------------------------- |
| D1  | Responsive styles use `theme.media.belowTablet` / `belowMobile` (desktop-first, not mobile-first) | Search for `@media` in `.styles.ts` |
| D2  | `group-hover:` patterns converted to parent component reference pattern per MAPPING.md §5         | Search for hover-related styles     |
| D3  | Gradients use `linear-gradient()` with theme colors per MAPPING.md §3                             | Search for gradient usage           |

### E. Code Quality

| #   | Check                                                         | How to verify                                           |
| --- | ------------------------------------------------------------- | ------------------------------------------------------- |
| E1  | Named exports only — no default exports                       | Check export statements                                 |
| E2  | No inline `style` attributes that should be styled-components | Search `.tsx` for `style=`                              |
| E3  | No unused imports left behind from migration                  | Check for unused `cn`, removed Tailwind utility imports |
| E4  | TypeScript types are preserved and correct                    | Check for type errors via linter                        |

## Handling Undocumented Decisions

An **undocumented decision** is any choice the migrator made that is
NOT covered by the migrator skill (`SKILL.md`), `MAPPING.md`, or the
RSC boundary rule. Examples:

- Wrapping a Lucide icon with `styled()` for sizing
- Using inline `style` for one-off spacing on a third-party component
- Creating a local styled `div` named `GlassCard` instead of using the
  shared `GlassCard` component
- Hardcoding colors that don't exist in the theme token set
- Choosing how to handle animation keyframes

For each undocumented decision:

### Step 1 — Assess Correctness

Ask these questions:

1. **Does the output match the original Tailwind behavior?**
   Compare the CSS output semantically (not character-by-character).
2. **Does it follow the project's conventions?** (theme tokens,
   file organization, naming)
3. **Is it the simplest correct approach?** Could it be simpler
   without losing correctness?
4. **Does it introduce any new problems?** (DOM prop warnings,
   accessibility regressions, bundle impact)

Record a verdict: `correct`, `correct-but-improvable`, or `incorrect`.

### Step 2 — Fix if Incorrect

If the decision was incorrect, fix the code directly.

### Step 3 — Update the Migrator Skill

Whether the decision was correct or not, if the scenario is likely to
recur, add guidance to the migrator skill so future migrations handle
it consistently. Choose the right file to update:

| Scenario type                                                                   | Update target                                                                                |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| A new mapping convention (e.g., how to handle icons, animations, inline styles) | `.agents/skills/tw-to-sc-migration/references/MAPPING.md` — add a new numbered section       |
| A process-level gap (e.g., when to use shared components vs local styled divs)  | `.agents/skills/tw-to-sc-migration/SKILL.md` — add to the relevant section                   |
| An RSC boundary edge case                                                       | `.cursor/rules/styled-components-rsc-boundary.mdc` — add to Common Mistakes or Decision Flow |

When updating, follow the existing document's tone and format. Add the
new guidance in the most logical location. Keep it concise.

## Review Report

After reviewing all files, produce a structured report:

```markdown
# Migration Review Report

## Summary

- Files reviewed: N
- Correctness issues found: N (fixed: N)
- Undocumented decisions found: N
- Skill updates made: N

## Per-File Results

### `<component-path>`

- **Status**: pass | issues-found
- **RSC boundary**: correct | issue (describe)
- **Theme tokens**: correct | issue (describe)
- **Findings**:
  - [checklist-id] description — severity — action taken
- **Undocumented decisions**:
  - description — verdict — skill update (if any)

## Skill Updates Made

- `<file-path>`: description of what was added/changed
```

## Validation

After all fixes, run:

1. `pnpm type-check` (from `apps/web`) — type-checking must pass.
2. `pnpm build` — production build must succeed.

Report the result of both commands in the review report.
