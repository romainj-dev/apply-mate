import type { RlsTransaction } from '@/lib/db/rls'
import {
  userExperienceLearning,
  userExperienceProfiles,
  userExperienceRoleProjects,
  userExperienceRoles,
} from '@/lib/db/schema'
import { desc, eq, inArray, sql } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import {
  techStackSchema,
  keyMetricsSchema,
  buildRoleValues,
} from './role-service'

export {
  techStackSchema,
  keyMetricsSchema,
  upsertRoleSchema,
  upsertRoleProjectSchema,
  upsertRole,
  buildRoleValues,
  type UpsertRoleInput,
} from './role-service'

const jsonbRecord = z.record(z.string(), z.unknown()).nullable().optional()

const insertProfileSchema = createInsertSchema(userExperienceProfiles, {
  customFields: jsonbRecord,
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  ingestionMetadata: true,
  rawPayload: true,
})

const insertRoleSchema = createInsertSchema(userExperienceRoles, {
  customFields: jsonbRecord,
  keyMetrics: keyMetricsSchema,
  techStack: techStackSchema,
}).omit({
  id: true,
  profileId: true,
  createdAt: true,
  updatedAt: true,
})

const insertLearningSchema = createInsertSchema(userExperienceLearning).omit({
  id: true,
  profileId: true,
  createdAt: true,
  updatedAt: true,
})

export type NormalizedProfile = z.infer<typeof insertProfileSchema>
export type NormalizedRole = z.infer<typeof insertRoleSchema>
export type NormalizedLearning = z.infer<typeof insertLearningSchema>
type ExperienceProfileRecord = typeof userExperienceProfiles.$inferSelect
type ExperienceRoleRecord = typeof userExperienceRoles.$inferSelect
type ExperienceRoleProjectRecord =
  typeof userExperienceRoleProjects.$inferSelect
type ExperienceLearningRecord = typeof userExperienceLearning.$inferSelect

export type ExperienceProfileWithRelations = {
  profile: ExperienceProfileRecord & {
    skills: string[]
  }
  roles: Array<
    ExperienceRoleRecord & {
      projects: ExperienceRoleProjectRecord[]
    }
  >
  learning: ExperienceLearningRecord[]
}

export type SaveExperienceInput = {
  profile: NormalizedProfile
  roles?: NormalizedRole[] | null
  learning?: NormalizedLearning[] | null
  rawPayload?: Record<string, unknown> | null
}

export async function getExperienceProfile(
  tx: RlsTransaction
): Promise<ExperienceProfileWithRelations | null> {
  const [profile] = await tx.select().from(userExperienceProfiles).limit(1)

  if (!profile) {
    return null
  }

  const roles = await tx
    .select()
    .from(userExperienceRoles)
    .where(eq(userExperienceRoles.profileId, profile.id))
    .orderBy(desc(userExperienceRoles.startDate))

  const learning = await tx
    .select()
    .from(userExperienceLearning)
    .where(eq(userExperienceLearning.profileId, profile.id))
    .orderBy(desc(userExperienceLearning.startDate))

  const roleIds = roles.map((role) => role.id)
  const projectsByRoleId = new Map<
    string,
    Array<typeof userExperienceRoleProjects.$inferSelect>
  >()

  if (roleIds.length > 0) {
    const projects = await tx
      .select()
      .from(userExperienceRoleProjects)
      .where(inArray(userExperienceRoleProjects.roleId, roleIds))

    for (const project of projects) {
      const bucket = projectsByRoleId.get(project.roleId) ?? []
      bucket.push(project)
      projectsByRoleId.set(project.roleId, bucket)
    }
  }

  return {
    profile: {
      ...profile,
      skills: profile.skills ?? [],
    },
    roles: roles.map((role) => ({
      ...role,
      projects: projectsByRoleId.get(role.id) ?? [],
    })),
    learning,
  }
}

