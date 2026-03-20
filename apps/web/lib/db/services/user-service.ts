// eslint-disable-next-line no-restricted-imports
import { db } from '@/lib/db/client'
import type { RlsTransaction } from '@/lib/db/rls'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

const upsertUserInputSchema = createInsertSchema(users, {
  provider: z.enum(['google', 'linkedin', 'github']),
  providerAccountId: z.string().min(1).max(255),
  email: z.string().email(),
  fullName: z.string().min(1).max(160),
  avatarUrl: z.string().url().nullable().optional(),
}).pick({
  provider: true,
  providerAccountId: true,
  email: true,
  fullName: true,
  avatarUrl: true,
})

const userIdSchema = z.string().uuid()

export type UpsertUserFromOAuthInput = z.infer<typeof upsertUserInputSchema>
type UserRecord = typeof users.$inferSelect

export async function upsertUserFromOAuth(
  input: UpsertUserFromOAuthInput
): Promise<{ id: string }> {
  const parsedInput = upsertUserInputSchema.parse(input)

  // Bootstrap writes run before a user-scoped RLS transaction exists.
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

/**
 * RLS-aware — must be called inside a `withRlsDb` transaction.
 */
export async function findUserById(
  tx: RlsTransaction,
  userId: string
): Promise<UserRecord | null> {
  const parsedUserId = userIdSchema.parse(userId)
  const [user] = await tx
    .select()
    .from(users)
    .where(eq(users.id, parsedUserId))
    .limit(1)

  return user ?? null
}
