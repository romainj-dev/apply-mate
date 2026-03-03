'use client'

import { ArrowRight, Play, Sparkles } from 'lucide-react'
import {
  AuroraBlob1,
  AuroraBlob2,
  AuroraContainer,
  Badge,
  ButtonGroup,
  Container,
  DashboardImage,
  GlassCard,
  GradientText,
  GridBackground,
  Heading,
  ImageContainer,
  ImageGlow,
  ImageOverlay,
  Inner,
  OutlineButton,
  PrimaryButton,
  Section,
  Subtitle,
  VideoFrame,
} from './hero.styles'

export function Hero() {
  return (
    <Section>
      <GridBackground />
      <AuroraContainer>
        <AuroraBlob1 />
        <AuroraBlob2 />
      </AuroraContainer>

      <Container>
        <Inner>
          <Badge>
            <Sparkles size={16} />
            <span>Powered by advanced AI</span>
          </Badge>

          <Heading>
            Smarter job applications <br />
            <GradientText>powered by AI</GradientText>
          </Heading>

          <Subtitle>
            Generate tailored resumes and cover letters designed to pass AI
            recruiter filters. Track all your applications in one organized
            dashboard.
          </Subtitle>

          <ButtonGroup>
            <PrimaryButton size="lg">
              Start for free
              <ArrowRight size={16} />
            </PrimaryButton>
            <OutlineButton size="lg" variant="outline">
              <Play size={16} fill="currentColor" />
              See how it works
            </OutlineButton>
          </ButtonGroup>

          <ImageContainer>
            <ImageGlow />
            <GlassCard>
              <VideoFrame>
                <DashboardImage
                  src="/hero-dashboard.png"
                  alt="ApplyMate Dashboard"
                  fill
                  sizes="(min-width: 1200px) 1200px, 100vw"
                  priority
                />
                <ImageOverlay />
              </VideoFrame>
            </GlassCard>
          </ImageContainer>
        </Inner>
      </Container>
    </Section>
  )
}
