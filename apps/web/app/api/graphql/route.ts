import { createYoga } from 'graphql-yoga'
import { createGraphqlContext } from './context'
import { schema } from './schema'

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: async ({ request }) => createGraphqlContext(request),
})

export { yoga as GET, yoga as POST, yoga as OPTIONS }
