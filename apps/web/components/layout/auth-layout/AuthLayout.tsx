'use client'

import type { ReactNode } from 'react'
import { BackgroundPattern } from '@/components/commons/background-pattern/BackgroundPattern'
import {
  BackgroundGradient,
  Content,
  Root,
  VibrancyOrb,
} from './AuthLayout.styles'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Root>
      <BackgroundPattern />
      <BackgroundGradient />
      <VibrancyOrb />
      <Content>{children}</Content>
    </Root>
  )
}
