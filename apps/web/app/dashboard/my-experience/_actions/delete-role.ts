'use server'

import { auth } from '@/modules/session/server'
import { withRlsDb } from '@/lib/db/rls'
import { deleteRole } from '@/lib/db/services/role-service'
import type { DeleteRoleResult } from './delete-role-types'

export async function deleteRoleAction(
  roleId: string
): Promise<DeleteRoleResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!roleId || typeof roleId !== 'string') {
    return { success: false, error: 'Invalid role ID' }
  }

  try {
    await withRlsDb(session.user.id, (tx) => deleteRole(tx, roleId))
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete role'
    return { success: false, error: message }
  }
}
