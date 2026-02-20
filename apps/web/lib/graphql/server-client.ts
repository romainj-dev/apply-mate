import 'server-only'

import { parseBffEnv } from '@shared/env'
import { print } from 'graphql'
import type { DocumentNode } from 'graphql'

const bffEnv = parseBffEnv()

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

/**
 * Options for graphqlRequest.
 */
export interface GraphqlRequestOptions {
  headers?: Record<string, string>
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
 * @deprecated Use fetchGraphQL from @/lib/requests/requests instead.
 * This function makes an HTTP round-trip to /api/graphql and does not
 * forward session cookies, meaning it runs unauthenticated.
 * Migrate callers to fetchGraphQL which uses yoga.fetch() in-process.
 */
export async function graphqlRequest<T>(
  query: string | DocumentNode,
  variables?: Record<string, unknown>,
  options?: GraphqlRequestOptions
): Promise<T> {
  const queryString = typeof query === 'string' ? query : print(query)
  const url = getGraphqlUrl()

  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers ?? {}),
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

  if (json?.errors?.length) {
    const message = json.errors.map((e) => e.message).join(', ')
    throw new GraphqlRequestError(`GraphQL errors: ${message}`, {
      status: 500,
      statusText: 'Internal Server Error',
      errors: json.errors,
    })
  }

  if (!json?.data) {
    throw new GraphqlRequestError('No data returned from GraphQL API', {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }

  return json.data
}
