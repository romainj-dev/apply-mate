import {
  Activity,
  BarChart3,
  Bug,
  Clock,
  DollarSign,
  Download,
  Rocket,
  Shield,
  Star,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { KeyMetricItem, KeyMetricType } from '@/types/key-metrics'

type MetricEntry = {
  icon: LucideIcon
  defaultText: string
}

export const KEY_METRIC_CATALOG: Record<KeyMetricType, MetricEntry> = {
  'github-stars': { icon: Star, defaultText: 'GitHub Stars' },
  'weekly-downloads': { icon: Download, defaultText: 'Weekly Downloads' },
  'npm-downloads': { icon: Download, defaultText: 'npm Downloads' },
  'api-response-time': { icon: Clock, defaultText: 'API Response Time' },
  'infrastructure-costs': {
    icon: DollarSign,
    defaultText: 'Infrastructure Costs',
  },
  'team-uptime': { icon: TrendingUp, defaultText: 'Team Uptime' },
  'code-coverage': { icon: Shield, defaultText: 'Code Coverage' },
  'deployment-frequency': {
    icon: Rocket,
    defaultText: 'Deployment Frequency',
  },
  'bug-reduction': { icon: Bug, defaultText: 'Bug Reduction' },
  'revenue-impact': { icon: DollarSign, defaultText: 'Revenue Impact' },
  'user-growth': { icon: Users, defaultText: 'User Growth' },
  performance: { icon: Activity, defaultText: 'Performance' },
  'cost-reduction': { icon: DollarSign, defaultText: 'Cost Reduction' },
  'team-size': { icon: Users, defaultText: 'Team Size' },
  'active-users': { icon: Users, defaultText: 'Active Users' },
  other: { icon: BarChart3, defaultText: 'Metric' },
}

/** Lucide icon component for a given metric type. */
export function getMetricIcon(metricType: KeyMetricType): LucideIcon {
  return KEY_METRIC_CATALOG[metricType].icon
}

/** Section heading label for a metric (type name or customType). */
export function getMetricTypeLabel(item: KeyMetricItem): string {
  if (item.type === 'other') return item.customType
  return KEY_METRIC_CATALOG[item.type].defaultText
}
