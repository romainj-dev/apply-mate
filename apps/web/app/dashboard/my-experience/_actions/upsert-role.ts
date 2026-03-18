'use server'

import { auth } from '@/modules/session/server'
import {
  upsertRoleByUserId,
  upsertRoleSchema,
} from '@/lib/db/services/role-service'
import type { UpsertRoleResult } from './upsert-role-types'

export async function upsertRoleAction(
  _prevState: UpsertRoleResult,
  formData: FormData
): Promise<UpsertRoleResult> {
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

  const parsed = upsertRoleSchema.safeParse(rawInput)
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
    const result = await upsertRoleByUserId(session.user.id, parsed.data)
    return { success: true, roleId: result.roleId }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save role'
    return { success: false, error: message }
  }
}
