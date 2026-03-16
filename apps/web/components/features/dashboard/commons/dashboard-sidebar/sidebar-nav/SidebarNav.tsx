'use client'

import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, Rocket, List } from 'lucide-react'
import { useDashboardLayout } from '@/components/layout/dashboard-layout/DashboardLayout'
import {
  ActiveIndicator,
  ActivePulseOverlay,
  Nav,
  NavIcon,
  NavLinkItem,
  NavText,
} from './SidebarNav.styles'

interface SidebarNavProps {
  collapsed?: boolean
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', Icon: LayoutDashboard },
  { label: 'Context', href: '/dashboard/my-experience', Icon: List },
  { label: 'My Goal', href: '/dashboard/my-goal', Icon: Rocket },
  { label: 'Settings', href: '/dashboard/settings', Icon: Settings },
]

export function SidebarNav({ collapsed = false }: SidebarNavProps) {
  const pathname = usePathname()
  const { onCloseMobile } = useDashboardLayout()

  return (
    <Nav $collapsed={collapsed}>
      {navItems.map(({ Icon, href, label }) => {
        const isActive = pathname === href
        return (
          <NavLinkItem
            key={href}
            href={href}
            $isActive={isActive}
            $collapsed={collapsed}
            title={collapsed ? label : undefined}
            onClick={onCloseMobile}
          >
            {isActive && <ActiveIndicator />}
            <NavIcon $isActive={isActive}>
              <Icon />
            </NavIcon>
            {!collapsed && <NavText>{label}</NavText>}
            {isActive && <ActivePulseOverlay />}
          </NavLinkItem>
        )
      })}
    </Nav>
  )
}
