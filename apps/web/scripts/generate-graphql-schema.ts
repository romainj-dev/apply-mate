import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { printSchema } from 'graphql'

const SCHEMA_OUTPUT_DIR = 'graphql'
const SCHEMA_OUTPUT_FILE = 'schema.graphql'

/**
 * Sets up minimal environment variables required for schema generation.
 * These are only used to satisfy imports and won't be used for actual connections.
 */
function setupEnvironmentForSchemaGeneration(): void {
  const defaults = {
    DATABASE_URL: 'postgres://postgres:postgres@localhost:5432/postgres',
    AUTH_SECRET: 'schema-generation-placeholder',
    AUTH_URL: 'http://localhost:3000',
  } as const

  for (const [key, value] of Object.entries(defaults)) {
    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

async function generateSchema(): Promise<string> {
  try {
    const { schema } = await import('../app/api/graphql/schema')
    return printSchema(schema)
  } catch (error) {
    throw new Error(
      `Failed to import GraphQL schema: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

async function writeSchemaToFile(schemaContent: string): Promise<string> {
  const currentDir = dirname(fileURLToPath(import.meta.url))
  const outputPath = resolve(
    currentDir,
    '..',
    SCHEMA_OUTPUT_DIR,
    SCHEMA_OUTPUT_FILE
  )

  try {
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, `${schemaContent}\n`, 'utf8')
    return outputPath
  } catch (error) {
    throw new Error(
      `Failed to write schema to file: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

async function main(): Promise<void> {
  console.info('Generating GraphQL schema...')

  setupEnvironmentForSchemaGeneration()

  const schemaContent = await generateSchema()
  const outputPath = await writeSchemaToFile(schemaContent)

  console.info(`✓ GraphQL schema written to ${outputPath}`)
}

main().catch((error: unknown) => {
  console.error(
    '✗ Schema generation failed:',
    error instanceof Error ? error.message : String(error)
  )
  process.exit(1)
})
