'use client'

import type { ReactNode } from 'react'
import { BackgroundPattern } from '@/components/commons/background-pattern/BackgroundPattern'
import { MobileHeader } from '@/components/features/dashboard/commons/mobile-header/MobileHeader'
import {
  DashboardLayoutProvider,
  useDashboardLayout,
} from './DashboardLayoutContext'
import {
  Content,
  ContentInner,
  Root,
  SidebarLayer,
  WhiteOverlay,
} from './DashboardLayout.styles'

export { useDashboardLayout } from './DashboardLayoutContext'
export type { PageSection } from './DashboardLayoutContext'

interface DashboardLayoutProps {
  sidebar: ReactNode
  children: ReactNode
}

function DashboardLayoutInner({ sidebar, children }: DashboardLayoutProps) {
  const { collapsed } = useDashboardLayout()

  return (
    <Root $collapsed={collapsed}>
      <BackgroundPattern position="fixed" zIndex={0} />
      <WhiteOverlay />
      <SidebarLayer>{sidebar}</SidebarLayer>
      <Content>
        <MobileHeader />
        <ContentInner>{children}</ContentInner>
      </Content>
    </Root>
  )
}

export function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  return (
    <DashboardLayoutProvider>
      <DashboardLayoutInner sidebar={sidebar}>{children}</DashboardLayoutInner>
    </DashboardLayoutProvider>
  )
}
