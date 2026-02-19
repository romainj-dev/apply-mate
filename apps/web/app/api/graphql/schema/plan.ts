import { listPlans } from '@/lib/db/queries/plans'
import type { InferSelectModel } from 'drizzle-orm'
import * as schema from '@/lib/db/schema'
import { builder } from './builder'

export const PlanRef = builder.objectRef<
  InferSelectModel<typeof schema.plans>
>('PlanModel')

PlanRef.implement({
  fields: (t) => ({
    id: t.exposeString('id'),
    code: t.exposeString('code'),
    price: t.exposeFloat('price'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

builder.queryField('plans', (t) =>
  t.field({
    type: [PlanRef],
    resolve: async () => listPlans(),
  })
)
