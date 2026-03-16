'use client'

import { PanelLeft, PanelLeftClose } from 'lucide-react'
import { useDashboardLayout } from '@/components/layout/dashboard-layout/DashboardLayout'
import {
  Backdrop,
  CollapseToggle,
  Divider,
  DividerRow,
  ScrollableMiddle,
  Sidebar,
  SidebarCard,
} from './DashboardSidebar.styles'
import { SidebarBrand } from './sidebar-brand/SidebarBrand'
import { SidebarNav } from './sidebar-nav/SidebarNav'
import { SidebarOnThisPage } from './sidebar-on-this-page/SidebarOnThisPage'
import { SidebarUser } from './sidebar-user/SidebarUser'

export function DashboardSidebar() {
  const { collapsed, mobileOpen, onToggleCollapse, onCloseMobile } =
    useDashboardLayout()

  return (
    <>
      {mobileOpen && <Backdrop onClick={onCloseMobile} />}
      <SidebarCard size="none" $collapsed={collapsed} $mobileOpen={mobileOpen}>
        <Sidebar>
          <SidebarBrand collapsed={collapsed} />
          <DividerRow>
            <Divider />
            <CollapseToggle
              onClick={onToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <PanelLeft /> : <PanelLeftClose />}
            </CollapseToggle>
          </DividerRow>
          <ScrollableMiddle>
            <SidebarNav collapsed={collapsed} />
            <SidebarOnThisPage collapsed={collapsed} />
          </ScrollableMiddle>
          <SidebarUser collapsed={collapsed} />
        </Sidebar>
      </SidebarCard>
    </>
  )
}
