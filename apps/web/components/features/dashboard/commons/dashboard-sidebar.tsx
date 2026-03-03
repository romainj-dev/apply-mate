'use client'

import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Settings,
  BarChart3,
  Rocket,
  List,
} from 'lucide-react'
import { AvatarImage } from '@/components/ui/avatar'
import {
  ActiveIndicator,
  ActivePulseOverlay,
  AvatarWrapper,
  BrandIcon,
  BrandIconText,
  BrandLink,
  BrandSection,
  BrandSubtitle,
  BrandText,
  BrandTitle,
  Divider,
  Nav,
  NavIcon,
  NavLabel,
  NavLinkItem,
  NavText,
  PlanBadge,
  Sidebar,
  SidebarCard,
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
} from './dashboard-sidebar.styles'

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Experience',
    href: '/dashboard/my-experience',
    icon: List,
  },
  {
    label: 'My Goal',
    href: '/dashboard/my-goal',
    icon: Rocket,
  },
  {
    label: 'Statistics',
    href: '/dashboard/statistics',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <SidebarCard asChild size="none">
      <Sidebar>
        {/* Brand Section */}
        <BrandSection>
          <BrandLink href="/">
            <BrandIcon>
              <BrandIconText>A</BrandIconText>
            </BrandIcon>
            <BrandText>
              <BrandTitle>ApplyMate</BrandTitle>
              <BrandSubtitle>Workspace</BrandSubtitle>
            </BrandText>
          </BrandLink>
        </BrandSection>

        <Divider />

        {/* Navigation */}
        <Nav>
          <NavLabel>Menu</NavLabel>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <NavLinkItem
                key={item.href}
                href={item.href}
                $isActive={isActive}
              >
                {isActive && <ActiveIndicator />}
                <NavIcon $isActive={isActive}>
                  <Icon size={20} />
                </NavIcon>
                <NavText>{item.label}</NavText>
                {isActive && <ActivePulseOverlay />}
              </NavLinkItem>
            )
          })}
        </Nav>

        {/* User Section */}
        <UserSection>
          <UserProfileLink href="/dashboard/profile">
            <UserOuter>
              <UserInner>
                <AvatarWrapper>
                  <UserAvatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="User"
                    />
                    <UserAvatarFallback>JD</UserAvatarFallback>
                  </UserAvatar>
                  <UserStatus />
                </AvatarWrapper>

                <UserTextBlock>
                  <UserName>John Doe</UserName>
                  <UserMeta>
                    <PlanBadge variant="secondary">Free plan</PlanBadge>
                  </UserMeta>
                </UserTextBlock>
              </UserInner>
            </UserOuter>
          </UserProfileLink>
        </UserSection>
      </Sidebar>
    </SidebarCard>
  )
}
