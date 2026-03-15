'use client'

import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, Rocket, List } from 'lucide-react'

import {
  ActiveIndicator,
  ActivePulseOverlay,
  Nav,
  NavIcon,
  NavLabel,
  NavLinkItem,
  NavText,
} from './SidebarNav.styles'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', Icon: LayoutDashboard },
  { label: 'Context', href: '/dashboard/my-experience', Icon: List },
  { label: 'My Goal', href: '/dashboard/my-goal', Icon: Rocket },
  { label: 'Settings', href: '/dashboard/settings', Icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Nav>
      <NavLabel>Menu</NavLabel>
      {navItems.map(({ Icon, href, label }) => {
        const isActive = pathname === href
        return (
          <NavLinkItem key={href} href={href} $isActive={isActive}>
            {isActive && <ActiveIndicator />}
            <NavIcon $isActive={isActive}>
              <Icon />
            </NavIcon>
            <NavText>{label}</NavText>
            {isActive && <ActivePulseOverlay />}
          </NavLinkItem>
        )
      })}
    </Nav>
  )
}
