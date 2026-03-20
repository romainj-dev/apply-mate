'use server'

import { auth } from '@/modules/session/server'
import { withRlsDb } from '@/lib/db/rls'
import {
  upsertProject,
  upsertSingleProjectSchema,
} from '@/lib/db/services/role-service'
import type { UpsertProjectResult } from './upsert-project-types'

export async function upsertProjectAction(
  _prevState: UpsertProjectResult,
  formData: FormData
): Promise<UpsertProjectResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' }
  }

  const rawJson = formData.get('payload')
  if (typeof rawJson !== 'string') {
    return { success: false, error: 'Invalid form submission' }
  }

  let rawInput: unknown
  try {
    rawInput = JSON.parse(rawJson)
  } catch {
    return { success: false, error: 'Invalid JSON payload' }
  }

  const parsed = upsertSingleProjectSchema.safeParse(rawInput)
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of parsed.error.issues) {
      const path = issue.path.map(String).join('.') || '_root'
      if (!fieldErrors[path]) fieldErrors[path] = []
      fieldErrors[path].push(issue.message)
    }
    return { success: false, fieldErrors }
  }

  try {
    const result = await withRlsDb(session.user.id, (tx) =>
      upsertProject(tx, parsed.data)
    )
    return { success: true, projectId: result.projectId }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to save project'
    return { success: false, error: message }
  }
}
