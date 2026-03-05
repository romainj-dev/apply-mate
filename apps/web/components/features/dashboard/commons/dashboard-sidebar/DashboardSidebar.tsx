'use client'

import { Divider, Sidebar, SidebarCard } from './DashboardSidebar.styles'
import { SidebarBrand } from './sidebar-brand/SidebarBrand'
import { SidebarNav } from './sidebar-nav/SidebarNav'
import { SidebarUser } from './sidebar-user/SidebarUser'

export function DashboardSidebar() {
  return (
    <SidebarCard asChild size="none">
      <Sidebar>
        <SidebarBrand />
        <Divider />
        <SidebarNav />
        <SidebarUser />
      </Sidebar>
    </SidebarCard>
  )
}
