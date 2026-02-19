import { findUserById } from '@/lib/db/services/user-service'
import type { InferSelectModel } from 'drizzle-orm'
import * as schema from '@/lib/db/schema'
import { builder } from './builder'

export const UserRef =
  builder.objectRef<InferSelectModel<typeof schema.users>>('User')

UserRef.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    fullName: t.exposeString('fullName'),
    avatarUrl: t.exposeString('avatarUrl', { nullable: true }),
    metadata: t.expose('metadata', { type: 'JSONObject', nullable: true }),
    provider: t.exposeString('provider'),
    providerAccountId: t.exposeString('providerAccountId'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

builder.queryField('currentUser', (t) =>
  t.field({
    type: UserRef,
    nullable: true,
    resolve: async (_root, _args, context) => {
      if (!context.user?.id) {
        return null
      }
      return findUserById(context.user.id)
    },
  })
)

builder.queryField('user', (t) =>
  t.field({
    type: UserRef,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_root, args, context) => {
      if (!context.user?.id) {
        throw new Error('Unauthorized')
      }
      if (context.user.id !== args.id) {
        throw new Error('Cannot access other users')
      }

      const user = await findUserById(args.id)
      if (!user) {
        throw new Error(`User ${args.id} not found`)
      }

      return user
    },
  })
)
