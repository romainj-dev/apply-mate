import {
  getExperienceProfile,
  saveExperience,
  upsertRole,
  type SaveExperienceInput,
  type UpsertRoleInput,
} from '@/lib/db/services/experience-service'
import { withRlsDb } from '@/lib/db/rls'
import type { InferSelectModel } from 'drizzle-orm'
import * as schema from '@/lib/db/schema'
import { builder } from './builder'

type ProfileRow = InferSelectModel<typeof schema.userExperienceProfiles>
type RoleRow = InferSelectModel<typeof schema.userExperienceRoles>
type ProjectRow = InferSelectModel<typeof schema.userExperienceRoleProjects>
type LearningRow = InferSelectModel<typeof schema.userExperienceLearning>

/* ── Shared object types ─────────────────────────────────────────────── */

type KeyMetricRow = {
  type: string
  customType?: string
  value: string
  text: string
}

const KeyMetricRef = builder.objectRef<KeyMetricRow>('KeyMetricModel')

KeyMetricRef.implement({
  fields: (t) => ({
    type: t.exposeString('type'),
    customType: t.exposeString('customType', { nullable: true }),
    value: t.exposeString('value'),
    text: t.exposeString('text'),
  }),
})

type TechStackItemRow = {
  value: string
  customLabel?: string
}

const TechStackItemRef =
  builder.objectRef<TechStackItemRow>('TechStackItemModel')

TechStackItemRef.implement({
  fields: (t) => ({
    value: t.exposeString('value'),
    customLabel: t.exposeString('customLabel', { nullable: true }),
  }),
})

/* ── Project ─────────────────────────────────────────────────────────── */

const ExperienceRoleProjectRef = builder.objectRef<ProjectRow>(
  'ExperienceRoleProjectModel'
)

ExperienceRoleProjectRef.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    roleId: t.exposeString('roleId'),
    title: t.exposeString('title'),
    period: t.exposeString('period', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),
    achievements: t.exposeStringList('achievements'),
    techStack: t.field({
      type: [TechStackItemRef],
      resolve: (project) => (project.techStack as TechStackItemRow[]) ?? [],
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

/* ── Role ────────────────────────────────────────────────────────────── */

const ExperienceRoleRef = builder.objectRef<
  RoleRow & { projects: ProjectRow[] }
>('ExperienceRoleModel')

ExperienceRoleRef.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    profileId: t.exposeString('profileId'),
    title: t.exposeString('title'),
    company: t.exposeString('company'),
    employmentType: t.exposeString('employmentType', { nullable: true }),
    location: t.exposeString('location', { nullable: true }),
    startDate: t.exposeString('startDate', { nullable: true }),
    endDate: t.exposeString('endDate', { nullable: true }),
    isCurrent: t.exposeBoolean('isCurrent', { nullable: true }),
    periodLabel: t.exposeString('periodLabel', { nullable: true }),
    durationLabel: t.exposeString('durationLabel', { nullable: true }),
    status: t.field({
      type: 'String',
      resolve: (role) => role.status ?? 'incomplete',
    }),
    summary: t.exposeString('summary', { nullable: true }),
    techStack: t.field({
      type: [TechStackItemRef],
      resolve: (role) => (role.techStack as TechStackItemRow[]) ?? [],
    }),
    methodologies: t.exposeStringList('methodologies'),
    teamStructure: t.exposeString('teamStructure', { nullable: true }),
    keyAchievements: t.exposeStringList('keyAchievements'),
    missingDetails: t.exposeString('missingDetails', { nullable: true }),
    customFields: t.expose('customFields', {
      type: 'JSONObject',
      nullable: true,
    }),
    keyMetrics: t.field({
      type: [KeyMetricRef],
      nullable: true,
      resolve: (role) => (role.keyMetrics as KeyMetricRow[] | null) ?? null,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    projects: t.field({
      type: [ExperienceRoleProjectRef],
      resolve: (role) => role.projects,
    }),
  }),
})

/* ── Learning ────────────────────────────────────────────────────────── */

const ExperienceLearningRef = builder.objectRef<LearningRow>(
  'ExperienceLearningModel'
)

