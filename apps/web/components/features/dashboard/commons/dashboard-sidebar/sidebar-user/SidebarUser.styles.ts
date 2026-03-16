import Link from 'next/link'
import styled from 'styled-components'

import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'

interface CollapsibleProps {
  $collapsed?: boolean
}

export const UserSection = styled.div<CollapsibleProps>`
  padding: ${({ theme, $collapsed }) =>
    $collapsed ? `${theme.space.sm} ${theme.space.xs}` : theme.space.md};
`

export const UserProfileLink = styled(Link)`
  display: block;
`

export const UserOuter = styled.div<CollapsibleProps>`
  background: rgb(255 255 255 / 0.4);
  padding: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid rgb(255 255 255 / 0.2);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  backdrop-filter: blur(4px);
`

export const UserInner = styled.div<CollapsibleProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  padding: ${({ theme }) => theme.space.sm};
  padding-inline: ${({ theme, $collapsed }) =>
    $collapsed ? '0' : theme.space.sm};
  justify-content: ${({ $collapsed }) =>
    $collapsed ? 'center' : 'flex-start'};
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
      in srgb,
      ${({ theme }) => theme.colors.primary} 20%,
      transparent
    );
  }
`

export const UserAvatarFallback = styled(AvatarFallback)`
  background: linear-gradient(
    to bottom right,
    rgb(219 234 254),
    rgb(224 231 255)
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
  background: rgb(34 197 94);
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
