import { asc } from 'drizzle-orm'
// eslint-disable-next-line no-restricted-imports -- Public read: plans are visible to all users.
import { db } from '@/lib/db/client'
import { plans } from '@/lib/db/schema'

type PlanRecord = typeof plans.$inferSelect

export async function listPlans(): Promise<PlanRecord[]> {
  return db.select().from(plans).orderBy(asc(plans.price))
}
