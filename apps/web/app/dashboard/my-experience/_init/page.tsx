'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { DashboardHeader } from '@/components/features/dashboard/commons/header'
import { ProfileUpload } from '@/components/features/dashboard/profile-upload/ProfileUpload'
import {
  type Step,
  ProgressSteps,
} from '@/components/features/my-experience/progress-steps'
import { uploadResume } from './_actions/upload-resume'
import {
  ActiveItem,
  Checklist,
  CompletedIcon,
  CompletedItem,
  HeadingBlock,
  IconCircle,
  InputSection,
  PageContainer,
  ProcessingCard,
  ProcessingContainer,
  ProcessingContent,
  ProcessingText,
  ProcessingTitle,
  SpinningLargeLoader,
  SpinningSmallLoader,
} from './page.styles'

export default function InitExperiencePage() {
  const [step, setStep] = useState<Step>('input')
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [isResumePending, startResumeTransition] = useTransition()
  const router = useRouter()

  const handleResumeUpload = async (file: File) => {
    setResumeError(null)
    setStep('processing')

    startResumeTransition(async () => {
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadResume(formData)

      if (result.success) {
        router.refresh()
      } else {
        setResumeError(result.error ?? 'Failed to upload resume')
        setStep('input')
      }
    })
  }

  return (
    <PageContainer>
      <DashboardHeader
        title="Share your experience"
        subtitle="No tedious forms. Just share your experience however you'd like."
      />

      <ProgressSteps step={step} />

      {step === 'input' && (
        <InputSection>
          <ProfileUpload
            onResumeUpload={handleResumeUpload}
            isResumeUploading={isResumePending}
            resumeError={resumeError}
          />
        </InputSection>
      )}

      {step === 'processing' && (
        <ProcessingContainer>
          <ProcessingCard>
            <ProcessingContent>
              <IconCircle>
                <SpinningLargeLoader />
              </IconCircle>
              <HeadingBlock>
                <ProcessingTitle>Processing Your Profile</ProcessingTitle>
                <ProcessingText>
                  Structuring your experience, highlighting achievements, and
                  optimizing for ATS systems...
                </ProcessingText>
              </HeadingBlock>
              <Checklist>
                <CompletedItem>
                  <CompletedIcon />
                  <span>Extracted key information</span>
                </CompletedItem>
                <CompletedItem>
                  <CompletedIcon />
                  <span>Identified skills and achievements</span>
                </CompletedItem>
                <ActiveItem>
                  <SpinningSmallLoader />
                  <span>Optimizing for job applications</span>
                </ActiveItem>
              </Checklist>
            </ProcessingContent>
          </ProcessingCard>
        </ProcessingContainer>
      )}
    </PageContainer>
  )
}
