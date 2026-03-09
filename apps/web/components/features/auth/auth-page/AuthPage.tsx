'use client'

import { AuthForm } from '@/components/features/auth/auth-form/AuthForm'
import { BackLink, BrandLink, Footer, Header, Root } from './AuthPage.styles'

export function AuthPage() {
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