ExperienceLearningRef.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    profileId: t.exposeString('profileId'),
    entryType: t.exposeString('entryType'),
    institution: t.exposeString('institution'),
    program: t.exposeString('program', { nullable: true }),
    fieldOfStudy: t.exposeString('fieldOfStudy', { nullable: true }),
    credentialUrl: t.exposeString('credentialUrl', { nullable: true }),
    startDate: t.exposeString('startDate', { nullable: true }),
    endDate: t.exposeString('endDate', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

/* ── Profile ─────────────────────────────────────────────────────────── */

const ExperienceProfileRef = builder.objectRef<ProfileRow>(
  'ExperienceProfileModel'
)

ExperienceProfileRef.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    headline: t.exposeString('headline', { nullable: true }),
    summary: t.exposeString('summary', { nullable: true }),
    location: t.exposeString('location', { nullable: true }),
    yearsOfExperience: t.exposeInt('yearsOfExperience', { nullable: true }),
    skills: t.exposeStringList('skills'),
    customFields: t.expose('customFields', {
      type: 'JSONObject',
      nullable: true,
    }),
    ingestionMetadata: t.expose('ingestionMetadata', {
      type: 'JSONObject',
      nullable: true,
    }),
    rawPayload: t.expose('rawPayload', { type: 'JSONObject', nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

/* ── Aggregate ───────────────────────────────────────────────────────── */

const ExperienceProfileAggregateRef = builder.objectRef<{
  profile: ProfileRow
  roles: Array<RoleRow & { projects: ProjectRow[] }>
  learning: LearningRow[]
}>('ExperienceProfileAggregateModel')

ExperienceProfileAggregateRef.implement({
  fields: (t) => ({
    profile: t.field({
      type: ExperienceProfileRef,
      resolve: (aggregate) => aggregate.profile,
    }),
    roles: t.field({
      type: [ExperienceRoleRef],
      resolve: (aggregate) => aggregate.roles,
    }),
    learning: t.field({
      type: [ExperienceLearningRef],
      resolve: (aggregate) => aggregate.learning,
    }),
  }),
})

const ExperienceMutationResultRef = builder.objectRef<{
  profileId: string
  rolesCount: number
  learningCount: number
}>('ExperienceMutationResult')

ExperienceMutationResultRef.implement({
  fields: (t) => ({
    profileId: t.exposeID('profileId'),
    rolesCount: t.exposeFloat('rolesCount'),
    learningCount: t.exposeFloat('learningCount'),
  }),
})

/* ── Inputs ──────────────────────────────────────────────────────────── */

const ExperienceProfileInput = builder.inputType('ExperienceProfileInput', {
  fields: (t) => ({
    headline: t.string(),
    summary: t.string(),
    location: t.string(),
    yearsOfExperience: t.int(),
    skills: t.stringList(),
    customFields: t.field({ type: 'JSONObject' }),
  }),
})

const ExperienceRoleInput = builder.inputType('ExperienceRoleInput', {
  fields: (t) => ({
    title: t.string({ required: true }),
    company: t.string({ required: true }),
    employmentType: t.string(),
    location: t.string(),
    startDate: t.string(),
    endDate: t.string(),
    isCurrent: t.boolean(),
    periodLabel: t.string(),
    durationLabel: t.string(),
    status: t.string(),
    summary: t.string(),
    techStack: t.field({ type: 'JSONObject' }),
    methodologies: t.stringList(),
    teamStructure: t.string(),
    keyAchievements: t.stringList(),
    missingDetails: t.string(),
    customFields: t.field({ type: 'JSONObject' }),
    keyMetrics: t.field({ type: 'JSONObject' }),
  }),
})

const ExperienceLearningInput = builder.inputType('ExperienceLearningInput', {
  fields: (t) => ({
    entryType: t.string({ required: true }),
    institution: t.string({ required: true }),
    program: t.string(),
    fieldOfStudy: t.string(),
    credentialUrl: t.string(),
    startDate: t.string(),
    endDate: t.string(),
    description: t.string(),
  }),
})

const SaveExperienceInputRef = builder.inputType('SaveExperienceInput', {
  fields: (t) => ({
    profile: t.field({ type: ExperienceProfileInput, required: true }),
    roles: t.field({ type: [ExperienceRoleInput] }),
    learning: t.field({ type: [ExperienceLearningInput] }),
    rawPayload: t.field({ type: 'JSONObject' }),
  }),
})

/* ── Upsert Role Inputs ─────────────────────────────────────────────── */

const UpsertRoleProjectInput = builder.inputType('UpsertRoleProjectInput', {
  fields: (t) => ({
    title: t.string({ required: true }),
    period: t.string(),
    description: t.string(),
    achievements: t.stringList(),
    techStack: t.field({ type: 'JSONObject' }),
  }),
})

const UpsertRoleInputRef = builder.inputType('UpsertRoleInput', {
  fields: (t) => ({
    id: t.string(),
    title: t.string({ required: true }),
    company: t.string({ required: true }),
    employmentType: t.string(),
    location: t.string(),
    startDate: t.string(),
    endDate: t.string(),
    isCurrent: t.boolean(),
    summary: t.string(),
    techStack: t.field({ type: 'JSONObject' }),
    methodologies: t.stringList(),
    teamStructure: t.string(),
    keyAchievements: t.stringList(),
    keyMetrics: t.field({ type: 'JSONObject' }),
    projects: t.field({ type: [UpsertRoleProjectInput] }),
  }),
})

const UpsertRoleMutationResultRef = builder.objectRef<{ roleId: string }>(
  'UpsertRoleMutationResult'
)

UpsertRoleMutationResultRef.implement({
  fields: (t) => ({
    roleId: t.exposeID('roleId'),
  }),
})

/* ── Query & Mutation ────────────────────────────────────────────────── */

builder.queryField('experienceProfile', (t) =>
  t.field({
    type: ExperienceProfileAggregateRef,
    nullable: true,
    resolve: async (_root, _args, context) => {
      if (!context.user?.id) {
        return null
      }

      return withRlsDb(context.user.id, (tx) => getExperienceProfile(tx))
    },
  })
)

builder.mutationField('saveExperience', (t) =>
  t.field({
    type: ExperienceMutationResultRef,
    args: {
      input: t.arg({ type: SaveExperienceInputRef, required: true }),
    },
    resolve: async (_root, args, context) => {
      if (!context.user?.id) {
        throw new Error('Unauthorized')
      }

      // TODO(ts-migration): Pothos input type and SaveExperienceInput are structurally equivalent
      // but Pothos's generated type does not match directly — bridge via unknown
      return withRlsDb(context.user.id, (tx) =>
        saveExperience(tx, args.input as unknown as SaveExperienceInput)
      )
    },
  })
)

builder.mutationField('upsertRole', (t) =>
  t.field({
    type: UpsertRoleMutationResultRef,
    args: {
      input: t.arg({ type: UpsertRoleInputRef, required: true }),
    },
    resolve: async (_root, args, context) => {
      if (!context.user?.id) {
        throw new Error('Unauthorized')
      }

      // TODO(ts-migration): Pothos input type and UpsertRoleInput are structurally equivalent but
      // Pothos's generated type does not match directly — bridge via unknown.
      return withRlsDb(context.user.id, (tx) =>
        upsertRole(tx, args.input as unknown as UpsertRoleInput)
      )
    },
  })
)
