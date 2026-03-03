'use client'

import {
  Container,
  StepGroup,
  StepBadge,
  StepLabel,
  Connector,
} from './progress-steps.styles'

export type Step = 'input' | 'processing'

export function ProgressSteps({ step }: { step: Step }) {
  return (
    <Container>
      <StepGroup>
        <StepBadge $active={step === 'input'}>1</StepBadge>
        <StepLabel>Share</StepLabel>
      </StepGroup>
      <Connector />
      <StepGroup>
        <StepBadge $active={step === 'processing'}>2</StepBadge>
        <StepLabel>Process</StepLabel>
      </StepGroup>
      <Connector />
      <StepGroup>
        <StepBadge $active={false}>3</StepBadge>
        <StepLabel>Review</StepLabel>
      </StepGroup>
    </Container>
  )
}
