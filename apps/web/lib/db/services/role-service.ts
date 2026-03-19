import { db } from '@/lib/db/client'
import {
  userExperienceProfiles,
  userExperienceRoleProjects,
  userExperienceRoles,
} from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

/* ── Jsonb overrides (drizzle-zod can't infer .$type<>) ───────────── */

export const techStackSchema = z
  .array(
    z.object({
      value: z.string(),
      customLabel: z.string().optional(),
    })
  )
  .default([])

export const keyMetricsSchema = z
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

/* ── Schemas (derived from Drizzle) ───────────────────────────────── */

export const upsertRoleProjectSchema = createInsertSchema(
  userExperienceRoleProjects,
  {
    techStack: techStackSchema,
    title: z.string().min(1),
  }
).pick({
  title: true,
  period: true,
  description: true,
  achievements: true,
  techStack: true,
})

export const upsertRoleSchema = createInsertSchema(userExperienceRoles, {
  techStack: techStackSchema,
  keyMetrics: keyMetricsSchema,
  title: z.string().min(1),
  company: z.string().min(1),
})
  .omit({
    id: true,
    profileId: true,
    createdAt: true,
    updatedAt: true,
    periodLabel: true,
    durationLabel: true,
    status: true,
    missingDetails: true,
    customFields: true,
  })
  .extend({
    id: z.string().uuid().nullable().optional(),
    projects: z.array(upsertRoleProjectSchema).default([]),
  })

export type UpsertRoleInput = z.infer<typeof upsertRoleSchema>

export const upsertSingleProjectSchema = upsertRoleProjectSchema.extend({
  id: z.string().uuid().nullable().optional(),
  roleId: z.string().uuid(),
})

export type UpsertSingleProjectInput = z.infer<
  typeof upsertSingleProjectSchema
>

/* ── Server-side derived field computation ─────────────────────────── */

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function computePeriodLabel(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  isCurrent: boolean
): string | null {
  if (!startDate) return null
  const startMatch = startDate.match(/^(\d{4})-(\d{2})/)
  if (!startMatch) return null
  const startLabel = `${MONTH_NAMES[parseInt(startMatch[2], 10) - 1]} ${startMatch[1]}`
  if (isCurrent) return `${startLabel} - Present`
  if (!endDate) return startLabel
  const endMatch = endDate.match(/^(\d{4})-(\d{2})/)
  if (!endMatch) return startLabel
  const endLabel = `${MONTH_NAMES[parseInt(endMatch[2], 10) - 1]} ${endMatch[1]}`
  return `${startLabel} - ${endLabel}`
}

function computeDurationLabel(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  isCurrent: boolean
): string | null {
  if (!startDate) return null
  const startMatch = startDate.match(/^(\d{4})-(\d{2})/)
  if (!startMatch) return null
  const startYear = parseInt(startMatch[1], 10)
  const startMonth = parseInt(startMatch[2], 10) - 1

  let endYear: number
  let endMonth: number
  if (isCurrent) {
    const now = new Date()
    endYear = now.getFullYear()
    endMonth = now.getMonth()
  } else if (endDate) {
    const endMatch = endDate.match(/^(\d{4})-(\d{2})/)
    if (!endMatch) return null
    endYear = parseInt(endMatch[1], 10)
    endMonth = parseInt(endMatch[2], 10) - 1
  } else {
    return null
  }

  let months = (endYear - startYear) * 12 + (endMonth - startMonth)
  if (months < 0) months = 0
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (years === 0) return `${remainingMonths}m`
  if (remainingMonths === 0) return `${years}y`
  return `${years}y ${remainingMonths}m`
}

function computeStatus(
  title: string,
  company: string,
  summary: string | null | undefined
): 'complete' | 'incomplete' {
  return title && company && summary ? 'complete' : 'incomplete'
}

/* ── Common role value builder (single source of truth) ───────────── */

type RoleValues = Omit<
  typeof userExperienceRoles.$inferInsert,
  'id' | 'profileId' | 'createdAt' | 'updatedAt'
>

export function buildRoleValues(input: {
  title: string
  company: string
  employmentType?: string | null
  location?: string | null
  startDate?: string | null
  endDate?: string | null
  isCurrent?: boolean | null
  summary?: string | null
  techStack?: Array<{ value: string; customLabel?: string }> | null
  methodologies?: string[] | null
  teamStructure?: string | null
  keyAchievements?: string[] | null
  keyMetrics?: Array<{
    type: string
    customType?: string
    value: string
    text: string
  }> | null
}): RoleValues {
  const isCurrent = input.isCurrent ?? false
  return {
    title: input.title,
    company: input.company,
    employmentType: input.employmentType ?? 'full-time',
    location: input.location ?? null,
    startDate: input.startDate ?? null,
    endDate: input.endDate ?? null,
    isCurrent,
    periodLabel: computePeriodLabel(input.startDate, input.endDate, isCurrent),
    durationLabel: computeDurationLabel(
      input.startDate,
      input.endDate,
      isCurrent
    ),
    status: computeStatus(input.title, input.company, input.summary),
    summary: input.summary ?? null,
    techStack: input.techStack ?? [],
    methodologies: input.methodologies ?? [],
    teamStructure: input.teamStructure ?? null,
    keyAchievements: input.keyAchievements ?? [],
    keyMetrics: input.keyMetrics ?? null,
  }
}

