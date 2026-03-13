'use client'

import {
  Container,
  StepGroup,
  StepBadge,
  StepLabel,
  Connector,
} from './ProgressSteps.styles'

export type Step = 'input' | 'processing'

interface ProgressStepsProps {
  step: Step
}

export function ProgressSteps({ step }: ProgressStepsProps) {
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
