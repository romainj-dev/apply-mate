'use client'

import { Container } from './commons/section-patterns/SectionPatterns'
import {
  AuroraBlob1,
  AuroraBlob2,
  AuroraContainer,
  Badge,
  BadgeSparklesIcon,
  ButtonGroup,
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
  OutlinePlayIcon,
  PrimaryArrowIcon,
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
            <BadgeSparklesIcon />
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
              <PrimaryArrowIcon />
            </PrimaryButton>
            <OutlineButton size="lg" variant="outline">
              <OutlinePlayIcon />
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
