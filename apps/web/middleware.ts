import NextAuth from 'next-auth'
import { authConfig } from '@/modules/session/shared/config'

export default NextAuth(authConfig).auth

export const config = {
  matcher: [
    /*
     * Only run middleware on protected routes:
     * - /dashboard and sub-routes
     *
     * Public routes (/, /auth, /api/graphql, etc.) are NOT matched.
     * Unauthenticated users are redirected to /auth by the
     * `authorized` callback in apps/web/modules/session/shared/config.ts.
     */
    '/dashboard/:path*',
  ],
}
