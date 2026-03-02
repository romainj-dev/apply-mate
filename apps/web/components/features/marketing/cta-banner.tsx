'use client'

import { ArrowRight } from 'lucide-react'
import {
  Section,
  Container,
  BannerWrapper,
  Banner,
  Heading,
  SubText,
  ButtonRow,
  PrimaryButton,
  OutlineButton,
} from './cta-banner.styles'

export function CTABanner() {
  return (
    <Section>
      <Container>
        <BannerWrapper>
          <Banner>
            <Heading>Ready to transform your job search?</Heading>
            <SubText>
              Join thousands of job seekers who are landing more interviews with
              AI-powered applications. Start for free today, no credit card
              required.
            </SubText>
            <ButtonRow>
              <PrimaryButton size="lg">
                Start for free
                <ArrowRight size={16} />
              </PrimaryButton>
              <OutlineButton size="lg" variant="outline">
                Schedule a demo
              </OutlineButton>
            </ButtonRow>
          </Banner>
        </BannerWrapper>
      </Container>
    </Section>
  )
}
