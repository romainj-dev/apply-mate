'use client'

import Link from 'next/link'

import {
  Card,
  GlowBlob,
  ContentRow,
  IconShrink,
  IconBox,
  ArrowIcon,
  TextContent,
  Heading,
  Body,
  PromptAlertIcon,
  SetupButton,
} from './ProfileSetupPrompt.styles'

export function ProfileSetupPrompt() {
  return (
    <Card variant="accent">
      <GlowBlob />

      <ContentRow>
        <IconShrink>
          <IconBox>
            <PromptAlertIcon />
          </IconBox>
        </IconShrink>

        <TextContent>
          <Heading>Complete Your Profile to Get Started</Heading>
          <Body>
            Before you can start applying to jobs, we need some information to
            help us tailor your resumes and cover letters. Set up your profile
            with your work experience, skills, and preferences.
          </Body>
          <SetupButton asChild size="lg" variant="orange">
            <Link href="/dashboard/my-experience">
              Set Up Profile
              <ArrowIcon />
            </Link>
          </SetupButton>
        </TextContent>
      </ContentRow>
    </Card>
  )
}
