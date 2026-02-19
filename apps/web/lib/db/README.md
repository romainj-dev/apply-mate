# Data layer

## Type flow: single source of truth

The Drizzle schema is the only place where column definitions live. Every
other layer derives its types from it — nothing is hand-written twice.

```
lib/db/schema/*.ts          ← single source of truth (Drizzle tables)
        │
        ├─ drizzle-zod createInsertSchema()
        │       └─ lib/db/services/*-service.ts
        │               • runtime input validation (parse before DB write)
        │               • exports NormalizedXxx / UpsertXxxInput types
        │               • consumed by resume parsers, API mutations, etc.
        │
        ├─ InferSelectModel<typeof table>
        │       └─ app/api/graphql/schema/*.ts  (Pothos objectRef<RowType>)
        │               • resolver return types are the raw Drizzle row shapes
        │               • no hand-written TypeScript interfaces per entity
        │
        └─ Pothos builder  →  graphql/schema.graphql  (generated, do not edit)
                                        │
                                        └─ pnpm codegen:graphql
                                                └─ graphql/generated/index.ts
                                                        • TypeScript types for
                                                          every operation/fragment
                                                        • React Query hooks
```

### Adding a column to an existing entity

1. Write a Supabase migration (`supabase/migrations/*.sql`).
2. Add the column to the matching Drizzle table in `lib/db/schema/`.
3. If it is a `jsonb` column with a custom `.$type<>()` annotation, add a
   matching override to the `createInsertSchema` call in the service file (see
   `jsonbRecord` in `experience-service.ts` for the pattern).
4. Add the field to the Pothos `implement` block in
   `app/api/graphql/schema/<entity>.ts` if it should be exposed over GraphQL.
5. Run `pnpm codegen:graphql` to regenerate `graphql/generated/index.ts`.

No other files need to change for steps 1–3. TypeScript will surface
missing required columns at the service insert call if they are not handled.

---

## Migration rules

- `supabase/migrations/*.sql` owns DDL — never use Drizzle schema push in
  production.
- When a migration changes tables, relations, or enum values, update the
  matching files in `lib/db/schema/` in the same PR.
- Keep `pgEnum()` values in sync with the SQL enum definition.

## Reviewer checklist

- Migration SQL exists for each schema change.
- Drizzle tables/relations match migration SQL.
- `pnpm tsc --noEmit` passes.
- `pnpm codegen:graphql` was re-run if GraphQL surface changed.

---

## DB client configuration

Drizzle + `postgres.js` is configured for Supabase Supavisor in
**transaction mode** behind a pooler connection string.

### Why transaction mode

On Vercel (serverless), each cold start can spawn a new Node process.
Direct PostgreSQL connections can quickly hit the free-tier limit (60).
Supavisor multiplexes many short-lived client connections into a smaller
pool of real PostgreSQL backends (free tier allows 200 pooled connections).

### Key settings

- `prepare: false`: required for transaction-mode pooling because prepared
  statements are session-scoped, while backend connections are reused across
  clients between transactions.
- `max: 4`: caps concurrent PostgreSQL connections _per serverless function
  instance_. SSR page renders with parallel prefetching rarely exceed 3-4
  concurrent queries, so 4 keeps headroom low. With around 10 warm Vercel
  instances at peak, this is around 40 Supavisor connections, well within
  the 200-connection limit.

### Dev singleton (`globalForDb`)

In development, Next.js HMR re-evaluates this module on each save. Caching
the client on `globalThis` prevents connection leaks.

In production, this guard is unnecessary: the module-level `const` already
acts as a singleton within each serverless process, and there is no HMR.
