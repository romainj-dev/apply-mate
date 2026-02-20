import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './graphql/schema.graphql',
  documents: [
    './graphql/**/*.graphql',
    './app/**/*.graphql',
    './lib/**/*.graphql',
  ],
  generates: {
    './graphql/generated/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
  config: {
    avoidOptionals: {
      field: true,
      object: true,
      inputValue: false,
      defaultValue: true,
    },
    maybeValue: 'T | null | undefined',
    skipTypename: true,
  },
}

export default config
