'use client'

import { Upload, FileText, Sparkles } from 'lucide-react'
import {
  Section,
  Container,
  SectionHeader,
  Heading,
  Lead,
  StepsGrid,
  StepItem,
  StepContent,
  StepIconWrapper,
  StepLabel,
  StepTitle,
  StepDescription,
  Connector,
} from './HowItWorks.styles'

const steps = [
  {
    Icon: Upload,
    title: 'Upload resume & profile setup',
    description:
      'Upload your existing resume and connect your LinkedIn profile to get started in seconds.',
  },
  {
    Icon: FileText,
    title: 'Paste job description',
    description:
      'Simply paste the job posting URL or description for any role you want to apply to.',
  },
  {
    Icon: Sparkles,
    title: 'Get AI-generated materials',
    description:
      'Receive a tailored resume, cover letter, and application answers optimized for AI filters.',
  },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader>
          <Heading>How it works</Heading>
          <Lead>
            Three simple steps to transform your job application process
          </Lead>
        </SectionHeader>

        <StepsGrid>
          {steps.map((step, index) => (
            <StepItem key={index}>
              <StepContent>
                <StepIconWrapper>
                  <step.Icon />
                </StepIconWrapper>
                <StepLabel>Step {index + 1}</StepLabel>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
              {index < steps.length - 1 && <Connector />}
            </StepItem>
          ))}
        </StepsGrid>
      </Container>
    </Section>
  )
}
