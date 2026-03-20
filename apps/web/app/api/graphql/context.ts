import { auth } from '@/modules/session/server'

async function getSessionUser(): Promise<GraphqlContext['user']> {
  const session = await auth()
  if (!session?.user) {
    return null
  }
  const { id, email, name } = session.user
  // Narrow id and email: they are set in the jwt/session callbacks and must be strings
  if (typeof id !== 'string' || typeof email !== 'string') {
    return null
  }
  return { id, email, name }
}

export type GraphqlContext = {
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
    return { user: null }
  } else {
    const sessionUser = await getSessionUser()
    return { user: sessionUser }
  }
}
