'use client'

import { AvatarImage } from '@/components/ui/Avatar'

import {
  AvatarWrapper,
  PlanBadge,
  UserAvatar,
  UserAvatarFallback,
  UserInner,
  UserMeta,
  UserName,
  UserOuter,
  UserProfileLink,
  UserSection,
  UserStatus,
  UserTextBlock,
} from './SidebarUser.styles'

interface SidebarUserProps {
  userName?: string
  userImageSrc?: string
  planLabel?: string
  collapsed?: boolean
}

export function SidebarUser({
  userName = 'John Doe',
  userImageSrc = '/placeholder.svg?height=40&width=40',
  planLabel = 'Free plan',
  collapsed = false,
}: SidebarUserProps) {
  return (
    <UserSection $collapsed={collapsed}>
      <UserProfileLink href="/dashboard/profile">
        <UserOuter $collapsed={collapsed}>
          <UserInner $collapsed={collapsed}>
            <AvatarWrapper>
              <UserAvatar>
                <AvatarImage src={userImageSrc} alt="User" />
                <UserAvatarFallback>JD</UserAvatarFallback>
              </UserAvatar>
              <UserStatus />
            </AvatarWrapper>

            {!collapsed && (
              <UserTextBlock>
                <UserName>{userName}</UserName>
                <UserMeta>
                  <PlanBadge variant="secondary">{planLabel}</PlanBadge>
                </UserMeta>
              </UserTextBlock>
            )}
          </UserInner>
        </UserOuter>
      </UserProfileLink>
    </UserSection>
  )
}
