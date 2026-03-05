'use client'

import type React from 'react'

import {
  DefaultStateContent,
  DropHint,
  DropTitle,
  HiddenInput,
  SelectFilePt,
  SelectFileSpan,
  SelectFileTextIcon,
  StepHint,
  StepIntro,
  StepNumBadgePrimary,
  StepNumRow,
  StepTitle,
  SuccessCheckIcon,
  SuccessIconBox,
  UploadedFileName,
  UploadedStateContent,
  UploadFileIcon,
  UploadIconBox,
  UploadLabel,
} from './UploadDropzone.styles'

const MAX_FILE_SIZE = 10 // 10MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024

interface UploadDropzoneProps {
  file: File | null
  onFileChange: (file: File | null, error: string | null) => void
  disabled?: boolean
}

export function UploadDropzone({
  file,
  onFileChange,
  disabled = false,
}: UploadDropzoneProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        onFileChange(null, `File is too large. Max size is ${MAX_FILE_SIZE}MB.`)
        return
      }
      onFileChange(selectedFile, null)
    }
  }

  return (
    <>
      <StepIntro>
        <StepNumRow>
          <StepNumBadgePrimary>1</StepNumBadgePrimary>
          <StepTitle>I have a resume file</StepTitle>
        </StepNumRow>
        <StepHint>PDF or TXT file | Max size: {MAX_FILE_SIZE}MB</StepHint>
      </StepIntro>

      <UploadLabel htmlFor="resume-upload" $hasFile={!!file}>
        <HiddenInput
          id="resume-upload"
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileUpload}
          disabled={disabled}
        />
        {file ? (
          <UploadedStateContent>
            <SuccessIconBox>
              <SuccessCheckIcon />
            </SuccessIconBox>
            <div>
              <UploadedFileName>{file.name}</UploadedFileName>
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
    </>
  )
}
