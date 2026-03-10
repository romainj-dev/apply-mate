---
name: ts-standards-migration
description: Process and workflow for migrating TypeScript/TSX files to project standards. Standards themselves are defined in .cursor/rules/typescript-standards.mdc — this skill covers only the migration process.
---

# TypeScript Standards Migration

The standards you are enforcing are in `.cursor/rules/typescript-standards.mdc`. Read that file
before this one — this skill only defines the migration workflow.

## Violation → fix mapping

| Violation                                                   | Fix                                          |
| ----------------------------------------------------------- | -------------------------------------------- | ----- | --------------------------------------- |
| `interface` for data/DTOs (no `Props` suffix, no `extends`) | Change to `type`                             |
| `type XxxProps =` for React component props                 | Change to `interface XxxProps`               |
| `any` in type position                                      | Replace with `unknown` + add type guard      |
| `} as ConcreteType` on object literals                      | Change to `satisfies ConcreteType`           |
| `error as X` or `catch (e: any)`                            | Replace with `instanceof` guard              |
| `as { field: string }` without `                            | undefined`                                   | Add ` | undefined` to all fields, then validate |
| Exported function with no return type annotation            | Infer from body, add explicit `: ReturnType` |
| Mutable literal object used as constant                     | Add `as const`                               |

## Per-file workflow

1. **Read** the file completely
2. **List** all violations found, cross-referencing the rule
3. **Fix** one violation category at a time, top to bottom in the file
4. **Run ReadLints** after editing — fix any introduced type errors before continuing
5. **Log** each change in the running summary

## Constraints

- Never change business logic — only TypeScript types
- Infer return types from the function body; never guess or use `any`
- When a migration is ambiguous or risky, leave `// TODO(ts-migration): <reason>` and include it in the summary
- Preserve all imports, exports, and module structure

## Output format

```
## Migration Summary

### Changed
- `apps/web/lib/api.ts`: 3 fixes (any → unknown ×2, missing return type ×1)
- `apps/web/components/Button.tsx`: 1 fix (type → interface for props)

### TODOs
- `apps/web/lib/complex.ts` line 45: return type ambiguous — TODO left in file

### Linter status
All files pass ReadLints with no new errors.
```
