import { z } from 'zod'

export const bffEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  // Auth.js
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url(),
  // OAuth Providers
  AUTH_GOOGLE_ID: z.string().min(1).optional(),
  AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
  AUTH_LINKEDIN_ID: z.string().min(1).optional(),
  AUTH_LINKEDIN_SECRET: z.string().min(1).optional(),
  AUTH_GITHUB_ID: z.string().min(1).optional(),
  AUTH_GITHUB_SECRET: z.string().min(1).optional(),
  // Resume Parsers
  RESUME_PARSER_KEY: z.string().min(1).optional(),
})

export type BffEnv = z.infer<typeof bffEnvSchema>

export function parseBffEnv(
  source:
    | NodeJS.ProcessEnv
    | Partial<Record<keyof BffEnv, unknown>> = process.env
): BffEnv {
  return bffEnvSchema.parse(source)
}
