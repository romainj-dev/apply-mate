import { DashboardSidebar } from '@/components/features/dashboard/commons/dashboard-sidebar/DashboardSidebar'
import { DashboardLayout } from '@/components/layout/dashboard-layout/DashboardLayout'

export default function DashboardLayoutRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout sidebar={<DashboardSidebar />}>{children}</DashboardLayout>
  )
}
