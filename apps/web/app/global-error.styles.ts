import styled from 'styled-components'

export const PageBody = styled.body`
  margin: 0;
  background: var(--background, #ffffff);
  color: var(--foreground, #111827);
  font-family: var(--font-geist, system-ui, sans-serif);
`

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

export const Content = styled.div`
  max-width: 28rem;
  text-align: center;
`

export const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
`

export const Description = styled.p`
  margin: 0 0 1rem;
  color: var(--muted-foreground, #6b7280);
`

export const ErrorId = styled.p`
  margin: 0 0 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--muted-foreground, #6b7280);
`

export const RetryButton = styled.button`
  border: none;
  border-radius: 0.375rem;
  background: var(--primary, #4f46e5);
  padding: 0.5rem 1rem;
  color: var(--primary-foreground, #ffffff);
  cursor: pointer;

  &:hover {
    background: color-mix(in srgb, var(--primary, #4f46e5) 90%, transparent);
  }
`
