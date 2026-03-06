'use client'

import { FileText, Mail, MessageSquare, BarChart } from 'lucide-react'
import {
  AspectWrapper,
  Container,
  ContentCol,
  FeatureDescription,
  FeatureImage,
  FeatureRow,
  FeatureTitle,
  FeaturesGrid,
  Heading,
  HoverOverlay,
  IconBox,
  ImageCard,
  ImageCol,
  Lead,
  PrimaryText,
  Section,
  SectionHeader,
} from './Features.styles'

const features = [
  {
    Icon: FileText,
    title: 'Resume tailoring',
    description:
      'AI analyzes each job posting and automatically customizes your resume to match requirements and keywords.',
    image: '/feature-resume.png',
  },
  {
    Icon: Mail,
    title: 'AI cover letter writing',
    description:
      'Generate compelling, personalized cover letters that highlight your relevant experience for each position.',
    image: '/feature-cover-letter.png',
  },
  {
    Icon: MessageSquare,
    title: 'Application Q&A assistant',
    description:
      'Get AI-generated answers to common application questions, perfectly aligned with the job description.',
    image: '/feature-qa.png',
  },
  {
    Icon: BarChart,
    title: 'Application tracking dashboard',
    description:
      'Manage all your applications in one place. Search, filter, and access your materials anytime.',
    image: '/feature-tracking.png',
  },
]

export function Features() {
  return (
    <Section id="features">
      <Container>
        <SectionHeader>
          <Heading>
            Everything you need to{' '}
            <PrimaryText>land your dream job</PrimaryText>
          </Heading>
          <Lead>Powerful features designed to give you a competitive edge</Lead>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feature, index) => {
            const reversed = index % 2 === 1
            return (
              <FeatureRow key={index}>
                <ContentCol $reversed={reversed}>
                  <IconBox>
                    <feature.Icon />
                  </IconBox>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </ContentCol>
                <ImageCol $reversed={reversed}>
                  <ImageCard>
                    <AspectWrapper>
                      <FeatureImage
                        src={feature.image || '/placeholder.svg'}
                        alt={feature.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                      />
                      <HoverOverlay />
                    </AspectWrapper>
                  </ImageCard>
                </ImageCol>
              </FeatureRow>
            )
          })}
        </FeaturesGrid>
      </Container>
    </Section>
  )
}
