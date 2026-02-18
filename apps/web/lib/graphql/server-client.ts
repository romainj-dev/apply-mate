import 'server-only'

import { parseBffEnv } from '@shared/env'
import { SignJWT } from 'jose'
import { print } from 'graphql'
import type { DocumentNode } from 'graphql'

const bffEnv = parseBffEnv()

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

/**
 * Authenticated user info for building auth headers.
 */
export interface AuthUser {
  id: string
  email: string
  name?: string | null
}

/**
 * Options for graphqlRequest.
 */
export interface GraphqlRequestOptions {
  headers?: Record<string, string>
  /**
   * The authenticated user. If provided, a signed JWT will be attached to the
   * request. Pass null/undefined for unauthenticated requests (public endpoints).
   */
  user?: AuthUser | null
}

export class GraphqlRequestError extends Error {
  status: number
  statusText: string
  errors?: Array<{ message: string }>

  constructor(
    message: string,
    options: {
      status: number
      statusText: string
      errors?: Array<{ message: string }>
    }
  ) {
    super(message)
    this.status = options.status
    this.statusText = options.statusText
    this.errors = options.errors
  }
}

function getGraphqlUrl(): string {
  return `${bffEnv.AUTH_URL}/api/graphql`
}

/**
 * Builds Authorization header with a signed JWT for the given user.
 * Returns an empty object for unauthenticated/public requests.
 */
async function buildAuthHeaders(
  user?: AuthUser | null
): Promise<Record<string, string>> {
  if (!user?.id || !user.email) {
    return {}
  }

  const secret = new TextEncoder().encode(bffEnv.AUTH_SECRET)
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret)

  return { Authorization: `Bearer ${token}` }
}

export async function graphqlRequest<T>(
  query: string | DocumentNode,
  variables?: Record<string, unknown>,
  options?: GraphqlRequestOptions
): Promise<T> {
  const queryString = typeof query === 'string' ? query : print(query)
  const url = getGraphqlUrl()

  const authHeaders = await buildAuthHeaders(options?.user)
  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers ?? {}),
    ...authHeaders,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: queryString, variables }),
    cache: 'no-store',
  })

  let json: GraphQLResponse<T> | undefined
  try {
    json = (await response.json()) as GraphQLResponse<T>
  } catch {
    throw new GraphqlRequestError('Failed to parse GraphQL response', {
      status: 502,
      statusText: 'Internal Server Error',
    })
  }

  // Transport error (non-2xx)
  if (!response.ok) {
    throw new GraphqlRequestError(
      `GraphQL request failed: ${response.status} ${response.statusText}`,
      {
        status: response.status,
        statusText: response.statusText,
        errors: json?.errors,
      }
    )
  }

  // GraphQL-level errors
  if (json?.errors?.length) {
    const message = json.errors.map((e) => e.message).join(', ')
    throw new GraphqlRequestError(`GraphQL errors: ${message}`, {
      status: 500,
      statusText: 'Internal Server Error',
      errors: json.errors,
    })
  }

  // No data returned
  if (!json?.data) {
    throw new GraphqlRequestError('No data returned from GraphQL API', {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }

  return json.data
}