export async function saveExperience(
  tx: RlsTransaction,
  input: SaveExperienceInput
): Promise<{ profileId: string; rolesCount: number; learningCount: number }> {
  const profile = insertProfileSchema.parse(input.profile)
  const roles = insertRoleSchema.array().parse(input.roles ?? [])
  const learning = insertLearningSchema.array().parse(input.learning ?? [])
  const currentUserId = sql<string>`current_setting('app.current_user_id', true)::uuid`

  return tx.transaction(async (stx) => {
    const [upsertedProfile] = await stx
      .insert(userExperienceProfiles)
      .values({
        userId: currentUserId,
        headline: profile.headline ?? null,
        summary: profile.summary ?? null,
        location: profile.location ?? null,
        yearsOfExperience: profile.yearsOfExperience ?? null,
        skills: profile.skills ?? [],
        customFields: profile.customFields ?? null,
        ingestionMetadata: {
          importedAt: new Date().toISOString(),
        },
        rawPayload: input.rawPayload ?? null,
      })
      .onConflictDoUpdate({
        target: userExperienceProfiles.userId,
        set: {
          headline: profile.headline ?? null,
          summary: profile.summary ?? null,
          location: profile.location ?? null,
          yearsOfExperience: profile.yearsOfExperience ?? null,
          skills: profile.skills ?? [],
          customFields: profile.customFields ?? null,
          ingestionMetadata: {
            importedAt: new Date().toISOString(),
          },
          rawPayload: input.rawPayload ?? null,
        },
      })
      .returning({
        id: userExperienceProfiles.id,
      })

    if (!upsertedProfile) {
      throw new Error('Failed to save experience profile')
    }

    const profileId = upsertedProfile.id

    const existingRoles = await stx
      .select({
        id: userExperienceRoles.id,
      })
      .from(userExperienceRoles)
      .where(eq(userExperienceRoles.profileId, profileId))

    const existingRoleIds = existingRoles.map((role) => role.id)
    if (existingRoleIds.length > 0) {
      await stx
        .delete(userExperienceRoleProjects)
        .where(inArray(userExperienceRoleProjects.roleId, existingRoleIds))
      await stx
        .delete(userExperienceRoles)
        .where(inArray(userExperienceRoles.id, existingRoleIds))
    }

    const existingLearning = await stx
      .select({
        id: userExperienceLearning.id,
      })
      .from(userExperienceLearning)
      .where(eq(userExperienceLearning.profileId, profileId))

    const existingLearningIds = existingLearning.map((entry) => entry.id)
    if (existingLearningIds.length > 0) {
      await stx
        .delete(userExperienceLearning)
        .where(inArray(userExperienceLearning.id, existingLearningIds))
    }

    let insertedRolesCount = 0
    if (roles.length > 0) {
      const insertedRoles = await stx
        .insert(userExperienceRoles)
        .values(
          roles.map((role) => ({
            profileId,
            ...buildRoleValues(role),
            missingDetails: role.missingDetails ?? null,
            customFields: role.customFields ?? null,
          }))
        )
        .returning({
          id: userExperienceRoles.id,
        })

      insertedRolesCount = insertedRoles.length
    }

    let insertedLearningCount = 0
    if (learning.length > 0) {
      const insertedLearning = await stx
        .insert(userExperienceLearning)
        .values(
          learning.map((entry) => ({
            profileId,
            entryType: entry.entryType,
            institution: entry.institution,
            program: entry.program ?? null,
            fieldOfStudy: entry.fieldOfStudy ?? null,
            credentialUrl: entry.credentialUrl ?? null,
            startDate: entry.startDate ?? null,
            endDate: entry.endDate ?? null,
            description: entry.description ?? null,
          }))
        )
        .returning({
          id: userExperienceLearning.id,
        })

      insertedLearningCount = insertedLearning.length
    }

    return {
      profileId,
      rolesCount: insertedRolesCount,
      learningCount: insertedLearningCount,
    }
  })
}
