/**
 * Server-side GraphQL request handler
 *
 * Uses yoga.fetch() in-process for server components, API routes, and server
 * actions. Auth is handled automatically via auth() in the Yoga context
 * reading the session from cookies.
 */

import 'server-only'

import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql'

import { yoga } from '@/app/api/graphql/yoga'

export class GraphQLRequestError extends Error {
  constructor(
    message: string,
    public readonly errors?: unknown[]
  ) {
    super(message)
    this.name = 'GraphQLRequestError'
  }
}

/**
 * Core GraphQL executor via yoga.fetch() with error handling
 *
 * Builds a synthetic Request and calls yoga.fetch() in-process. Auth is handled
 * automatically by auth() in the Yoga context reading the session from cookies.
 * Used by the typed document public API.
 *
 * @param params - Execution parameters
 * @param params.query - GraphQL query string
 * @param params.variables - Optional GraphQL variables
 * @param params.useCache - Boolean - indicates cached requests
 * @returns Typed GraphQL response data
 * @throws {GraphQLRequestError} On HTTP errors, GraphQL errors, or missing data
 */
async function executeGraphQL<TData>(params: {
  query: string
  variables?: Record<string, unknown>
  useCache?: boolean
}): Promise<TData> {
  const { query, variables, useCache } = params

  const request = new Request('http://yoga/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(useCache ? { 'Internal-Use-Cache': 'true' } : {}),
    },
    body: JSON.stringify({ query, variables }),
  })

  const response = await yoga.fetch(request)

  if (!response.ok) {
    const message = await response.text()
    throw new GraphQLRequestError(
      `GraphQL request failed (${response.status}): ${message || response.statusText}`
    )
  }

  const result = (await response.json()) as { data?: TData; errors?: unknown[] }

  if (result.errors && result.errors.length > 0) {
    throw new GraphQLRequestError(
      `GraphQL errors: ${JSON.stringify(result.errors)}`,
      result.errors
    )
  }

  if (!result.data) {
    throw new GraphQLRequestError('GraphQL returned no data')
  }

  return result.data
}

/**
 * Execute a typed GraphQL operation via yoga.fetch()
 *
 * Runs in-process within the Next.js request lifecycle. Auth is handled
 * automatically by auth() in the Yoga context reading cookies.
 *
 * @param params - Execution parameters
 * @param params.document - Code-generated typed GraphQL document
 * @param params.variables - GraphQL variables (type-safe)
 * @param params.useCache - Boolean - indicates cached requests
 * @returns Typed GraphQL response data
 * @throws {GraphQLRequestError} On GraphQL errors or execution failures
 */
export async function fetchGraphQL<
  TData,
  TVariables extends Record<string, unknown>,
>(params: {
  document: TypedDocumentNode<TData, TVariables>
  variables?: TVariables
  useCache?: boolean
}): Promise<TData> {
  const { document, variables, useCache } = params
  return executeGraphQL({
    query: print(document),
    variables,
    useCache,
  })
}
