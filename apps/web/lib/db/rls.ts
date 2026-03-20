import 'server-only'

import { sql } from 'drizzle-orm'
import type { ExtractTablesWithRelations } from 'drizzle-orm'
import type { PgTransaction } from 'drizzle-orm/pg-core'
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import { db } from './client'
import type * as schema from './schema'

/**
 * A Drizzle transaction scoped to a single request.
 * Inside the transaction the Postgres role is `app_user` and the custom GUC
 * `app.current_user_id` is set, so all RLS policies are enforced.
 */
export type RlsTransaction = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>

/**
 * Run a callback inside a transaction where:
 *   1. The Postgres role is downgraded to `app_user` (subject to RLS).
 *   2. `app.current_user_id` is set to the authenticated user's UUID.
 *
 * All user-scoped queries MUST go through this wrapper so that RLS is the
 * primary enforcement layer.
 *
 * @example
 * const profile = await withRlsDb(session.user.id, (tx) =>
 *   getExperienceProfile(tx)
 * )
 */
export async function withRlsDb<T>(
  userId: string,
  fn: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.execute(sql`SET LOCAL ROLE app_user`)
    await tx.execute(
      sql`SELECT set_config('app.current_user_id', ${userId}, true)`
    )
    return fn(tx)
  })
}
