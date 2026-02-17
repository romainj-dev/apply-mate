import {
  getExperienceProfileByUserId,
  saveExperienceByUserId,
  type SaveExperienceInput,
} from '@/lib/db/services/experience-service'
import { builder } from './builder'

const ExperienceRoleProjectRef = builder.objectRef<{
  id: string
  roleId: string
  title: string
  period: string | null
  description: string | null
  achievements: string[]
  createdAt: Date
  updatedAt: Date
}>('ExperienceRoleProjectModel')

ExperienceRoleProjectRef.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    roleId: t.exposeString('roleId'),
    title: t.exposeString('title'),
    period: t.exposeString('period', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),
    achievements: t.exposeStringList('achievements'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

const ExperienceRoleRef = builder.objectRef<{
  id: string
  profileId: string
  title: string
  company: string
  employmentType: string | null
  location: string | null
  startDate: string | null
  endDate: string | null
  isCurrent: boolean | null
  periodLabel: string | null
  durationLabel: string | null
  status: 'complete' | 'incomplete' | null
  summary: string | null
  techStack: string[]
  methodologies: string[]
  teamStructure: string | null
  keyAchievements: string[]
  missingDetails: string | null
  customFields: Record<string, unknown> | null
  createdAt: Date
  updatedAt: Date
  projects: Array<{
    id: string
    roleId: string
    title: string
    period: string | null
    description: string | null
    achievements: string[]
    createdAt: Date
    updatedAt: Date
  }>
}>('ExperienceRoleModel')

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
    techStack: t.exposeStringList('techStack'),
    methodologies: t.exposeStringList('methodologies'),
    teamStructure: t.exposeString('teamStructure', { nullable: true }),
    keyAchievements: t.exposeStringList('keyAchievements'),
    missingDetails: t.exposeString('missingDetails', { nullable: true }),
    customFields: t.expose('customFields', { type: 'JSONObject', nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    projects: t.field({
      type: [ExperienceRoleProjectRef],
      resolve: (role) => role.projects,
    }),
  }),
})

const ExperienceLearningRef = builder.objectRef<{
  id: string
  profileId: string
  entryType: 'education' | 'certification'
  institution: string
  program: string | null
  fieldOfStudy: string | null
  credentialUrl: string | null
  startDate: string | null
  endDate: string | null
  description: string | null
  createdAt: Date
  updatedAt: Date
}>('ExperienceLearningModel')

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

const ExperienceProfileRef = builder.objectRef<{
  id: string
  userId: string
  headline: string | null
  summary: string | null
  location: string | null
  yearsOfExperience: number | null
  skills: string[]
  customFields: Record<string, unknown> | null
  ingestionMetadata: Record<string, unknown> | null
  rawPayload: Record<string, unknown> | null
  createdAt: Date
  updatedAt: Date
}>('ExperienceProfileModel')

ExperienceProfileRef.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    headline: t.exposeString('headline', { nullable: true }),
    summary: t.exposeString('summary', { nullable: true }),
    location: t.exposeString('location', { nullable: true }),
    yearsOfExperience: t.exposeInt('yearsOfExperience', { nullable: true }),
    skills: t.exposeStringList('skills'),
    customFields: t.expose('customFields', { type: 'JSONObject', nullable: true }),
    ingestionMetadata: t.expose('ingestionMetadata', {
      type: 'JSONObject',
      nullable: true,
    }),
    rawPayload: t.expose('rawPayload', { type: 'JSONObject', nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

const ExperienceProfileAggregateRef = builder.objectRef<{
  profile: {
    id: string
    userId: string
    headline: string | null
    summary: string | null
    location: string | null
    yearsOfExperience: number | null
    skills: string[]
    customFields: Record<string, unknown> | null
    ingestionMetadata: Record<string, unknown> | null
    rawPayload: Record<string, unknown> | null
    createdAt: Date
    updatedAt: Date
  }
  roles: Array<{
    id: string
    profileId: string
    title: string
    company: string
    employmentType: string | null
    location: string | null
    startDate: string | null
    endDate: string | null
    isCurrent: boolean | null
    periodLabel: string | null
    durationLabel: string | null
    status: 'complete' | 'incomplete' | null
    summary: string | null
    techStack: string[]
    methodologies: string[]
    teamStructure: string | null
    keyAchievements: string[]
    missingDetails: string | null
    customFields: Record<string, unknown> | null
    createdAt: Date
    updatedAt: Date
    projects: Array<{
      id: string
      roleId: string
      title: string
      period: string | null
      description: string | null
      achievements: string[]
      createdAt: Date
      updatedAt: Date
    }>
  }>
  learning: Array<{
    id: string
    profileId: string
    entryType: 'education' | 'certification'
    institution: string
    program: string | null
    fieldOfStudy: string | null
    credentialUrl: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
  }>
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
    techStack: t.stringList(),
    methodologies: t.stringList(),
    teamStructure: t.string(),
    keyAchievements: t.stringList(),
    missingDetails: t.string(),
    customFields: t.field({ type: 'JSONObject' }),
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

builder.queryField('experienceProfile', (t) =>
  t.field({
    type: ExperienceProfileAggregateRef,
    nullable: true,
    resolve: async (_root, _args, context) => {
      if (!context.user?.id) {
        return null
      }

      return getExperienceProfileByUserId(context.user.id)
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

      return saveExperienceByUserId(
        context.user.id,
        args.input as SaveExperienceInput
      )
    },
  })
)
