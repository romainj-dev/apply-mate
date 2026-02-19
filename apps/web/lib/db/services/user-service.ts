import { db } from '@/lib/db/client'
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
}).pick({ provider: true, providerAccountId: true, email: true, fullName: true, avatarUrl: true })

const userIdSchema = z.string().uuid()

export type UpsertUserFromOAuthInput = z.infer<typeof upsertUserInputSchema>

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
