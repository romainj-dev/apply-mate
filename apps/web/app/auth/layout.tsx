import type { ReactNode } from 'react'
import { AuthLayout } from '@/components/layout/auth-layout/AuthLayout'

export default function AuthLayoutRoute({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
