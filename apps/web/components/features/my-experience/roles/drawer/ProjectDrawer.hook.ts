import { useReducer, useCallback, useState, useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from '@/modules/requests/client/hooks'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { UpsertProjectDocument } from '@/graphql/generated'
import type { ExperienceRoleProject } from '../data-types'
import {
  projectFormReducer,
  initProjectFormState,
  type ProjectDrawerFormState,
  type ProjectFormAction,
} from './project-form-state'

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

  const { mutate, isPending, error } = useMutation(UpsertProjectDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.experienceProfile.get(),
      })
      onClose()
    },
  })

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
    mutate({ input })
  }, [buildInput, mutate])

  const fieldErrors = clientErrors ?? null

  return {
    state,
    dispatch,
    handleSubmit,
    isPending,
    isEditMode,
    fieldErrors,
    serverError: error?.message ?? null,
  }
}
