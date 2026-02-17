import SchemaBuilder from '@pothos/core'
import type { GraphqlContext } from '../context'
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'

export interface PothosSchemaTypes {
  DefaultFieldNullability: false
  Context: GraphqlContext
  Scalars: {
    DateTime: {
      Input: Date | string
      Output: Date
    }
    JSONObject: {
      Input: Record<string, unknown> | null
      Output: Record<string, unknown> | null
    }
  }
}

export const builder = new SchemaBuilder<PothosSchemaTypes>({
  defaultFieldNullability: false,
})

builder.addScalarType('DateTime', DateTimeResolver, {})
builder.addScalarType('JSONObject', JSONObjectResolver, {})

builder.queryType({})
builder.mutationType({})
