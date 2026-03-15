import styled from 'styled-components'

export const Root = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

export const HighlightName = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`
