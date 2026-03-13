import { relations } from 'drizzle-orm'
import {
  index,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
  jsonb,
} from 'drizzle-orm/pg-core'
import { userExperienceProfiles } from './experience'

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull(),
    fullName: varchar('full_name', { length: 160 }).notNull(),
    avatarUrl: text('avatar_url'),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    provider: varchar('provider', { length: 32 }).notNull(),
    providerAccountId: varchar('provider_account_id', {
      length: 255,
    }).notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    tokenExpiresAt: timestamp('token_expires_at', {
      withTimezone: true,
      mode: 'date',
    }),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'date',
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'date',
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('users_email_idx').on(table.email),
    index('users_provider_idx').on(table.provider, table.providerAccountId),
    unique('users_provider_provider_account_unique').on(
      table.provider,
      table.providerAccountId
    ),
  ]
)

export const usersRelations = relations(users, ({ one }) => ({
  experienceProfile: one(userExperienceProfiles, {
    fields: [users.id],
    references: [userExperienceProfiles.userId],
  }),
}))
