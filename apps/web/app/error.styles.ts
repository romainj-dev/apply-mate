import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.md};
`

export const Content = styled.div`
  max-width: 28rem;
  text-align: center;
`

export const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  line-height: ${({ theme }) => theme.typography.lineHeight['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const Description = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const ErrorId = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
`
