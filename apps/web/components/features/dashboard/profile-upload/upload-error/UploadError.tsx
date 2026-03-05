'use client'

import { ErrorAlertIcon, ErrorBox } from './UploadError.styles'

interface UploadErrorProps {
  error: string | null
}

export function UploadError({ error }: UploadErrorProps) {
  if (!error) return null

  return (
    <ErrorBox>
      <ErrorAlertIcon />
      <span>{error}</span>
    </ErrorBox>
  )
}
