import { Header } from '@/components/layout/header'
import { HeaderAuth } from '@/components/layout/header-auth'
import { Footer } from '@/components/layout/footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header authSlot={<HeaderAuth />} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
