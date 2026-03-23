import type { RlsTransaction } from '@/lib/db/rls'
import {
  userExperienceProfiles,
  userExperienceRoleProjects,
  userExperienceRoles,
} from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

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

type TechStackItem = { value: string; customLabel?: string | null }
type KeyMetricItem = {
  type: string
  customType?: string | null
  value: string
  text: string
}

type BuildRoleValuesInput = {
  title: string
  company: string
  employmentType?: string | null
  location?: string | null
  startDate?: string | null
  endDate?: string | null
  isCurrent?: boolean | null
  summary?: string | null
  techStack?: TechStackItem[] | null
  methodologies?: string[] | null
  teamStructure?: string | null
  keyAchievements?: string[] | null
  keyMetrics?: KeyMetricItem[] | null
}

export function buildRoleValues(input: BuildRoleValuesInput): RoleValues {
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

type UpsertRoleServiceInput = BuildRoleValuesInput & {
  id?: string | null
  projects?: Array<{
    title: string
    period?: string | null
    description?: string | null
    achievements?: string[] | null
    techStack?: TechStackItem[] | null
  }> | null
}

export async function upsertRole(
  tx: RlsTransaction,
  input: UpsertRoleServiceInput
): Promise<{ roleId: string }> {
  return tx.transaction(async (stx) => {
    const roleValues = buildRoleValues(input)

    let roleId: string

    if (input.id) {
      // RLS ensures the UPDATE only affects the current user's own roles
      const [updated] = await stx
        .update(userExperienceRoles)
        .set(roleValues)
        .where(eq(userExperienceRoles.id, input.id))
        .returning({ id: userExperienceRoles.id })

      if (!updated) {
        throw new Error('Role not found')
      }

      roleId = input.id

      // Remove existing projects for re-insert
      await stx
        .delete(userExperienceRoleProjects)
        .where(eq(userExperienceRoleProjects.roleId, roleId))
    } else {
      // TODO send profile id to the service and remove this query
      // Currently use the single visible profile inside the RLS-scoped transaction.
      const [profile] = await stx
        .select({ id: userExperienceProfiles.id })
        .from(userExperienceProfiles)
        .limit(1)

      if (!profile) {
        throw new Error('Experience profile not found')
      }

      const [inserted] = await stx
        .insert(userExperienceRoles)
        .values({ profileId: profile.id, ...roleValues })
        .returning({ id: userExperienceRoles.id })

      if (!inserted) {
        throw new Error('Failed to insert role')
      }

      roleId = inserted.id
    }

    // Insert projects
    const projects = input.projects ?? []
    if (projects.length > 0) {
      await stx.insert(userExperienceRoleProjects).values(
        projects.map((p) => ({
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

/* ── Delete role ─────────────────────────────────────────────────── */

export async function deleteRole(
  tx: RlsTransaction,
  roleId: string
): Promise<void> {
  await tx.transaction(async (stx) => {
    // RLS ensures only the current user's projects/roles are affected
    await stx
      .delete(userExperienceRoleProjects)
      .where(eq(userExperienceRoleProjects.roleId, roleId))

    const deleted = await stx
      .delete(userExperienceRoles)
      .where(eq(userExperienceRoles.id, roleId))
      .returning({ id: userExperienceRoles.id })

    if (deleted.length === 0) {
      throw new Error('Role not found')
    }
  })
}

/* ── Single-project upsert ───────────────────────────────────────── */

type UpsertProjectServiceInput = {
  id?: string | null
  roleId: string
  title: string
  period?: string | null
  description?: string | null
  achievements?: string[] | null
  techStack?: TechStackItem[] | null
}

export async function upsertProject(
  tx: RlsTransaction,
  input: UpsertProjectServiceInput
): Promise<{ projectId: string }> {
  return tx.transaction(async (stx) => {
    const projectValues = {
      title: input.title,
      period: input.period ?? null,
      description: input.description ?? null,
      achievements: input.achievements ?? [],
      techStack: input.techStack ?? [],
    }

    if (input.id) {
      // RLS ensures the UPDATE only affects the current user's own projects
      const [updated] = await stx
        .update(userExperienceRoleProjects)
        .set(projectValues)
        .where(eq(userExperienceRoleProjects.id, input.id))
        .returning({ id: userExperienceRoleProjects.id })

      if (!updated) {
        throw new Error('Project not found')
      }

      return { projectId: input.id }
    }

    // Verify role exists (RLS ensures only own roles are visible)
    const [role] = await stx
      .select({ id: userExperienceRoles.id })
      .from(userExperienceRoles)
      .where(eq(userExperienceRoles.id, input.roleId))
      .limit(1)

    if (!role) {
      throw new Error('Role not found')
    }

    // RLS WITH CHECK ensures roleId belongs to the current user's chain
    const [inserted] = await stx
      .insert(userExperienceRoleProjects)
      .values({ roleId: input.roleId, ...projectValues })
      .returning({ id: userExperienceRoleProjects.id })

    if (!inserted) {
      throw new Error('Failed to insert project')
    }

    return { projectId: inserted.id }
  })
}
