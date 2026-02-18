import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import LinkedIn from 'next-auth/providers/linkedin'
import GitHub from 'next-auth/providers/github'
import { parseBffEnv } from '@shared/env'

const env = parseBffEnv()

export const authConfig = {
  providers: [
    ...(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
    ...(env.AUTH_LINKEDIN_ID && env.AUTH_LINKEDIN_SECRET
      ? [
          LinkedIn({
            clientId: env.AUTH_LINKEDIN_ID,
            clientSecret: env.AUTH_LINKEDIN_SECRET,
          }),
        ]
      : []),
    ...(env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET
      ? [
          GitHub({
            clientId: env.AUTH_GITHUB_ID,
            clientSecret: env.AUTH_GITHUB_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    authorized({ auth }) {
      // Protected routes are defined by the middleware matcher.
      // This callback only runs on matched routes, so we just
      // enforce that the user is authenticated.
      return !!auth
    },
    redirect({ url, baseUrl }) {
      // If redirecting to a relative URL, make it absolute
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // If redirecting to same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url
      }
      // Default redirect to dashboard after login
      return `${baseUrl}/dashboard`
    },
  },
  pages: {
    signIn: '/auth',
  },
} satisfies NextAuthConfig
