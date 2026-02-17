import { auth } from '@/lib/auth'
import { db } from '@/lib/db/client'
import { parseBffEnv } from '@shared/env/env-schema'
import { jwtVerify } from 'jose'

const env = parseBffEnv()

interface JwtUserPayload {
  id?: string
  email?: string
  name?: string | null
}

export interface GraphqlContext {
  db: typeof db
  user: {
    id: string
    email: string
    name?: string | null
  } | null
}

async function getUserFromJwt(request: Request): Promise<GraphqlContext['user']> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.slice('Bearer '.length)

  try {
    const secret = new TextEncoder().encode(env.AUTH_SECRET)
    const { payload } = await jwtVerify(token, secret)
    const jwtPayload = payload as JwtUserPayload

    if (!jwtPayload.id || !jwtPayload.email) {
      return null
    }

    return {
      id: jwtPayload.id,
      email: jwtPayload.email,
      name: jwtPayload.name ?? null,
    }
  } catch {
    return null
  }
}

export async function createGraphqlContext(
  request: Request
): Promise<GraphqlContext> {
  const jwtUser = await getUserFromJwt(request)
  if (jwtUser) {
    return {
      db,
      user: jwtUser,
    }
  }

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
