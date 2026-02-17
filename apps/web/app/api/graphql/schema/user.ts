import {
  findUserById,
  upsertUserFromOAuth,
  type UpsertUserFromOAuthInput,
} from '@/lib/db/services/user-service'
import { builder } from './builder'

export const UserRef = builder.objectRef<{
  id: string
  email: string
  fullName: string
  avatarUrl: string | null
  metadata: Record<string, unknown> | null
  provider: string
  providerAccountId: string
  createdAt: Date
  updatedAt: Date
}>('User')

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

const UpsertUserInput = builder.inputType('UpsertUserRequest', {
  fields: (t) => ({
    provider: t.string({ required: true }),
    providerAccountId: t.string({ required: true }),
    email: t.string({ required: true }),
    fullName: t.string({ required: true }),
    avatarUrl: t.string(),
    accessToken: t.string(),
    refreshToken: t.string(),
    tokenExpiresAt: t.field({ type: 'DateTime' }),
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

builder.mutationField('upsertUser', (t) =>
  t.field({
    type: UserRef,
    args: {
      input: t.arg({ type: UpsertUserInput, required: true }),
    },
    resolve: async (_root, args) => {
      const input = args.input as UpsertUserFromOAuthInput
      const { id } = await upsertUserFromOAuth(input)
      const user = await findUserById(id)
      if (!user) {
        throw new Error('User upsert failed')
      }
      return user
    },
  })
)
