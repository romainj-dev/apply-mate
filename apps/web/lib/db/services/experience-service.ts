import { db } from '@/lib/db/client'
import {
  userExperienceLearning,
  userExperienceProfiles,
  userExperienceRoleProjects,
  userExperienceRoles,
} from '@/lib/db/schema'
import { desc, eq, inArray } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

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

const techStackSchema = z
  .array(
    z.object({
      value: z.string(),
      customLabel: z.string().optional(),
    })
  )
  .default([])

const keyMetricsSchema = z
  .array(
    z.object({
      type: z.string(),
      customType: z.string().optional(),
      value: z.string(),
      text: z.string(),
    })
  )
  .nullable()
  .optional()

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

export async function getExperienceProfileByUserId(
  userId: string
): Promise<ExperienceProfileWithRelations | null> {
  const [profile] = await db
    .select()
    .from(userExperienceProfiles)
    .where(eq(userExperienceProfiles.userId, userId))
    .limit(1)

  if (!profile) {
    return null
  }

  const roles = await db
    .select()
    .from(userExperienceRoles)
    .where(eq(userExperienceRoles.profileId, profile.id))
    .orderBy(desc(userExperienceRoles.startDate))

  const learning = await db
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
    const projects = await db
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

export async function saveExperienceByUserId(
  userId: string,
  input: SaveExperienceInput
): Promise<{ profileId: string; rolesCount: number; learningCount: number }> {
  const profile = insertProfileSchema.parse(input.profile)
  const roles = insertRoleSchema.array().parse(input.roles ?? [])
  const learning = insertLearningSchema.array().parse(input.learning ?? [])

  return db.transaction(async (tx) => {
    const [upsertedProfile] = await tx
      .insert(userExperienceProfiles)
      .values({
        userId,
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

    const existingRoles = await tx
      .select({
        id: userExperienceRoles.id,
      })
      .from(userExperienceRoles)
      .where(eq(userExperienceRoles.profileId, profileId))

    const existingRoleIds = existingRoles.map((role) => role.id)
    if (existingRoleIds.length > 0) {
      await tx
        .delete(userExperienceRoleProjects)
        .where(inArray(userExperienceRoleProjects.roleId, existingRoleIds))
      await tx
        .delete(userExperienceRoles)
        .where(inArray(userExperienceRoles.id, existingRoleIds))
    }

    const existingLearning = await tx
      .select({
        id: userExperienceLearning.id,
      })
      .from(userExperienceLearning)
      .where(eq(userExperienceLearning.profileId, profileId))

    const existingLearningIds = existingLearning.map((entry) => entry.id)
    if (existingLearningIds.length > 0) {
      await tx
        .delete(userExperienceLearning)
        .where(inArray(userExperienceLearning.id, existingLearningIds))
    }

    let insertedRolesCount = 0
    if (roles.length > 0) {
      const insertedRoles = await tx
        .insert(userExperienceRoles)
        .values(
          roles.map((role) => ({
            profileId,
            title: role.title,
            company: role.company,
            employmentType: role.employmentType ?? null,
            location: role.location ?? null,
            startDate: role.startDate ?? null,
            endDate: role.endDate ?? null,
            isCurrent: role.isCurrent ?? false,
            periodLabel: role.periodLabel ?? null,
            durationLabel: role.durationLabel ?? null,
            status: role.status ?? 'incomplete',
            summary: role.summary ?? null,
            techStack: role.techStack ?? [],
            methodologies: role.methodologies ?? [],
            teamStructure: role.teamStructure ?? null,
            keyAchievements: role.keyAchievements ?? [],
            missingDetails: role.missingDetails ?? null,
            customFields: role.customFields ?? null,
            keyMetrics: role.keyMetrics ?? null,
          }))
        )
        .returning({
          id: userExperienceRoles.id,
        })

      insertedRolesCount = insertedRoles.length
    }

    let insertedLearningCount = 0
    if (learning.length > 0) {
      const insertedLearning = await tx
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
