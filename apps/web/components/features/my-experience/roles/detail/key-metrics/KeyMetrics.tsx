'use client'

import type { KeyMetricType } from '@/types/key-metrics'
import { getMetricIcon } from '../../key-metric-catalog'
import type { ExperienceRole } from '../../data-types'
import {
  MetricCard,
  MetricIconWrapper,
  MetricLabel,
  MetricValue,
  MetricsGrid,
} from './KeyMetrics.styles'

type RoleKeyMetric = NonNullable<ExperienceRole['keyMetrics']>[number]

interface KeyMetricsProps {
  metrics: RoleKeyMetric[]
}

export function KeyMetrics({ metrics }: KeyMetricsProps) {
  return (
    <MetricsGrid>
      {metrics.map((metric) => {
        const Icon = getMetricIcon(metric.type as KeyMetricType)
        return (
          <MetricCard key={`${metric.type}-${metric.text}`}>
            <MetricIconWrapper>
              <Icon />
            </MetricIconWrapper>
            <MetricValue>{metric.value}</MetricValue>
            <MetricLabel>{metric.text}</MetricLabel>
          </MetricCard>
        )
      })}
    </MetricsGrid>
  )
}
