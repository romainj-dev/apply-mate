import type { Theme } from '@/styles/theme'
import { EMPLOYMENT_TYPES, type EmploymentType } from '@/types/employment-types'
type StatusKey = keyof Theme['colors']['status']

type EmploymentTypeBadgeConfig = {
  label: string
  statusKey: StatusKey
}

const EMPLOYMENT_TYPE_MAP: Record<EmploymentType, EmploymentTypeBadgeConfig> = {
  'full-time': { label: 'Full-time', statusKey: 'info' },
  contract: { label: 'Contract', statusKey: 'progress' },
  'side-project': { label: 'Side Project', statusKey: 'attention' },
  'open-source': { label: 'Open Source', statusKey: 'success' },
  freelance: { label: 'Freelance', statusKey: 'warning' },
  internship: { label: 'Internship', statusKey: 'progress' },
}

function isEmploymentType(
  value: string | null | undefined
): value is EmploymentType {
  if (!value) return false
  return EMPLOYMENT_TYPES.includes(value as EmploymentType)
}

export function getEmploymentTypeBadge(
  employmentType: string | null | undefined
): EmploymentTypeBadgeConfig | null {
  if (!isEmploymentType(employmentType)) return null
  return EMPLOYMENT_TYPE_MAP[employmentType]
}
