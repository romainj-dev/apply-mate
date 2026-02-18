import { db } from '@/lib/db/client'
import { users } from '@/lib/db/schema'
import { upsertUserInputSchema, userIdSchema } from '@shared/schemas/user'
import { eq } from 'drizzle-orm'

export type UpsertUserFromOAuthInput = {
  provider: 'google' | 'linkedin' | 'github'
  providerAccountId: string
  email: string
  fullName: string
  avatarUrl?: string | null
}

export async function upsertUserFromOAuth(
  input: UpsertUserFromOAuthInput
): Promise<{ id: string }> {
  const parsedInput = upsertUserInputSchema.parse(input)

  const [user] = await db
    .insert(users)
    .values({
      provider: parsedInput.provider,
      providerAccountId: parsedInput.providerAccountId,
      email: parsedInput.email,
      fullName: parsedInput.fullName,
      avatarUrl: parsedInput.avatarUrl ?? null,
    })
    .onConflictDoUpdate({
      target: [users.provider, users.providerAccountId],
      set: {
        email: parsedInput.email,
        fullName: parsedInput.fullName,
        avatarUrl: parsedInput.avatarUrl ?? null,
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
