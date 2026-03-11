import { asc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { plans } from '@/lib/db/schema'

type PlanRecord = typeof plans.$inferSelect

export async function listPlans(): Promise<PlanRecord[]> {
  return db.select().from(plans).orderBy(asc(plans.price))
}
