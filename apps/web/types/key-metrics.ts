/* ── Key metric types ────────────────────────────────────────────────── */

export const KEY_METRIC_TYPES = [
  'github-stars',
  'weekly-downloads',
  'npm-downloads',
  'api-response-time',
  'infrastructure-costs',
  'team-uptime',
  'code-coverage',
  'deployment-frequency',
  'bug-reduction',
  'revenue-impact',
  'user-growth',
  'performance',
  'cost-reduction',
  'team-size',
  'active-users',
  'other', // Escape hatch
] as const

export type KeyMetricType = (typeof KEY_METRIC_TYPES)[number]

/* ── DB shape ────────────────────────────────────────────────────────── */

type KnownMetric = {
  type: Exclude<KeyMetricType, 'other'>
  value: string
  text: string
}

type CustomMetric = {
  type: 'other'
  customType: string
  value: string
  text: string
}

export type KeyMetricItem = KnownMetric | CustomMetric
