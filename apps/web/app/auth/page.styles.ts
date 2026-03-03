import Link from 'next/link'
import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  max-width: 28rem;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

export const Header = styled.div`
  text-align: center;
`

export const BrandLink = styled(Link)`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight['2xl']};
`

export const Footer = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

export const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.mutedForeground};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`
