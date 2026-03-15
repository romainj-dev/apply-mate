export const EMPLOYMENT_TYPES = [
  'full-time',
  'contract',
  'side-project',
  'open-source',
  'freelance',
  'internship',
] as const

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number]
