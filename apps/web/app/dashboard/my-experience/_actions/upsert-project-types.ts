export type UpsertProjectResult = {
  success: boolean
  projectId?: string
  fieldErrors?: Record<string, string[]>
  error?: string
}

export const INITIAL_UPSERT_PROJECT_STATE: UpsertProjectResult = {
  success: false,
}
