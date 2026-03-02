'use client'

import { Target, Zap, FolderCheck, Shield } from 'lucide-react'
import {
  Section,
  Container,
  SectionHeader,
  Heading,
  Lead,
  Grid,
  Card,
  IconWrapper,
  CardTitle,
  CardDescription,
} from './benefits.styles'

const benefits = [
  {
    icon: Target,
    title: 'Beat AI filters',
    description:
      'Generate applications optimized with the right keywords and formatting to pass automated screening.',
  },
  {
    icon: Zap,
    title: 'Save hours of work',
    description:
      'Stop manually customizing every resume and cover letter. Get professional results in seconds.',
  },
  {
    icon: FolderCheck,
    title: 'Stay organized',
    description:
      'Track all your applications in one dashboard. Never lose track of where you applied or what you sent.',
  },
  {
    icon: Shield,
    title: 'Maintain quality',
    description:
      'Every document maintains professional quality while being perfectly tailored to each opportunity.',
  },
]

export function Benefits() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <Heading>Why job seekers choose ApplyMate</Heading>
          <Lead>Solve the biggest pain points of modern job searching</Lead>
        </SectionHeader>

        <Grid>
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <IconWrapper>
                <benefit.icon size={24} />
              </IconWrapper>
              <CardTitle>{benefit.title}</CardTitle>
              <CardDescription>{benefit.description}</CardDescription>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
