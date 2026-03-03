'use client'

import Link from 'next/link'

import { AlertCircle } from 'lucide-react'

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
  SetupButton,
} from './profile-setup-prompt.styles'

export function ProfileSetupPrompt() {
  return (
    <Card variant="accent">
      <GlowBlob />

      <ContentRow>
        <IconShrink>
          <IconBox>
            <AlertCircle size={24} color="rgb(234 88 12)" />
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
