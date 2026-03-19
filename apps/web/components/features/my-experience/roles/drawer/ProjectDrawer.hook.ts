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
import type { ExperienceRoleProject } from '../data-types'
import {
  projectFormReducer,
  initProjectFormState,
  type ProjectDrawerFormState,
  type ProjectFormAction,
} from './project-form-state'
import { upsertProjectAction } from '@/app/dashboard/my-experience/_actions/upsert-project'
import { INITIAL_UPSERT_PROJECT_STATE } from '@/app/dashboard/my-experience/_actions/upsert-project-types'

/* ── Hook ──────────────────────────────────────────────────────────── */

interface UseProjectFormOptions {
  roleId: string
  project?: ExperienceRoleProject
  onClose: () => void
}

interface UseProjectFormReturn {
  state: ProjectDrawerFormState
  dispatch: React.Dispatch<ProjectFormAction>
  handleSubmit: () => void
  isPending: boolean
  isEditMode: boolean
  fieldErrors: Record<string, string[]> | null
  serverError: string | null
}

export function useProjectForm({
  roleId,
  project,
  onClose,
}: UseProjectFormOptions): UseProjectFormReturn {
  const isEditMode = !!project
  const [state, dispatch] = useReducer(
    projectFormReducer,
    project,
    initProjectFormState
  )

  // Reset form when project changes
  const projectIdRef = useRef(project?.id)
  useEffect(() => {
    if (project?.id !== projectIdRef.current) {
      projectIdRef.current = project?.id
      dispatch({ type: 'RESET', project })
    }
  }, [project])

  const queryClient = useQueryClient()
  const [clientErrors, setClientErrors] = useState<Record<
    string,
    string[]
  > | null>(null)

  const [actionResult, formAction] = useActionState(
    upsertProjectAction,
    INITIAL_UPSERT_PROJECT_STATE
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
    return {
      id: project?.id ?? null,
      roleId,
      title: state.title,
      description: state.description || null,
      techStack: state.techStack,
      achievements: state.achievements.map((a) => a.text).filter(Boolean),
    }
  }, [state, project?.id, roleId])

  const handleSubmit = useCallback(() => {
    const input = buildInput()

    const errors: Record<string, string[]> = {}
    if (!input.title.trim()) errors.title = ['Title is required']
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
