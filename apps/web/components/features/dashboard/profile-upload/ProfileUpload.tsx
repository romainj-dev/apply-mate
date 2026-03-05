'use client'

import { useState } from 'react'

import { ResumeTipCard } from './resume-tip-card/ResumeTipCard'
import { UploadActions } from './upload-actions/UploadActions'
import { UploadDropzone } from './upload-dropzone/UploadDropzone'
import { UploadError } from './upload-error/UploadError'
import {
  BlobBottomRight,
  BlobTopLeft,
  Column,
  Divider,
  FastestBadge,
  HeaderIconBox,
  HeaderInner,
  HeaderSparklesIcon,
  HeaderTextGroup,
  MainGrid,
  NextStepBody,
  NextStepCard,
  NextStepIconBox,
  NextStepLabel,
  NextStepSparklesIcon,
  NextStepText,
  OrBadge,
  StepHint,
  StepIntro,
  StepNumBadgeMuted,
  StepNumRow,
  StepTitleMuted,
  TipDownloadIcon,
  TipLinkedinIcon,
  TipPrimaryStrong,
  TipStrong,
  TipStrongItalic,
  UploadCard,
  UploadContent,
  UploadDescription,
  UploadHeader,
  UploadTitle,
} from './ProfileUpload.styles'

interface ProfileUploadProps {
  onSubmit?: () => void
  onResumeUpload?: (file: File) => Promise<void>
  isResumeUploading?: boolean
  resumeError?: string | null
}

export function ProfileUpload({
  onSubmit,
  onResumeUpload,
  isResumeUploading = false,
  resumeError,
}: ProfileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadMethod, setUploadMethod] = useState<'file' | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  const handleFileChange = (file: File | null, error: string | null) => {
    setFileError(error)
    setUploadedFile(file)
    setUploadMethod(file ? 'file' : null)
  }

  const handleResumeUpload = async () => {
    if (!uploadedFile) return

    if (uploadedFile.size > 10 * 1024 * 1024) {
      setFileError('File is too large. Max size is 10MB.')
      return
    }

    if (onResumeUpload) {
      try {
        await onResumeUpload(uploadedFile)
      } catch (error) {
        console.error('Resume upload error:', error)
      }
    } else if (onSubmit) {
      onSubmit()
    }
  }

  const displayError = resumeError || fileError

  return (
    <UploadCard interactive={false}>
      <BlobBottomRight />
      <BlobTopLeft />

      <UploadHeader>
        <HeaderInner>
          <HeaderIconBox>
            <HeaderSparklesIcon />
          </HeaderIconBox>
          <HeaderTextGroup>
            <UploadTitle>
              Recommended: Share your experience up-to-date
            </UploadTitle>
            <UploadDescription>
              This is a necessary step to help ApplyMate tailor your resume and
              cover letter to each job description accurately.
            </UploadDescription>
          </HeaderTextGroup>
        </HeaderInner>
      </UploadHeader>

      <UploadContent>
        <MainGrid>
          <Divider>
            <OrBadge>OR</OrBadge>
          </Divider>

          <Column>
            <UploadDropzone
              file={uploadedFile}
              onFileChange={handleFileChange}
              disabled={isResumeUploading}
            />

            <UploadError error={displayError} />

            {uploadMethod === 'file' && (
              <UploadActions
                onClick={handleResumeUpload}
                disabled={isResumeUploading || !uploadedFile || !!fileError}
                isLoading={isResumeUploading}
              />
            )}
          </Column>

          <Column>
            <StepIntro>
              <StepNumRow>
                <StepNumBadgeMuted>2</StepNumBadgeMuted>
                <StepTitleMuted>I don&apos;t have a file yet</StepTitleMuted>
              </StepNumRow>
              <StepHint>
                No problem! We can help you get one in 30 seconds.
              </StepHint>
            </StepIntro>

            <Column>
              <ResumeTipCard
                brand="linkedin"
                icon={<TipLinkedinIcon />}
                title={
                  <>
                    Get LinkedIn PDF
                    <FastestBadge>Fastest</FastestBadge>
                  </>
                }
                linkHref="https://www.linkedin.com/feed/"
                linkLabel="Go to LinkedIn"
                instruction={
                  <>
                    Log in &gt; Your <TipStrongItalic>Profile</TipStrongItalic>{' '}
                    &gt; <TipStrong>More / Resources</TipStrong> &gt; Select{' '}
                    <TipPrimaryStrong>Save to PDF</TipPrimaryStrong>.
                  </>
                }
              />
              <ResumeTipCard
                brand="indeed"
                icon={<TipDownloadIcon />}
                title="Indeed Resume"
                linkHref="https://www.indeed.com/"
                linkLabel="Go to Indeed"
                instruction={
                  <>
                    Log in &gt; Your <TipStrongItalic>Profile</TipStrongItalic>{' '}
                    &gt; Find{' '}
                    <TipPrimaryStrong>Download Resume</TipPrimaryStrong>.
                  </>
                }
              />
            </Column>

            <NextStepCard>
              <NextStepIconBox>
                <NextStepSparklesIcon />
              </NextStepIconBox>
              <NextStepBody>
                <NextStepLabel>Next Step</NextStepLabel>
                <NextStepText>
                  &ldquo;Once you have that PDF, just drag it into the box on
                  the left and we&apos;ll handle the rest!&rdquo;
                </NextStepText>
              </NextStepBody>
            </NextStepCard>
          </Column>
        </MainGrid>
      </UploadContent>
    </UploadCard>
  )
}
