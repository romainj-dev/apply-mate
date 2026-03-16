import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  z-index: 10;
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 0;
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  max-width: 42rem;
`
