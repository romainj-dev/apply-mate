import { DashboardSidebar } from '@/components/features/dashboard/commons/dashboard-sidebar'
import { DashboardLayoutClient } from './layout-client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayoutClient sidebar={<DashboardSidebar />}>
      {children}
    </DashboardLayoutClient>
  )
}
