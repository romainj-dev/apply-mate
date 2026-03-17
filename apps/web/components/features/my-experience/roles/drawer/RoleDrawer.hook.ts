import { useReducer, useCallback, useState } from 'react'
import { UpsertRoleDocument, type UpsertRoleInput } from '@/graphql/generated'
import { useMutation, useQueryClient } from '@/modules/requests/client/hooks'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { KEY_METRIC_TYPES, type KeyMetricType } from '@/types/key-metrics'
import type { ExperienceRole } from '../data-types'
import {
  roleFormReducer,
  initFormState,
  type RoleFormState,
  type RoleFormAction,
} from './form-state'

/* ── Date helpers ──────────────────────────────────────────────────── */

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

function toDateString(month: string, year: string): string | null {
  if (!month || !year) return null
  return `${year}-${month}-01`
}

function computePeriodLabel(state: RoleFormState): string | null {
  if (!state.startMonth || !state.startYear) return null
  const startLabel = `${MONTH_NAMES[parseInt(state.startMonth, 10) - 1]} ${state.startYear}`
  if (state.isCurrent) return `${startLabel} - Present`
  if (!state.endMonth || !state.endYear) return startLabel
  const endLabel = `${MONTH_NAMES[parseInt(state.endMonth, 10) - 1]} ${state.endYear}`
  return `${startLabel} - ${endLabel}`
}

function computeDurationLabel(state: RoleFormState): string | null {
  if (!state.startMonth || !state.startYear) return null
  const startDate = new Date(
    parseInt(state.startYear, 10),
    parseInt(state.startMonth, 10) - 1
  )
  const endDate = state.isCurrent
    ? new Date()
    : state.endMonth && state.endYear
      ? new Date(parseInt(state.endYear, 10), parseInt(state.endMonth, 10) - 1)
      : null

  if (!endDate) return null

  let months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  if (months < 0) months = 0

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) return `${remainingMonths}m`
  if (remainingMonths === 0) return `${years}y`
  return `${years}y ${remainingMonths}m`
}

function buildTeamStructure(state: RoleFormState): string | null {
  const parts: string[] = []
  if (state.teamDevelopers)
    parts.push(
      `${state.teamDevelopers} Developer${parseInt(state.teamDevelopers) !== 1 ? 's' : ''}`
    )
  if (state.teamDesigners)
    parts.push(
      `${state.teamDesigners} Designer${parseInt(state.teamDesigners) !== 1 ? 's' : ''}`
    )
  if (state.teamPMs)
    parts.push(`${state.teamPMs} PM${parseInt(state.teamPMs) !== 1 ? 's' : ''}`)
  return parts.length > 0 ? parts.join(', ') : null
}

function resolveMetricType(label: string): {
  type: KeyMetricType
  customType?: string
} {
  const normalised = label.toLowerCase().replace(/[\s-_]/g, '')
  for (const key of KEY_METRIC_TYPES) {
    if (key === 'other') continue
    const normKey = key.replace(/-/g, '')
    if (normalised === normKey || normalised.includes(normKey)) {
      return { type: key }
    }
  }
  return { type: 'other', customType: label }
}

function computeStatus(state: RoleFormState): string {
  if (state.title && state.company && state.summary) return 'complete'
  return 'incomplete'
}

/* ── Hook ──────────────────────────────────────────────────────────── */

interface UseRoleFormOptions {
  role?: ExperienceRole
  onClose: () => void
}

export type ValidationErrors = Partial<Record<'title' | 'company', string>>

interface UseRoleFormReturn {
  state: RoleFormState
  dispatch: React.Dispatch<RoleFormAction>
  handleSave: () => void
  isPending: boolean
  isEditMode: boolean
  saveError: Error | null
  validationErrors: ValidationErrors
  clearValidationError: (field: 'title' | 'company') => void
}

export function useRoleForm({
  role,
  onClose,
}: UseRoleFormOptions): UseRoleFormReturn {
  const isEditMode = !!role
  const [state, dispatch] = useReducer(roleFormReducer, role, initFormState)

  const queryClient = useQueryClient()
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const clearValidationError = useCallback((field: 'title' | 'company') => {
    setValidationErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])
  const { mutate, isPending, error } = useMutation(UpsertRoleDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.experienceProfile.get(),
      })
      onClose()
    },
  })

  const handleSave = useCallback(() => {
    const errors: ValidationErrors = {}
    if (!state.title.trim()) errors.title = 'Role title is required'
    if (!state.company.trim()) errors.company = 'Company is required'
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    setValidationErrors({})

    // techStack / keyMetrics are typed as JSONObject in the GraphQL schema
    // but we send structured arrays — cast via unknown to satisfy the generated types
    const techStackJson = state.techStack as unknown as Record<string, unknown>
    const keyMetricsJson = state.keyMetrics
      .filter((m) => m.label && m.value)
      .map((m) => {
        const resolved = resolveMetricType(m.label)
        return {
          type: resolved.type,
          customType: resolved.customType,
          value: m.value,
          text: m.label,
        }
      }) as unknown as Record<string, unknown>

    const input: UpsertRoleInput = {
      id: role?.id ?? null,
      title: state.title,
      company: state.company,
      employmentType: state.employmentType,
      startDate: toDateString(state.startMonth, state.startYear),
      endDate: state.isCurrent
        ? null
        : toDateString(state.endMonth, state.endYear),
      isCurrent: state.isCurrent,
      periodLabel: computePeriodLabel(state),
      durationLabel: computeDurationLabel(state),
      status: computeStatus(state),
      summary: state.summary || null,
      techStack: techStackJson,
      methodologies: state.methodology ? [state.methodology] : [],
      teamStructure: buildTeamStructure(state),
      keyAchievements: state.keyAchievements.map((a) => a.text).filter(Boolean),
      keyMetrics: keyMetricsJson,
      projects: state.projects
        .filter((p) => p.title)
        .map((p) => ({
          title: p.title,
          description: p.description || null,
          techStack: p.techStack as unknown as Record<string, unknown>,
        })),
    }

    mutate({ input })
  }, [state, role?.id, mutate])

  return {
    state,
    dispatch,
    handleSave,
    isPending,
    isEditMode,
    saveError: error ?? null,
    validationErrors,
    clearValidationError,
  }
}
