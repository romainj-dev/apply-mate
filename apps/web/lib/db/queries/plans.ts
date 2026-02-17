import { asc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { plans } from '@/lib/db/schema'

export async function listPlans() {
  return db.select().from(plans).orderBy(asc(plans.price))
}
