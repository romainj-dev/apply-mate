'use client'

import type React from 'react'

import { useState } from 'react'
import {
  AnalyzeButton,
  AnalyzeLoaderIcon,
  AnalyzeSparklesIcon,
  BlobBottomRight,
  BlobTopLeft,
  Column,
  DefaultStateContent,
  Divider,
  DropHint,
  DropTitle,
  ErrorAlertIcon,
  ErrorBox,
  ExternalLinkIcon,
  FastestBadge,
  GhostLinkButton,
  HeaderSparklesIcon,
  HeaderIconBox,
  HeaderInner,
  HeaderTextGroup,
  HiddenInput,
  MainGrid,
  NextStepBody,
  NextStepCard,
  NextStepIconBox,
  NextStepLabel,
  NextStepText,
  NextStepSparklesIcon,
  OrBadge,
  SelectFileTextIcon,
  SelectFileSpan,
  SelectFilePt,
  StepHint,
  StepIntro,
  StepNumBadgeMuted,
  StepNumBadgePrimary,
  StepNumRow,
  StepTitle,
  StepTitleMuted,
  SuccessCheckIcon,
  SuccessIconBox,
  TipDownloadIcon,
  TipBody,
  TipCard,
  TipLinkedinIcon,
  TipIconBox,
  TipPrimaryStrong,
  TipStrong,
  TipStrongItalic,
  TipInner,
  TipText,
  TipTitle,
  TipTitleRow,
  UploadCard,
  UploadContent,
  UploadDescription,
  UploadHeader,
  UploadFileIcon,
  UploadIconBox,
  UploadLabel,
  UploadTitle,
  UploadedFileName,
  UploadedStateContent,
} from './profile-upload.styles'

const MAX_FILE_SIZE = 10 // 10MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileError(`File is too large. Max size is ${MAX_FILE_SIZE}MB.`)
        setUploadedFile(null)
        setUploadMethod(null)
        return
      }

      setFileError(null)
      setUploadedFile(file)
      setUploadMethod('file')
    }
  }

  const handleResumeUpload = async () => {
    if (!uploadedFile) {
      return
    }

    if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File is too large. Max size is ${MAX_FILE_SIZE}MB.`)
      return
    }

    if (onResumeUpload) {
      try {
        await onResumeUpload(uploadedFile)
      } catch (error) {
        console.error('Resume upload error:', error)
      }
    } else if (onSubmit) {
      // Fallback to old onSubmit behavior for backwards compatibility
      onSubmit()
    }
  }

  return (
    <UploadCard interactive={false}>
      {/* Decorative background elements */}
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
          {/* Vertical Divider with OR Badge */}
          <Divider>
            <OrBadge>OR</OrBadge>
          </Divider>

          {/* Left Column: File Upload (Primary Path) */}
          <Column>
            <StepIntro>
              <StepNumRow>
                <StepNumBadgePrimary>1</StepNumBadgePrimary>
                <StepTitle>I have a resume file</StepTitle>
              </StepNumRow>
              <StepHint>PDF or TXT file | Max size: {MAX_FILE_SIZE}MB</StepHint>
            </StepIntro>

            <UploadLabel htmlFor="resume-upload" $hasFile={!!uploadedFile}>
              <HiddenInput
                id="resume-upload"
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileUpload}
                disabled={isResumeUploading}
              />
              {uploadedFile ? (
                <UploadedStateContent>
                  <SuccessIconBox>
                    <SuccessCheckIcon />
                  </SuccessIconBox>
                  <div>
                    <UploadedFileName>{uploadedFile.name}</UploadedFileName>
                    <DropHint>File verified. Click to change.</DropHint>
                  </div>
                </UploadedStateContent>
              ) : (
                <DefaultStateContent>
                  <UploadIconBox>
                    <UploadFileIcon />
                  </UploadIconBox>
                  <div>
                    <DropTitle>Drop your resume here</DropTitle>
                    <DropHint>or click to browse your computer</DropHint>
                  </div>
                  <SelectFilePt>
                    <SelectFileSpan>
                      <SelectFileTextIcon />
                      Select File
                    </SelectFileSpan>
                  </SelectFilePt>
                </DefaultStateContent>
              )}
            </UploadLabel>

            {(resumeError || fileError) && (
              <ErrorBox>
                <ErrorAlertIcon />
                <span>{resumeError || fileError}</span>
              </ErrorBox>
            )}

            {uploadMethod === 'file' && (
              <AnalyzeButton
                onClick={handleResumeUpload}
                size="lg"
                disabled={isResumeUploading || !uploadedFile || !!fileError}
              >
                {isResumeUploading ? (
                  <>
                    <AnalyzeLoaderIcon />
                    Analyzing Experience...
                  </>
                ) : (
                  <>
                    <AnalyzeSparklesIcon />
                    Analyze my Experience
                  </>
                )}
              </AnalyzeButton>
            )}
          </Column>

          {/* Right Column: Quick Import Guide (Supportive Path) */}
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
              {/* LinkedIn Tip */}
              <TipCard>
                <TipInner>
                  <TipIconBox $brand="linkedin">
                    <TipLinkedinIcon />
                  </TipIconBox>
                  <TipBody>
                    <TipTitleRow>
                      <TipTitle>
                        Get LinkedIn PDF
                        <FastestBadge>Fastest</FastestBadge>
                      </TipTitle>
                      <GhostLinkButton variant="ghost" size="sm" asChild>
                        <a
                          href="https://www.linkedin.com/feed/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to LinkedIn <ExternalLinkIcon />
                        </a>
                      </GhostLinkButton>
                    </TipTitleRow>
                    <TipText>
                      Log in &gt; Your{' '}
                      <TipStrongItalic>Profile</TipStrongItalic> &gt;{' '}
                      <TipStrong>More / Resources</TipStrong> &gt; Select{' '}
                      <TipPrimaryStrong>Save to PDF</TipPrimaryStrong>.
                    </TipText>
                  </TipBody>
                </TipInner>
              </TipCard>

              {/* Indeed Tip */}
              <TipCard>
                <TipInner>
                  <TipIconBox $brand="indeed">
                    <TipDownloadIcon />
                  </TipIconBox>
                  <TipBody>
                    <TipTitleRow>
                      <TipTitle>Indeed Resume</TipTitle>
                      <GhostLinkButton variant="ghost" size="sm" asChild>
                        <a
                          href="https://www.indeed.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to Indeed <ExternalLinkIcon />
                        </a>
                      </GhostLinkButton>
                    </TipTitleRow>
                    <TipText>
                      Log in &gt; Your{' '}
                      <TipStrongItalic>Profile</TipStrongItalic> &gt; Find{' '}
                      <TipPrimaryStrong>Download Resume</TipPrimaryStrong>.
                    </TipText>
                  </TipBody>
                </TipInner>
              </TipCard>
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
