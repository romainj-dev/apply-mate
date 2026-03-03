'use client'

import { useEffect } from 'react'
import {
  Content,
  Description,
  ErrorId,
  PageBody,
  PageContainer,
  RetryButton,
  Title,
} from './global-error.styles'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log critical error
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <PageBody>
        <PageContainer>
          <Content>
            <Title>Application Error</Title>
            <Description>
              A critical error occurred. Please refresh the page or contact
              support if the problem persists.
            </Description>
            {error.digest && <ErrorId>Error ID: {error.digest}</ErrorId>}
            <RetryButton onClick={reset}>Try Again</RetryButton>
          </Content>
        </PageContainer>
      </PageBody>
    </html>
  )
}
