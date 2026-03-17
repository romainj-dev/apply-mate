'use client'

import type React from 'react'
import { Plus, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Container,
  HeaderRow,
  SectionLabel,
  GenerateText,
  AchievementRow,
  CheckIcon,
  AchievementInput,
  RemoveButton,
} from './AchievementsSection.styles'

interface AchievementsSectionProps {
  achievements: Array<{ localId: string; text: string }>
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, text: string) => void
  onPaste: (index: number, text: string) => void
}

export function AchievementsSection({
  achievements,
  onAdd,
  onRemove,
  onUpdate,
  onPaste,
}: AchievementsSectionProps) {
  function handlePaste(
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ): void {
    const text = e.clipboardData.getData('text/plain')
    const lines = text.split(/\n/).filter((line) => line.trim().length > 0)

    if (lines.length > 1) {
      e.preventDefault()
      onPaste(index, text)
    }
  }

  return (
    <Container>
      <HeaderRow>
        <SectionLabel>Achievements</SectionLabel>
        <Button variant="ghost" size="sm" disabled>
          <Sparkles size={14} />
          <GenerateText>Generate from summary</GenerateText>
        </Button>
      </HeaderRow>

      {achievements.map((achievement, index) => (
        <AchievementRow key={achievement.localId}>
          <CheckIcon>&#10003;</CheckIcon>
          <AchievementInput>
            <Input
              placeholder="Describe an achievement..."
              value={achievement.text}
              onChange={(e) => onUpdate(index, e.target.value)}
              onPaste={(e) => handlePaste(e, index)}
            />
          </AchievementInput>
          <RemoveButton
            type="button"
            onClick={() => onRemove(index)}
            aria-label="Remove achievement"
          >
            <X size={16} />
          </RemoveButton>
        </AchievementRow>
      ))}

      <Button variant="outline" size="sm" type="button" onClick={onAdd}>
        <Plus size={14} />
        Add Achievement
      </Button>
    </Container>
  )
}
