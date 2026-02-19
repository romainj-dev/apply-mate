import { relations } from 'drizzle-orm'
import {
  date,
  index,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core'
import { users } from './users'

export const experienceStatusEnum = pgEnum('experience_status', [
  'complete',
  'incomplete',
])

export const experienceEntryTypeEnum = pgEnum('experience_entry_type', [
  'education',
  'certification',
])

export const userExperienceProfiles = pgTable(
  'user_experience_profiles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    headline: text('headline'),
    summary: text('summary'),
    location: text('location'),
    yearsOfExperience: numeric('years_of_experience', { mode: 'number' }),
    skills: text('skills').array().$type<string[]>().default([]).notNull(),
    customFields: jsonb('custom_fields').$type<Record<
      string,
      unknown
    > | null>(),
    ingestionMetadata: jsonb('ingestion_metadata').$type<Record<
      string,
      unknown
    > | null>(),
    rawPayload: jsonb('raw_payload').$type<Record<string, unknown> | null>(),
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
  (table) => ({
    userUnique: unique('user_experience_profiles_user_id_unique').on(
      table.userId
    ),
    userIdIdx: index('user_experience_profiles_user_id_idx').on(table.userId),
  })
)

export const userExperienceRoles = pgTable(
  'user_experience_roles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => userExperienceProfiles.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    company: text('company').notNull(),
    employmentType: text('employment_type'),
    location: text('location'),
    startDate: date('start_date', { mode: 'string' }),
    endDate: date('end_date', { mode: 'string' }),
    isCurrent: boolean('is_current').default(false),
    periodLabel: text('period_label'),
    durationLabel: text('duration_label'),
    status: experienceStatusEnum('status').default('incomplete'),
    summary: text('summary'),
    techStack: text('tech_stack')
      .array()
      .$type<string[]>()
      .default([])
      .notNull(),
    methodologies: text('methodologies')
      .array()
      .$type<string[]>()
      .default([])
      .notNull(),
    teamStructure: text('team_structure'),
    keyAchievements: text('key_achievements')
      .array()
      .$type<string[]>()
      .default([])
      .notNull(),
    missingDetails: text('missing_details'),
    customFields: jsonb('custom_fields').$type<Record<
      string,
      unknown
    > | null>(),
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
  (table) => ({
    profileStartDateIdx: index(
      'user_experience_roles_profile_id_start_date_idx'
    ).on(table.profileId, table.startDate),
  })
)

export const userExperienceRoleProjects = pgTable(
  'user_experience_role_projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    roleId: uuid('role_id')
      .notNull()
      .references(() => userExperienceRoles.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    period: text('period'),
    description: text('description'),
    achievements: text('achievements')
      .array()
      .$type<string[]>()
      .default([])
      .notNull(),
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
  (table) => ({
    roleIdIdx: index('user_experience_role_projects_role_id_idx').on(
      table.roleId
    ),
  })
)

export const userExperienceLearning = pgTable(
  'user_experience_learning',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => userExperienceProfiles.id, { onDelete: 'cascade' }),
    entryType: experienceEntryTypeEnum('entry_type').notNull(),
    institution: text('institution').notNull(),
    program: text('program'),
    fieldOfStudy: text('field_of_study'),
    credentialUrl: text('credential_url'),
    startDate: date('start_date', { mode: 'string' }),
    endDate: date('end_date', { mode: 'string' }),
    description: text('description'),
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
  (table) => ({
    profileIdIdx: index('user_experience_learning_profile_id_idx').on(
      table.profileId
    ),
  })
)

export const userExperienceProfilesRelations = relations(
  userExperienceProfiles,
  ({ one, many }) => ({
    user: one(users, {
      fields: [userExperienceProfiles.userId],
      references: [users.id],
    }),
    roles: many(userExperienceRoles),
    learning: many(userExperienceLearning),
  })
)

export const userExperienceRolesRelations = relations(
  userExperienceRoles,
  ({ one, many }) => ({
    profile: one(userExperienceProfiles, {
      fields: [userExperienceRoles.profileId],
      references: [userExperienceProfiles.id],
    }),
    projects: many(userExperienceRoleProjects),
  })
)

export const userExperienceRoleProjectsRelations = relations(
  userExperienceRoleProjects,
  ({ one }) => ({
    role: one(userExperienceRoles, {
      fields: [userExperienceRoleProjects.roleId],
      references: [userExperienceRoles.id],
    }),
  })
)

export const userExperienceLearningRelations = relations(
  userExperienceLearning,
  ({ one }) => ({
    profile: one(userExperienceProfiles, {
      fields: [userExperienceLearning.profileId],
      references: [userExperienceProfiles.id],
    }),
  })
)
