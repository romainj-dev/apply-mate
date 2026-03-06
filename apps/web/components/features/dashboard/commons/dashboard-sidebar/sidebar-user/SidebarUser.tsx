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
}

export function SidebarUser({
  userName = 'John Doe',
  userImageSrc = '/placeholder.svg?height=40&width=40',
  planLabel = 'Free plan',
}: SidebarUserProps) {
  return (
    <UserSection>
      <UserProfileLink href="/dashboard/profile">
        <UserOuter>
          <UserInner>
            <AvatarWrapper>
              <UserAvatar>
                <AvatarImage src={userImageSrc} alt="User" />
                <UserAvatarFallback>JD</UserAvatarFallback>
              </UserAvatar>
              <UserStatus />
            </AvatarWrapper>

            <UserTextBlock>
              <UserName>{userName}</UserName>
              <UserMeta>
                <PlanBadge variant="secondary">{planLabel}</PlanBadge>
              </UserMeta>
            </UserTextBlock>
          </UserInner>
        </UserOuter>
      </UserProfileLink>
    </UserSection>
  )
}
