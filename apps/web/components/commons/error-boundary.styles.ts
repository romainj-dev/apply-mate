import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.md};
`

export const Content = styled.div`
  display: flex;
  max-width: 28rem;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  text-align: center;
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  line-height: ${({ theme }) => theme.typography.lineHeight['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
`
