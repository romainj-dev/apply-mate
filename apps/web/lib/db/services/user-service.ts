import { db } from '@/lib/db/client'
import { users } from '@/lib/db/schema'
import { encryptToken, keyFromBase64 } from '@shared/crypto/tokens'
import { parseBffEnv } from '@shared/env/env-schema'
import { upsertUserInputSchema, userIdSchema } from '@shared/schemas/user'
import { eq } from 'drizzle-orm'

const env = parseBffEnv()
const encryptionKey = keyFromBase64(env.TOKEN_ENCRYPTION_KEY)

export type UpsertUserFromOAuthInput = {
  provider: 'google' | 'linkedin' | 'github'
  providerAccountId: string
  email: string
  fullName: string
  avatarUrl?: string | null
  accessToken?: string | null
  refreshToken?: string | null
  tokenExpiresAt?: Date | null
}

export async function upsertUserFromOAuth(
  input: UpsertUserFromOAuthInput
): Promise<{ id: string }> {
  const parsedInput = upsertUserInputSchema.parse(input)

  const encryptedAccessToken = parsedInput.accessToken
    ? encryptToken(parsedInput.accessToken, encryptionKey)
    : null
  const encryptedRefreshToken = parsedInput.refreshToken
    ? encryptToken(parsedInput.refreshToken, encryptionKey)
    : null

  const [user] = await db
    .insert(users)
    .values({
      provider: parsedInput.provider,
      providerAccountId: parsedInput.providerAccountId,
      email: parsedInput.email,
      fullName: parsedInput.fullName,
      avatarUrl: parsedInput.avatarUrl ?? null,
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      tokenExpiresAt: parsedInput.tokenExpiresAt ?? null,
    })
    .onConflictDoUpdate({
      target: [users.provider, users.providerAccountId],
      set: {
        email: parsedInput.email,
        fullName: parsedInput.fullName,
        avatarUrl: parsedInput.avatarUrl ?? null,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        tokenExpiresAt: parsedInput.tokenExpiresAt ?? null,
      },
    })
    .returning({
      id: users.id,
    })

  if (!user) {
    throw new Error('Failed to upsert user')
  }

  return { id: user.id }
}

export async function findUserById(userId: string) {
  const parsedUserId = userIdSchema.parse(userId)
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, parsedUserId))
    .limit(1)

  return user ?? null
}
