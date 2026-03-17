'use client'

import { Input } from '@/components/ui/Input'
import type { RoleFormState, StringField } from '../../form-state'
import {
  TeamGrid,
  TeamRow,
  TeamInputGroup,
  MethodologyGroup,
  TeamLabel,
  SectionLabel,
  MethodologySelect,
} from './TeamSection.styles'

const METHODOLOGIES = [
  'Agile / Scrum',
  'Kanban',
  'Waterfall',
  'Lean',
  'XP',
  'SAFe',
]

interface TeamSectionProps {
  state: RoleFormState
  onFieldChange: (field: StringField, value: string) => void
}

export function TeamSection({ state, onFieldChange }: TeamSectionProps) {
  return (
    <TeamGrid>
      <TeamRow>
        <TeamInputGroup>
          <SectionLabel>Team Size</SectionLabel>
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={state.teamDevelopers}
            onChange={(e) => onFieldChange('teamDevelopers', e.target.value)}
          />
          <TeamLabel>Developers</TeamLabel>
        </TeamInputGroup>
        <TeamInputGroup>
          <SectionLabel>&nbsp;</SectionLabel>
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={state.teamDesigners}
            onChange={(e) => onFieldChange('teamDesigners', e.target.value)}
          />
          <TeamLabel>Designers</TeamLabel>
        </TeamInputGroup>
        <TeamInputGroup>
          <SectionLabel>&nbsp;</SectionLabel>
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={state.teamPMs}
            onChange={(e) => onFieldChange('teamPMs', e.target.value)}
          />
          <TeamLabel>PMs</TeamLabel>
        </TeamInputGroup>
        <MethodologyGroup>
          <SectionLabel>Methodology</SectionLabel>
          <MethodologySelect
            value={state.methodology}
            onChange={(e) => onFieldChange('methodology', e.target.value)}
          >
            <option value="">Select...</option>
            {METHODOLOGIES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </MethodologySelect>
        </MethodologyGroup>
      </TeamRow>
    </TeamGrid>
  )
}
