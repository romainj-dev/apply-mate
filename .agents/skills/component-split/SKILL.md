---
name: component-split
description: Splits large React components into smaller, focused sub-components following project organization rules. Use when a component has been identified as needing splitting due to size, complexity, or reusability concerns.
---

# Component Split

Splits a component into smaller sub-components, moves styles, updates
imports, and follows the project's organization conventions.

## Before You Start

Read these files:

1. `.cursor/rules/component-organization.mdc` — folder structure, naming,
   split thresholds
2. `.cursor/rules/styled-components-rsc-boundary.mdc` — RSC boundary rules

## Inputs

The agent receives the path to the component file(s) to split, and
optionally guidance on which sub-components to extract.

## Split Process

### Phase 1: Analysis

1. Read the target `.tsx` and `.styles.ts` files fully.
2. Identify split candidates using these signals:
   - Distinct visual sections with their own state or event handlers
   - Conditional JSX blocks > ~30 lines (empty states, loading, error)
   - Groups of styled-components in `.styles.ts` that serve one sub-section
   - Patterns duplicated in other components (candidates for `commons/`)
   - Repeated JSX blocks with identical structure but different data
     (same-file component — see Phase 2)
3. Skip extraction for inline pieces < 20 lines used only once.
4. **Produce a split plan before making changes.** List each proposed
   sub-component with: name, responsibility, which JSX/state/styles move,
   and the props interface it will need.

### Phase 2: Execution

Choose the right extraction strategy for each candidate:

#### A. Same-file component (no new folder)

Use when repeated JSX blocks share the same structure but differ only
by data (text, icons, URLs, variants). These are tightly coupled to the
parent and too small to justify a separate folder.

1. Define a props interface for the varying data.
2. Create a small component function in the **same `.tsx` file**, above
   the parent component.
3. Replace each repeated block with a `<Component {...data} />` call.
4. Styled-components stay in the parent's `.styles.ts` — no new file.

#### B. Subfolder component (new folder)

Use when the sub-component has its own state, handlers, or is large
enough to be understood independently.

1. **Create folder** inside the parent: `parent-folder/sub-component-name/`
2. **Create `SubComponent.tsx`:**
   - Move the relevant JSX, state, handlers, and hooks.
   - Define a typed props interface for data/callbacks from the parent.
   - Add `'use client'` if the component uses styled-components (default).
   - Named exports only.
3. **Create `SubComponent.styles.ts`:**
   - Move the styled-components that belong to this sub-component.
   - Keep theme token usage consistent.
4. **Update the parent:**
   - Import and render the new sub-component.
   - Remove moved styled-component imports and unused imports.
5. **Update all external imports** across the codebase if the parent's
   public API changed (renamed exports, moved types).

### Phase 3: Deduplication Check

After splitting, check if any extracted pattern already exists in or
should be promoted to:

- `components/commons/` — used across features
- `components/features/<domain>/commons/` — used within one feature

If a near-identical component exists, reuse it instead of creating a
duplicate.

## Naming

Follow `.cursor/rules/component-organization.mdc`:

- Folders: `kebab-case`
- Component files: `PascalCase.tsx`
- Style files: `PascalCase.styles.ts`
- Server components: `PascalCase.server.tsx`

## Props Design

- Keep the interface minimal — only pass what the sub-component needs.
- If passing > 5 props, reconsider the split boundary.
- Use callbacks (`onX`) for child-to-parent communication.
- Use `React.ReactNode` slots for flexible composition.
- Type all props explicitly (no `any`).

## Validation

After completing the split:

1. `pnpm type-check` (from `apps/web`) — must pass.
2. `pnpm build` — must succeed.
3. No broken imports across the codebase.
4. No orphaned styled-components in the parent styles file.

## Report Format

```markdown
# Component Split Report

## Component: `<path>`

### Split Plan

- Original: N lines TSX, M lines styles
- Sub-components extracted: N

### Extracted Components

| Sub-component | Responsibility | Lines |
| ------------- | -------------- | ----- |
| `name/`       | description    | N     |

### Parent After Split

- Lines: N (was M)
- Styles: N (was M)

### Deduplication

- Patterns promoted to commons: N
- Existing commons reused: N

### Validation

- Type check: pass/fail
- Build: pass/fail
```
