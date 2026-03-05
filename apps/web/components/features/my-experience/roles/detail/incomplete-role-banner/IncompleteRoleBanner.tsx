'use client'

import { Button } from '@/components/ui/button'
import {
  ButtonRow,
  FlexFill,
  IncompleteWarning,
  SmallEditIcon,
  WarningAlertIcon,
  WarningRow,
  WarningText,
  WarningTitle,
} from './IncompleteRoleBanner.styles'

export function IncompleteRoleBanner() {
  return (
    <IncompleteWarning>
      <WarningRow>
        <WarningAlertIcon />
        <FlexFill>
          <WarningTitle>This role needs more details</WarningTitle>
          <WarningText>
            Add projects, tech stack, and achievements to strengthen your
            profile
          </WarningText>
        </FlexFill>
      </WarningRow>
      <ButtonRow>
        <Button variant="outline" size="sm">
          <SmallEditIcon />
          Edit
        </Button>
      </ButtonRow>
    </IncompleteWarning>
  )
}
