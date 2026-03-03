'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Actions,
  Content,
  Description,
  ErrorId,
  PageContainer,
  Title,
} from './error.styles'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
    }
  }, [error])

  return (
    <PageContainer>
      <Content>
        <Title>Something went wrong</Title>
        <Description>
          {error.message || 'An unexpected error occurred. Please try again.'}
        </Description>
        {error.digest && <ErrorId>Error ID: {error.digest}</ErrorId>}
        <Actions>
          <Button onClick={reset}>Try Again</Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/')}
          >
            Go Home
          </Button>
        </Actions>
      </Content>
    </PageContainer>
  )
}
