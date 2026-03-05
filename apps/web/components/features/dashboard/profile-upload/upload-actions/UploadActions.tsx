'use client'

import {
  AnalyzeButton,
  AnalyzeLoaderIcon,
  AnalyzeSparklesIcon,
} from './UploadActions.styles'

interface UploadActionsProps {
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

export function UploadActions({
  onClick,
  disabled = false,
  isLoading = false,
}: UploadActionsProps) {
  return (
    <AnalyzeButton onClick={onClick} size="lg" disabled={disabled}>
      {isLoading ? (
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
  )
}
