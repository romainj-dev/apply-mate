import Link from 'next/link'
import styled, { keyframes } from 'styled-components'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/ui/glass-card'

interface NavLinkProps {
  $isActive: boolean
}

const pulse = keyframes`
  50% {
    opacity: 0.5;
  }
`

export const SidebarCard = styled(GlassCard)`
  position: fixed;
  left: ${({ theme }) => theme.spaceCalc(6)};
  top: ${({ theme }) => theme.spaceCalc(6)};
  bottom: ${({ theme }) => theme.spaceCalc(6)};
  z-index: 50;
  width: 16rem;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
`

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
`

export const BrandSection = styled.div`
  padding: ${({ theme }) => theme.spaceCalc(6)};
  padding-bottom: ${({ theme }) => theme.space.sm};
`

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  padding-inline: ${({ theme }) => theme.space.sm};
`

export const BrandIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 10px 15px -3px
      color-mix(
        in oklch,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      ),
    0 4px 6px -4px
      color-mix(
        in oklch,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      );
`

export const BrandIconText = styled.span`
  color: rgb(255 255 255);
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`

export const BrandTitle = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 1;
  letter-spacing: -0.025em;
`

export const BrandSubtitle = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin-block: ${({ theme }) => theme.space.md};
  opacity: 0.5;
  background: linear-gradient(
    to right,
    transparent,
    ${({ theme }) => theme.colors.border},
    transparent
  );
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
    in oklch,
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
      ? `color-mix(in oklch, ${theme.colors.primary} 10%, transparent)`
      : 'transparent'};
  box-shadow: ${({ theme, $isActive }) =>
    $isActive ? theme.shadows.sm : 'none'};

  &:hover {
    background: ${({ theme, $isActive }) =>
      $isActive
        ? `color-mix(in oklch, ${theme.colors.primary} 15%, transparent)`
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
      : `color-mix(in oklch, ${theme.colors.mutedForeground} 70%, transparent)`};
  transition:
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
    color 300ms cubic-bezier(0.4, 0, 0.2, 1);

  ${NavLinkItem}:hover & {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.primary};
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
    in oklch,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export const UserSection = styled.div`
  margin-top: auto;
  padding: ${({ theme }) => theme.space.md};
`

export const UserProfileLink = styled(Link)`
  display: block;
`

export const UserOuter = styled.div`
  background: rgb(255 255 255 / 0.4);
  padding: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid rgb(255 255 255 / 0.2);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  backdrop-filter: blur(4px);
`

export const UserInner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  padding: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radii.xl};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    background: rgb(255 255 255 / 0.5);
  }
`

export const AvatarWrapper = styled.div`
  position: relative;
`

export const UserAvatar = styled(Avatar)`
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid rgb(255 255 255);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  ${UserInner}:hover & {
    border-color: color-mix(
      in oklch,
      ${({ theme }) => theme.colors.primary} 20%,
      transparent
    );
  }
`

export const UserAvatarFallback = styled(AvatarFallback)`
  background: linear-gradient(
    to bottom right,
    /* blue-100 */ rgb(219 234 254),
    /* indigo-100 */ rgb(224 231 255)
  );
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const UserStatus = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgb(34 197 94); /* green-500 — online status indicator */
  border: 2px solid rgb(255 255 255);
`

export const UserTextBlock = styled.div`
  flex: 1;
  min-width: 0;
`

export const UserName = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  ${UserInner}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const UserMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
`

export const PlanBadge = styled(Badge)`
  padding-inline: ${({ theme }) => theme.spaceCalc(1.5)};
  padding-block: ${({ theme }) => theme.space.none};
  height: 1.25rem;
  font-size: 10px;
  background: rgb(255 255 255 / 0.5);
  color: ${({ theme }) => theme.colors.mutedForeground};
  border: 0;
`
