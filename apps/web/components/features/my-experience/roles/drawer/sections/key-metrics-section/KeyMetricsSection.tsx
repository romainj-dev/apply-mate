'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { RoleFormState } from '../../form-state'
import {
  Container,
  HeaderRow,
  SectionLabel,
  MetricRow,
  MetricLabelInput,
  MetricValueInput,
  RemoveButton,
} from './KeyMetricsSection.styles'

interface KeyMetricsSectionProps {
  metrics: RoleFormState['keyMetrics']
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, field: 'label' | 'value', value: string) => void
}

export function KeyMetricsSection({
  metrics,
  onAdd,
  onRemove,
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
        <MetricRow key={metric.localId}>
          <MetricLabelInput>
            <Input
              placeholder="e.g., API Response Time"
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
          <RemoveButton
            type="button"
            onClick={() => onRemove(index)}
            aria-label="Remove metric"
          >
            <Trash2 size={16} />
          </RemoveButton>
        </MetricRow>
      ))}
    </Container>
  )
}
