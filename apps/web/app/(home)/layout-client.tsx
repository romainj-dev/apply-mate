'use client'

import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'
import { Main, Root } from './layout.styles'

interface MarketingLayoutClientProps {
  authSlot: ReactNode
  children: ReactNode
}

export function MarketingLayoutClient({
  authSlot,
  children,
}: MarketingLayoutClientProps) {
  return (
    <Root>
      <Header authSlot={authSlot} />
      <Main>{children}</Main>
      <Footer />
    </Root>
  )
}
