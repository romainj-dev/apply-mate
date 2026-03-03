'use client'

import type { ReactNode } from 'react'
import {
  BackgroundPattern,
  Content,
  Root,
  SidebarLayer,
  WhiteOverlay,
} from './layout.styles'

interface DashboardLayoutClientProps {
  sidebar: ReactNode
  children: ReactNode
}

export function DashboardLayoutClient({
  sidebar,
  children,
}: DashboardLayoutClientProps) {
  return (
    <Root>
      <BackgroundPattern />
      <WhiteOverlay />
      <SidebarLayer>{sidebar}</SidebarLayer>
      <Content>{children}</Content>
    </Root>
  )
}
