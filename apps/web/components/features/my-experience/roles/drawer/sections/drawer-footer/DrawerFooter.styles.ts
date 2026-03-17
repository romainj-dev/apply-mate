import styled from 'styled-components'

export const Footer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  shrink: 0;
`

export const SaveButton = styled.div`
  flex: 1;
`
