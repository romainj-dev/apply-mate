export type UpsertRoleResult = {
  success: boolean
  roleId?: string
  fieldErrors?: Record<string, string[]>
  error?: string
}

export const INITIAL_UPSERT_ROLE_STATE: UpsertRoleResult = { success: false }
