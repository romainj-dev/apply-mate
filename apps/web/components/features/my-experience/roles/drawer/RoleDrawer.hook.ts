import {
  useReducer,
  useCallback,
  useState,
  useEffect,
  useRef,
  useActionState,
  useTransition,
} from 'react'
import { useQueryClient } from '@/modules/requests/client/hooks'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { KEY_METRIC_TYPES, type KeyMetricType } from '@/types/key-metrics'
import type { ExperienceRole } from '../data-types'
import {
  roleFormReducer,
  initFormState,
  type RoleFormState,
  type RoleFormAction,
} from './form-state'
import { upsertRoleAction } from '@/app/dashboard/my-experience/_actions/upsert-role'
import { INITIAL_UPSERT_ROLE_STATE } from '@/app/dashboard/my-experience/_actions/upsert-role-types'

/* ── Helpers ──────────────────────────────────────────────────────── */

function toDateString(month: string, year: string): string | null {
  if (!month || !year) return null
  return `${year}-${month}-01`
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

/* ── Hook ──────────────────────────────────────────────────────────── */

interface UseRoleFormOptions {
  role?: ExperienceRole
  onClose: () => void
}

interface UseRoleFormReturn {
  state: RoleFormState
  dispatch: React.Dispatch<RoleFormAction>
  handleSubmit: () => void
  isPending: boolean
  isEditMode: boolean
  fieldErrors: Record<string, string[]> | null
  serverError: string | null
}

export function useRoleForm({
  role,
  onClose,
}: UseRoleFormOptions): UseRoleFormReturn {
  const isEditMode = !!role
  const [state, dispatch] = useReducer(roleFormReducer, role, initFormState)

  // Reset form when role changes (e.g. open Add vs Edit) without remounting
  const roleIdRef = useRef(role?.id)
  useEffect(() => {
    if (role?.id !== roleIdRef.current) {
      roleIdRef.current = role?.id
      dispatch({ type: 'RESET', role })
    }
  }, [role])

  const queryClient = useQueryClient()
  const [clientErrors, setClientErrors] = useState<Record<
    string,
    string[]
  > | null>(null)

  const [actionResult, formAction] = useActionState(
    upsertRoleAction,
    INITIAL_UPSERT_ROLE_STATE
  )
  const [isTransitioning, startTransition] = useTransition()

  // On success: invalidate cache and close drawer
  const prevResultRef = useRef(actionResult)
  useEffect(() => {
    if (actionResult !== prevResultRef.current && actionResult.success) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.experienceProfile.get(),
      })
      onClose()
    }
    prevResultRef.current = actionResult
  }, [actionResult, queryClient, onClose])

  const buildInput = useCallback(() => {
    const keyMetrics = state.keyMetrics
      .filter((m) => m.label && m.value)
      .map((m) => {
        const resolved = resolveMetricType(m.label)
        return {
          type: resolved.type,
          customType: resolved.customType,
          value: m.value,
          text: m.label,
        }
      })

    return {
      id: role?.id ?? null,
      title: state.title,
      company: state.company,
      employmentType: state.employmentType,
      startDate: toDateString(state.startMonth, state.startYear),
      endDate: state.isCurrent
        ? null
        : toDateString(state.endMonth, state.endYear),
      isCurrent: state.isCurrent,
      summary: state.summary || null,
      techStack: state.techStack,
      methodologies: state.methodology ? [state.methodology] : [],
      teamStructure: buildTeamStructure(state),
      keyAchievements: state.keyAchievements.map((a) => a.text).filter(Boolean),
      keyMetrics,
      projects: state.projects
        .filter((p) => p.title)
        .map((p) => ({
          title: p.title,
          description: p.description || null,
          techStack: p.techStack,
          achievements: p.achievements.map((a) => a.text).filter(Boolean),
        })),
    }
  }, [state, role?.id])

  const handleSubmit = useCallback(() => {
    const input = buildInput()

    // Lightweight client-side check for required fields (instant feedback).
    // Full Zod validation runs server-side in the action.
    const errors: Record<string, string[]> = {}
    if (!input.title.trim()) errors.title = ['Title is required']
    if (!input.company.trim()) errors.company = ['Company is required']
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors)
      return
    }

    setClientErrors(null)

    const fd = new FormData()
    fd.set('payload', JSON.stringify(input))
    startTransition(() => {
      formAction(fd)
    })
  }, [buildInput, formAction, startTransition])

  // Merge client errors (priority) with server field errors
  const fieldErrors = clientErrors ?? actionResult.fieldErrors ?? null

  return {
    state,
    dispatch,
    handleSubmit,
    isPending: isTransitioning,
    isEditMode,
    fieldErrors,
    serverError: actionResult.error ?? null,
  }
}
