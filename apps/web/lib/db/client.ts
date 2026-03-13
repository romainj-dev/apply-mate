import { parseBffEnv } from '@shared/env'
import { drizzle } from 'drizzle-orm/postgres-js/driver'
import postgres from 'postgres'
import * as schema from './schema'

const env = parseBffEnv()

type SqlClient = ReturnType<typeof postgres>
type Database = ReturnType<typeof drizzle<typeof schema>>

declare global {
  var sqlClient: SqlClient | undefined
  var db: Database | undefined
}

const sqlClient =
  globalThis.sqlClient ??
  postgres(env.DATABASE_URL, {
    prepare: false,
    max: 4,
  })

export const db =
  globalThis.db ??
  drizzle(sqlClient, {
    schema,
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis.sqlClient = sqlClient
  globalThis.db = db
}
