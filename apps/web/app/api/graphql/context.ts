import { auth } from '@/lib/auth'
import { db } from '@/lib/db/client'

async function getSessionUser() {
  const session = await auth()
  return session?.user
    ? {
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name,
      }
    : null
}

export interface GraphqlContext {
  db: typeof db
  user: {
    id: string
    email: string
    name?: string | null
  } | null
}

export async function createGraphqlContext(
  request: Request
): Promise<GraphqlContext> {
  if (request.headers.get('Internal-Use-Cache') === 'true') {
    return { db, user: null }
  } else {
    const sessionUser = await getSessionUser()
    return { db, user: sessionUser }
  }
}
