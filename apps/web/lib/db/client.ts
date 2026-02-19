import { parseBffEnv } from '@shared/env'
import { drizzle } from 'drizzle-orm/postgres-js/driver'
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
