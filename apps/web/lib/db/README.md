# Drizzle schema workflow

`supabase/migrations/*.sql` is the schema source of truth.

## Rules

- When a migration changes tables, relations, or enum values, update the
  matching Drizzle schema files in `apps/web/lib/db/schema/` in the same PR.
- Do not use Drizzle schema push in production. Supabase migrations own DB DDL.
- Keep enum definitions synchronized between SQL migrations and `pgEnum()`.

## Reviewer checklist

- Migration SQL exists for each schema change.
- Drizzle tables/relations match migration SQL.
- App code using changed columns compiles and type-checks.
