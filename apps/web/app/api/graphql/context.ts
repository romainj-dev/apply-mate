import { auth } from '@/lib/auth'
import { db } from '@/lib/db/client'

export interface GraphqlContext {
  db: typeof db
  user: {
    id: string
    email: string
    name?: string | null
  } | null
}

export async function createGraphqlContext(
  _request: Request
): Promise<GraphqlContext> {
  const session = await auth()
  const sessionUser =
    session?.user?.id && session.user.email
      ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        }
      : null

  return {
    db,
    user: sessionUser,
  }
}
