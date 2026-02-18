/**
 * Drizzle + postgres.js client — configured for Supabase Supavisor
 * in **transaction mode** behind a pooler connection string.
 *
 * Why Supavisor transaction mode?
 * -----------------------------------------------------------------------
 * On Vercel (serverless), every cold-start spins up its own Node process.
 * Direct PG connections would quickly exhaust the free-tier limit (60).
 * Supavisor multiplexes many short-lived client connections into a small
 * pool of real PG backends (free tier allows 200 pooled connections).
 *
 * Key settings:
 *   • prepare: false  — required by transaction-mode pooling because
 *     prepared statements are session-scoped and the backend connection
 *     is shared across clients between transactions.
 *   • max: 4          — caps concurrent PG connections *per* serverless
 *     function instance. SSR page renders with parallel prefetching
 *     rarely exceed 3-4 concurrent queries, so 4 is sufficient while
 *     keeping headroom low. With ~10 warm Vercel instances at peak this
 *     means ~40 Supavisor connections — well within the 200 limit.
 *
 * Dev singleton (globalForDb):
 *   In development, Next.js HMR re-evaluates this module on every save.
 *   Caching the client on globalThis prevents leaking connections.
 *   In production this guard is unnecessary: the module-level `const`
 *   already acts as a singleton within each serverless process, and
 *   there is no HMR.
 */
import { parseBffEnv } from '@shared/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const env = parseBffEnv()

type SqlClient = ReturnType<typeof postgres>
type Database = ReturnType<typeof drizzle<typeof schema>>

const globalForDb = globalThis as unknown as {
  sqlClient?: SqlClient
  db?: Database
}

const sqlClient =
  globalForDb.sqlClient ??
  postgres(env.DATABASE_URL, {
    prepare: false,
    max: 4,
  })

export const db =
  globalForDb.db ??
  drizzle(sqlClient, {
    schema,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForDb.sqlClient = sqlClient
  globalForDb.db = db
}
