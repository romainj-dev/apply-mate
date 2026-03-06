import { HeaderAuth } from '@/components/layout/header-auth/HeaderAuth.server'
import { MarketingLayoutClient } from './layout-client'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MarketingLayoutClient authSlot={<HeaderAuth />}>
      {children}
    </MarketingLayoutClient>
  )
}