/* ── Service ──────────────────────────────────────────────────────── */

export async function upsertRoleByUserId(
  userId: string,
  rawInput: UpsertRoleInput
): Promise<{ roleId: string }> {
  const input = upsertRoleSchema.parse(rawInput)

  return db.transaction(async (tx) => {
    const [profile] = await tx
      .select({ id: userExperienceProfiles.id })
      .from(userExperienceProfiles)
      .where(eq(userExperienceProfiles.userId, userId))
      .limit(1)

    if (!profile) {
      throw new Error('Experience profile not found')
    }

    const roleValues = buildRoleValues(input)

    let roleId: string

    if (input.id) {
      // Verify the role belongs to this user's profile
      const [existing] = await tx
        .select({ id: userExperienceRoles.id })
        .from(userExperienceRoles)
        .where(
          and(
            eq(userExperienceRoles.id, input.id),
            eq(userExperienceRoles.profileId, profile.id)
          )
        )
        .limit(1)

      if (!existing) {
        throw new Error('Role not found')
      }

      await tx
        .update(userExperienceRoles)
        .set(roleValues)
        .where(eq(userExperienceRoles.id, input.id))

      roleId = input.id

      // Remove existing projects for re-insert
      await tx
        .delete(userExperienceRoleProjects)
        .where(eq(userExperienceRoleProjects.roleId, roleId))
    } else {
      const [inserted] = await tx
        .insert(userExperienceRoles)
        .values({ profileId: profile.id, ...roleValues })
        .returning({ id: userExperienceRoles.id })

      if (!inserted) {
        throw new Error('Failed to insert role')
      }

      roleId = inserted.id
    }

    // Insert projects
    if (input.projects.length > 0) {
      await tx.insert(userExperienceRoleProjects).values(
        input.projects.map((p) => ({
          roleId,
          title: p.title,
          period: p.period ?? null,
          description: p.description ?? null,
          achievements: p.achievements ?? [],
          techStack: p.techStack ?? [],
        }))
      )
    }

    return { roleId }
  })
}

/* ── Single-project upsert ───────────────────────────────────────── */

export async function upsertProjectByUserId(
  userId: string,
  rawInput: UpsertSingleProjectInput
): Promise<{ projectId: string }> {
  const input = upsertSingleProjectSchema.parse(rawInput)

  return db.transaction(async (tx) => {
    // Verify user owns the role
    const [profile] = await tx
      .select({ id: userExperienceProfiles.id })
      .from(userExperienceProfiles)
      .where(eq(userExperienceProfiles.userId, userId))
      .limit(1)

    if (!profile) {
      throw new Error('Experience profile not found')
    }

    const [role] = await tx
      .select({ id: userExperienceRoles.id })
      .from(userExperienceRoles)
      .where(
        and(
          eq(userExperienceRoles.id, input.roleId),
          eq(userExperienceRoles.profileId, profile.id)
        )
      )
      .limit(1)

    if (!role) {
      throw new Error('Role not found')
    }

    const projectValues = {
      title: input.title,
      period: input.period ?? null,
      description: input.description ?? null,
      achievements: input.achievements ?? [],
      techStack: input.techStack ?? [],
    }

    if (input.id) {
      // Verify the project belongs to this role
      const [existing] = await tx
        .select({ id: userExperienceRoleProjects.id })
        .from(userExperienceRoleProjects)
        .where(
          and(
            eq(userExperienceRoleProjects.id, input.id),
            eq(userExperienceRoleProjects.roleId, input.roleId)
          )
        )
        .limit(1)

      if (!existing) {
        throw new Error('Project not found')
      }

      await tx
        .update(userExperienceRoleProjects)
        .set(projectValues)
        .where(eq(userExperienceRoleProjects.id, input.id))

      return { projectId: input.id }
    }

    const [inserted] = await tx
      .insert(userExperienceRoleProjects)
      .values({ roleId: input.roleId, ...projectValues })
      .returning({ id: userExperienceRoleProjects.id })

    if (!inserted) {
      throw new Error('Failed to insert project')
    }

    return { projectId: inserted.id }
  })
}
