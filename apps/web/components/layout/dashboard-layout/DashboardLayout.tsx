'use client'

import type { ReactNode } from 'react'
import { BackgroundPattern } from '@/components/commons/background-pattern/BackgroundPattern'
import {
  Content,
  Root,
  SidebarLayer,
  WhiteOverlay,
} from './DashboardLayout.styles'

interface DashboardLayoutProps {
  sidebar: ReactNode
  children: ReactNode
}

export function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  return (
    <Root>
      <BackgroundPattern position="fixed" zIndex={0} />
      <WhiteOverlay />
      <SidebarLayer>{sidebar}</SidebarLayer>
      <Content>{children}</Content>
    </Root>
  )
}
