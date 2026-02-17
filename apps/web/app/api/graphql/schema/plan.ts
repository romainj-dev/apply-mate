import { listPlans } from '@/lib/db/queries/plans'
import { builder } from './builder'

export const PlanRef = builder.objectRef<{
  id: string
  code: string
  price: number
  createdAt: Date
  updatedAt: Date
}>('PlanModel')

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
