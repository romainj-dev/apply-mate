'use client'

import type { ReactNode } from 'react'
import {
  BackgroundGradient,
  BackgroundPattern,
  Content,
  Root,
  VibrancyOrb,
} from './layout.styles'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Root>
      <BackgroundPattern />
      <BackgroundGradient />
      <VibrancyOrb />
      <Content>{children}</Content>
    </Root>
  )
}
