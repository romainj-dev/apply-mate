import styled from 'styled-components'

import { GlassCard } from '@/components/ui/GlassCard'

interface SidebarCardProps {
  $collapsed: boolean
  $mobileOpen: boolean
}

export const SidebarCard = styled(GlassCard)<SidebarCardProps>`
  position: fixed;
  left: ${({ theme }) => theme.spaceCalc(6)};
  top: ${({ theme }) => theme.spaceCalc(6)};
  bottom: ${({ theme }) => theme.spaceCalc(6)};
  z-index: 300;
  width: ${({ $collapsed }) => ($collapsed ? '4rem' : '16rem')};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  overflow: initial;
  transition:
    width 0.2s ease,
    transform 0.2s ease;

  ${({ theme }) => theme.media.belowTablet} {
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 0;
    border-top-right-radius: ${({ theme }) => theme.radii['3xl']};
    border-bottom-right-radius: ${({ theme }) => theme.radii['3xl']};
    width: 16rem;
    transform: ${({ $mobileOpen }) =>
      $mobileOpen ? 'translateX(0)' : 'translateX(-110%)'};
    z-index: 300;
    background: ${({ theme }) => theme.colors.background};
    backdrop-filter: none;
  }
`

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`

export const ScrollableMiddle = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const DividerRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-block: ${({ theme }) => theme.space.md};
  flex-shrink: 0;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  flex-shrink: 0;
  opacity: 0.5;
  background: linear-gradient(
    to right,
    transparent,
    ${({ theme }) => theme.colors.border},
    transparent
  );
`

export const CollapseToggle = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 1.75rem;
  height: 1.75rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgb(255 255 255 / 0.6);
  color: ${({ theme }) => theme.colors.mutedForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease;
  z-index: 100;
  flex-shrink: 0;

  &:hover {
    background: rgb(255 255 255 / 0.9);
    color: ${({ theme }) => theme.colors.foreground};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  ${({ theme }) => theme.media.belowTablet} {
    display: none;
  }
`

export const Backdrop = styled.div`
  display: none;

  ${({ theme }) => theme.media.belowTablet} {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 250;
    background: rgb(0 0 0 / 0.4);
    backdrop-filter: blur(2px);
  }
`
