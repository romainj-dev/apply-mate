'use client'

import { Briefcase, Globe } from 'lucide-react'
import { ToggleGroup, ToggleButton, ToggleLabel } from './TypeToggle.styles'

interface TypeToggleProps {
  roleGroup: 'work' | 'side-project'
  onChangeGroup: (group: 'work' | 'side-project') => void
}

export function TypeToggle({ roleGroup, onChangeGroup }: TypeToggleProps) {
  return (
    <div>
      <ToggleLabel>Type</ToggleLabel>
      <ToggleGroup>
        <ToggleButton
          type="button"
          $active={roleGroup === 'work'}
          onClick={() => onChangeGroup('work')}
        >
          <Briefcase size={16} />
          Work Role
        </ToggleButton>
        <ToggleButton
          type="button"
          $active={roleGroup === 'side-project'}
          onClick={() => onChangeGroup('side-project')}
        >
          <Globe size={16} />
          Side Project
        </ToggleButton>
      </ToggleGroup>
    </div>
  )
}
