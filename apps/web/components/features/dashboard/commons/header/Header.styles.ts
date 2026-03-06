import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

export const Inner = styled.div`
  position: relative;
  z-index: 10;
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  max-width: 42rem;
`
