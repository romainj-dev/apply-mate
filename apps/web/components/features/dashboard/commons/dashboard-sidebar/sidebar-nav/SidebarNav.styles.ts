import Link from 'next/link'
import styled, { keyframes } from 'styled-components'

interface NavLinkProps {
  $isActive: boolean
}

const pulse = keyframes`
  50% {
    opacity: 0.5;
  }
`

export const Nav = styled.nav`
  flex: 1;
  padding-inline: ${({ theme }) => theme.space.md};
  padding-block: ${({ theme }) => theme.space.sm};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const NavLabel = styled.div`
  padding-inline: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.mutedForeground} 50%,
    transparent
  );
`

export const NavLinkItem = styled(Link)<NavLinkProps>`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  padding: ${({ theme }) => theme.spaceCalc(3)};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.mutedForeground};
  background: ${({ theme, $isActive }) =>
    $isActive
      ? `color-mix(in srgb, ${theme.colors.primary} 10%, transparent)`
      : 'transparent'};
  box-shadow: ${({ theme, $isActive }) =>
    $isActive ? theme.shadows.sm : 'none'};

  &:hover {
    background: ${({ theme, $isActive }) =>
      $isActive
        ? `color-mix(in srgb, ${theme.colors.primary} 15%, transparent)`
        : 'rgb(255 255 255 / 0.5)'};
    color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : theme.colors.foreground};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`

export const ActiveIndicator = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0.25rem;
  height: 2rem;
  border-top-right-radius: ${({ theme }) => theme.radii.full};
  border-bottom-right-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary};
`

export const NavIcon = styled.span<NavLinkProps>`
  position: relative;
  z-index: 10;
  display: flex;
  color: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.primary
      : `color-mix(in srgb, ${theme.colors.mutedForeground} 70%, transparent)`};
  transition:
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
    color 300ms cubic-bezier(0.4, 0, 0.2, 1);

  ${NavLinkItem}:hover & {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

export const NavText = styled.span`
  position: relative;
  z-index: 10;
`

export const ActivePulseOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`
