'use client'

import { Lock, Shield, Eye, FileCheck } from 'lucide-react'
import {
  Section,
  Container,
  SectionHeader,
  Heading,
  Lead,
  Grid,
  FeatureItem,
  FeatureIconWrapper,
  FeatureTitle,
  FeatureDescription,
} from './security.styles'

const securityFeatures = [
  {
    icon: Lock,
    title: 'Encrypted storage',
    description:
      'All your documents and data are encrypted at rest and in transit.',
  },
  {
    icon: Shield,
    title: 'GDPR compliant',
    description:
      'Full compliance with data protection regulations and user privacy rights.',
  },
  {
    icon: Eye,
    title: 'Your data, your control',
    description: 'Delete your applications and data anytime with one click.',
  },
  {
    icon: FileCheck,
    title: 'Secure authentication',
    description:
      'OAuth-only login via trusted providers like Google and LinkedIn.',
  },
]

export function Security() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <Heading>Your data is safe with us</Heading>
          <Lead>
            Enterprise-grade security and privacy protection for your sensitive
            information
          </Lead>
        </SectionHeader>

        <Grid>
          {securityFeatures.map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureIconWrapper>
                <feature.icon size={24} />
              </FeatureIconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureItem>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
