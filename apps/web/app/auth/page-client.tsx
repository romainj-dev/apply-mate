'use client'

import { AuthForm } from '@/components/features/auth/auth-form'
import { BackLink, BrandLink, Footer, Header, Root } from './page.styles'

export function AuthPageClient() {
  return (
    <Root>
      <Header>
        <BrandLink href="/">ApplyMate</BrandLink>
      </Header>

      <AuthForm />

      <Footer>
        <BackLink href="/">← Back to home</BackLink>
      </Footer>
    </Root>
  )
}
