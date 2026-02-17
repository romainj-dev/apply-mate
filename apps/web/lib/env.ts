import { parsePublicEnv } from '@shared/env/env-schema'

export const env = parsePublicEnv(process.env)
