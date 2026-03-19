'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { KEY_METRIC_CATALOG } from '../../../key-metric-catalog'
import { KEY_METRIC_TYPES, type KeyMetricType } from '@/types/key-metrics'
import type { RoleFormState } from '../../form-state'
import {
  Container,
  HeaderRow,
  SectionLabel,
  MetricCard,
  MetricTopRow,
  MetricSelectWrapper,
  MetricFieldsRow,
  MetricLabelInput,
  MetricValueInput,
  RemoveButton,
} from './KeyMetricsSection.styles'

const CATALOG_ENTRIES = KEY_METRIC_TYPES.filter((t) => t !== 'other').map(
  (type) => ({
    type,
    label: KEY_METRIC_CATALOG[type].defaultText,
  })
)

interface KeyMetricsSectionProps {
  metrics: RoleFormState['keyMetrics']
  onAdd: () => void
  onRemove: (index: number) => void
  onSetMetricType: (index: number, metricType: KeyMetricType) => void
  onUpdate: (index: number, field: 'label' | 'value', value: string) => void
}

export function KeyMetricsSection({
  metrics,
  onAdd,
  onRemove,
  onSetMetricType,
  onUpdate,
}: KeyMetricsSectionProps) {
  return (
    <Container>
      <HeaderRow>
        <SectionLabel>Key Metrics</SectionLabel>
        <Button variant="ghost" size="sm" type="button" onClick={onAdd}>
          <Plus size={14} />
          Add
        </Button>
      </HeaderRow>

      {metrics.map((metric, index) => (
        <MetricCard key={metric.localId}>
          <MetricTopRow>
            <MetricSelectWrapper>
              <Select
                value={metric.metricType || undefined}
                onValueChange={(val) =>
                  onSetMetricType(index, val as KeyMetricType)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a metric..." />
                </SelectTrigger>
                <SelectContent>
                  {CATALOG_ENTRIES.map((entry) => (
                    <SelectItem key={entry.type} value={entry.type}>
                      {entry.label}
                    </SelectItem>
                  ))}
                  <SelectSeparator />
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </MetricSelectWrapper>
            <RemoveButton
              type="button"
              onClick={() => onRemove(index)}
              aria-label="Remove metric"
            >
              <Trash2 size={16} />
            </RemoveButton>
          </MetricTopRow>

          {metric.metricType && (
            <MetricFieldsRow>
              <MetricLabelInput>
                <Input
                  placeholder={
                    metric.metricType === 'other'
                      ? 'Describe your metric...'
                      : 'Metric label'
                  }
                  value={metric.label}
                  onChange={(e) => onUpdate(index, 'label', e.target.value)}
                />
              </MetricLabelInput>
              <MetricValueInput>
                <Input
                  placeholder="e.g., -40%"
                  value={metric.value}
                  onChange={(e) => onUpdate(index, 'value', e.target.value)}
                />
              </MetricValueInput>
            </MetricFieldsRow>
          )}
        </MetricCard>
      ))}
    </Container>
  )
}
