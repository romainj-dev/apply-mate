import 'server-only'

import NextAuth from 'next-auth'
import { authConfig } from '@/modules/session/shared/config'
import { parseBffEnv } from '@shared/env'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { upsertUserFromOAuth } from '@/lib/db/services/user-service'

type OAuthProvider = 'google' | 'linkedin' | 'github'

function isOAuthProvider(value: unknown): value is OAuthProvider {
  return value === 'google' || value === 'linkedin' || value === 'github'
}

const env = parseBffEnv()

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: env.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, account }) {
      // On initial sign-in (account and user exist)
      if (account && user) {
        // Validate email exists
        if (!user.email) {
          throw new Error('Email is required for authentication')
        }

        if (!isOAuthProvider(account.provider)) {
          throw new Error(`Unsupported OAuth provider: ${account.provider}`)
        }

        token.provider = account.provider

        // Upsert user in database and get UUID
        const dbUser = await upsertUserFromOAuth({
          provider: account.provider,
          providerAccountId: account.providerAccountId ?? account.id,
          email: user.email,
          fullName: user.name ?? user.email,
          avatarUrl: user.image ?? null,
        })

        // Store database UUID in token
        token.dbUserId = dbUser.id

        // Set user fields on initial sign-in
        token.email = user.email
        token.name = user.name
      }

      // On subsequent token refreshes, dbUserId is already in token
      return token
    },
    session({ session, token }) {
      if (session.user) {
        if (typeof token.dbUserId === 'string') {
          session.user.id = token.dbUserId
        }
        if (typeof token.email === 'string') {
          session.user.email = token.email
        }
        if (typeof token.name === 'string') {
          session.user.name = token.name
        }
        if (isOAuthProvider(token.provider) || token.provider === undefined) {
          session.user.provider = token.provider
        }
      }
      return session
    },
  },
})

// All possible NextAuth cookie names across different security configurations:
// - Standard cookies (HTTP)
// - __Secure- prefixed (HTTPS only)
// - __Host- prefixed (HTTPS + same-origin)
const NEXT_AUTH_COOKIE_NAMES = [
  'next-auth.session-token',
  'next-auth.callback-url',
  'next-auth.csrf-token',
  '__Secure-next-auth.session-token',
  '__Secure-next-auth.callback-url',
  '__Secure-next-auth.csrf-token',
  '__Host-next-auth.session-token',
  '__Host-next-auth.callback-url',
  '__Host-next-auth.csrf-token',
] as const

/**
 * Clears all NextAuth cookies when they become invalid.
 * This happens when AUTH_SECRET changes and existing JWTs can no longer be decrypted.
 */
async function clearInvalidSessionCookies() {
  try {
    const requestCookies = await cookies()
    for (const cookieName of NEXT_AUTH_COOKIE_NAMES) {
      requestCookies.delete(cookieName)
    }
  } catch {
    // cookies() can only be called within a Next.js request context
  }
}

type SessionUser = {
  id?: string
  email?: string | null
  name?: string | null
  image?: string | null
  provider?: OAuthProvider
}

export const getSession = cache(
  async (): Promise<{
    isAuth: boolean
    user: SessionUser | undefined
  }> => {
    try {
      const session = await auth()
      return { isAuth: !!session, user: session?.user }
    } catch (error) {
      // JWTSessionError occurs when session cookies were encrypted with a different AUTH_SECRET.
      // Instead of crashing, clear the stale cookies and treat the user as unauthenticated.
      if (error instanceof Error && error.name === 'JWTSessionError') {
        await clearInvalidSessionCookies()
        return { isAuth: false, user: undefined }
      }

      throw error
    }
  }
)

export type Session = Awaited<ReturnType<typeof auth>>
