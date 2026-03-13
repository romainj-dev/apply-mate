import type { ReactNode } from 'react'
import { AuthLayout } from '@/components/layout/auth-layout/AuthLayout'

interface AuthLayoutRouteProps {
  children: ReactNode
}

export default function AuthLayoutRoute({ children }: AuthLayoutRouteProps) {
  return <AuthLayout>{children}</AuthLayout>
}
