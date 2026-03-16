'use client'

import { Menu } from 'lucide-react'
import { useDashboardLayout } from '@/components/layout/dashboard-layout/DashboardLayout'
import {
  BrandTitle,
  HamburgerButton,
  MobileHeaderBar,
} from './MobileHeader.styles'

export function MobileHeader() {
  const { onOpenMobile } = useDashboardLayout()

  return (
    <MobileHeaderBar>
      <HamburgerButton onClick={onOpenMobile} aria-label="Open navigation menu">
        <Menu />
      </HamburgerButton>
      <BrandTitle>ApplyMate</BrandTitle>
      <div />
    </MobileHeaderBar>
  )
}
