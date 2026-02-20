/**
 * Client-side GraphQL request handler
 *
 * Sends GraphQL operations to /api/graphql. The browser sends cookies
 * automatically; Yoga handles auth via the session.
 */

import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import {
  print,
  type DefinitionNode,
  type OperationDefinitionNode,
} from 'graphql'

function getOperationName<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>
): string | undefined {
  const definition = document.definitions.find(
    (def: DefinitionNode): def is OperationDefinitionNode =>
      def.kind === 'OperationDefinition'
  )
  return definition?.name?.value
}

/**
 * GraphQL client error with additional error details from the server
 */
export class GraphQLClientError extends Error {
  constructor(
    message: string,
    public readonly errors: unknown[]
  ) {
    super(message)
    this.name = 'GraphQLClientError'
  }
}

type GraphQLResponse<TData> = {
  data?: TData
  errors?: Array<{ message: string }>
}

/**
 * Execute a typed GraphQL operation via /api/graphql
 *
 * Used by React Query hooks for all client-side data fetching.
 *
 * @param document - Code-generated typed GraphQL document
 * @param variables - GraphQL variables (type-safe)
 * @returns Typed GraphQL response data
 * @throws {GraphQLClientError} On GraphQL errors or network failures
 */
export async function fetchGraphQLClient<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
): Promise<TData> {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: getOperationName(document),
      query: print(document),
      variables,
    }),
  })

  if (!response.ok) {
    throw new GraphQLClientError(`HTTP error: ${response.status}`, [])
  }

  const result = (await response.json()) as GraphQLResponse<TData>

  if (result.errors && result.errors.length > 0) {
    throw new GraphQLClientError(
      result.errors.map((e) => e.message).join(', '),
      result.errors
    )
  }

  if (!result.data) {
    throw new GraphQLClientError('No data returned', [])
  }

  return result.data
}
