'use client'

import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import {
  SummaryHeader,
  SummaryLabel,
  PolishText,
} from './SummarySection.styles'

interface SummarySectionProps {
  summary: string
  onChange: (value: string) => void
}

export function SummarySection({ summary, onChange }: SummarySectionProps) {
  return (
    <div>
      <SummaryHeader>
        <SummaryLabel>Summary</SummaryLabel>
        <Button variant="ghost" size="sm" disabled>
          <Sparkles size={14} />
          <PolishText>Polish</PolishText>
        </Button>
      </SummaryHeader>
      <Textarea
        placeholder="Describe your role and key responsibilities..."
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
    </div>
  )
}
