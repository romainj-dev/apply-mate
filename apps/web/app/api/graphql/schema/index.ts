import { builder } from './builder'
import './plan'
import './user'
import './experience'

builder.queryField('health', (t) =>
  t.string({
    resolve: () => 'ok',
  })
)

export const schema = builder.toSchema()
