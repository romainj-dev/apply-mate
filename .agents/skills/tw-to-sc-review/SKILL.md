---
name: tw-to-sc-review
description: Fast sanity review for components migrated from Tailwind CSS to styled-components. Prioritizes correctness risks and enforces mandatory handling of undocumented decisions.
---

# Tailwind -> styled-components Migration Review

Reviews output from `tw-to-sc-migrator` with a fast default workflow.
This skill is optimized for speed while still enforcing strict handling
of undocumented decisions.

## Review Scope

Always run a fast sanity review focused on high-signal correctness risks.

## Before You Start

Read these files first:

1. `.agents/skills/tw-to-sc-migration/SKILL.md`
2. `.agents/skills/tw-to-sc-migration/references/MAPPING-CORE.md`
3. `.cursor/rules/styled-components-rsc-boundary.mdc`
4. `apps/web/styles/theme.ts`

Read `.agents/skills/tw-to-sc-migration/references/MAPPING-EDGE-CASES.md`
only when a finding is not covered by core mapping rules.

## Inputs

The reviewer receives migrated component pairs (`.tsx` + `.styles.ts`).

## Sanity Review Process

For each component pair:

1. Read the `.tsx` and `.styles.ts` files.
2. Run the [Sanity Checklist](#sanity-checklist).
3. Detect and process all [Undocumented Decisions](#handling-undocumented-decisions-mandatory).
4. Fix correctness issues directly.
5. Only compare with previous git version when behavior is unclear or an
   undocumented decision needs baseline confirmation.
6. Produce a concise report using the [Report Format](#report-format).

## Sanity Checklist

Run only these checks.

### S1. RSC Boundary (critical)

- `'use client'` exists where required by styled-components usage.
- No server-only API usage in a file marked `'use client'`.
- No server component imported into a client component in a way that
  breaks boundaries.

### S2. Tailwind Residue

- No Tailwind utility strings left in `className`.
- No stale `cn()` usage that only existed for Tailwind composition.

### S3. Tokenization (high signal only)

- Flag clearly tokenizable hardcoded values:
  - colors (`#`, `rgb`, `oklch`) that should be `theme.colors.*`
  - obvious spacing/radius/shadow values that should use theme tokens
- Do not enforce exhaustive token substitution in sanity mode.

### S4. Styled-Components Correctness

- Transient props use `$` when needed to avoid DOM prop forwarding.
- No obvious migration regressions (broken conditional styling or removed
  state styling).

### S5. Responsive/Interaction Sanity

- If the original component had responsive or hover behavior, verify that
  equivalent behavior still exists.

## Handling Undocumented Decisions (mandatory)

This section is mandatory. Do not skip.

An undocumented decision is any migration choice not covered by:

- `.agents/skills/tw-to-sc-migration/SKILL.md`
- `.agents/skills/tw-to-sc-migration/references/MAPPING-CORE.md`
- `.agents/skills/tw-to-sc-migration/references/MAPPING-EDGE-CASES.md`
- `.cursor/rules/styled-components-rsc-boundary.mdc`

Examples:

- Wrapping icons/components with `styled()` without documented guidance
- Introducing one-off inline styles for spacing or layout
- Choosing local styled wrappers instead of shared UI components
- Introducing custom animation handling not documented by mapping rules

For each undocumented decision:

1. Assess correctness:
   - behavior parity with original intent
   - convention fit (tokens, naming, structure)
   - simplicity of approach
   - new risk introduced (a11y, DOM warnings, bundle impact)
2. Record verdict: `correct`, `correct-but-improvable`, or `incorrect`.
3. Fix code if verdict is `incorrect`.
4. If scenario is likely to recur, update migrator guidance immediately:
   - core recurring convention ->
     `.agents/skills/tw-to-sc-migration/references/MAPPING-CORE.md`
   - edge-case convention ->
     `.agents/skills/tw-to-sc-migration/references/MAPPING-EDGE-CASES.md`
   - process gap -> `.agents/skills/tw-to-sc-migration/SKILL.md`
   - RSC edge case -> `.cursor/rules/styled-components-rsc-boundary.mdc`

## Validation

- Run lightweight checks only (for example, type/lint checks relevant to
  touched files or app-level type check if already standard in the flow).
- Skip full production build by default.

## Report Format

Use a concise report:

```markdown
# Migration Review Report

## Summary
- Files reviewed: N
- Correctness issues: N (fixed: N)
- Undocumented decisions: N
- Skill updates made: N

## Per-File Results
### `<component-path>`
- Status: pass | issues-found
- Critical findings:
  - [Sx] description - severity - action
- Undocumented decisions:
  - description - verdict - skill update (if any)

## Validation
- Checks run: ...
- Result: pass | issues
```
