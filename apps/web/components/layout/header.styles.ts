import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import styled from 'styled-components'

export const HeaderRoot = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
  border: 1px solid rgb(255 255 255 / 0.1);
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.background} 60%,
    transparent
  );
  box-shadow: ${({ theme }) => theme.shadows.xl};
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
`

export const Container = styled.div`
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.space.md};
`

export const Content = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
`

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const BrandIcon = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.accent};
`

export const BrandSparkles = styled(Sparkles)`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.accentForeground};
`

export const BrandName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xl};

  ${({ theme }) => theme.media.belowMobile} {
    display: none;
  }
`

export const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`
