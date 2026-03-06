'use client'

import { TableRow } from '@/components/ui/Table'
import { AdventureIllustration } from '../../adventure-illustration/AdventureIllustration'
import {
  EmptyDescription,
  EmptyRow,
  EmptyStateCell,
  EmptyStateContainer,
  EmptyTitle,
  FloatingLabelBottom,
  FloatingLabelTop,
  IllustrationWrapper,
  LabelCard,
  LabelCardSecondary,
  LabelPointer,
  LabelRow,
  NoResultsCell,
  PulseDot,
  SecondaryLabelText,
} from './ApplicationsTableEmptyState.styles'

export type EmptyStateVariant = 'empty' | 'no-results'

export interface ApplicationsTableEmptyStateProps {
  variant: EmptyStateVariant
}

export function ApplicationsTableEmptyState({
  variant,
}: ApplicationsTableEmptyStateProps) {
  if (variant === 'no-results') {
    return (
      <TableRow>
        <NoResultsCell colSpan={6}>
          No applications found matching your criteria
        </NoResultsCell>
      </TableRow>
    )
  }

  return (
    <EmptyRow>
      <EmptyStateCell colSpan={6}>
        <EmptyStateContainer>
          <IllustrationWrapper>
            <AdventureIllustration />

            <FloatingLabelTop>
              <LabelCard>
                <LabelRow>
                  <PulseDot />
                  Dream Job
                </LabelRow>
              </LabelCard>
            </FloatingLabelTop>

            <FloatingLabelBottom>
              <LabelCardSecondary>
                <SecondaryLabelText>You are here</SecondaryLabelText>
                <LabelPointer />
              </LabelCardSecondary>
            </FloatingLabelBottom>
          </IllustrationWrapper>

          <EmptyTitle>Ready to start your journey?</EmptyTitle>
          <EmptyDescription>
            Your applications dashboard is waiting for its first success story.
            Complete your profile to unlock full tracking capabilities.
          </EmptyDescription>
        </EmptyStateContainer>
      </EmptyStateCell>
    </EmptyRow>
  )
}
