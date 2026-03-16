/* ── Tech categories ─────────────────────────────────────────────────── */

export const TECH_CATEGORIES = [
  'frontend',
  'backend',
  'database',
  'devops',
  'language',
  'testing',
  'mobile',
  'tooling',
] as const

export type TechCategory = (typeof TECH_CATEGORIES)[number]

/* ── Known tech keys ─────────────────────────────────────────────────── */

export const TECH_KEYS = [
  // Frontend
  'react',
  'vue',
  'angular',
  'svelte',
  'nextjs',
  'nuxt',
  'remix',
  'tailwind',
  'styledcomponents',

  // Backend
  'nodejs',
  'express',
  'nestjs',
  'django',
  'flask',
  'rails',
  'spring',
  'graphql',
  'rest',

  // Database
  'postgresql',
  'mysql',
  'mongodb',
  'redis',
  'sqlite',
  'dynamodb',
  'elasticsearch',

  // DevOps
  'docker',
  'kubernetes',
  'aws',
  'gcp',
  'azure',
  'terraform',
  'github-actions',
  'jenkins',
  'vercel',
  'netlify',

  // Languages
  'typescript',
  'javascript',
  'python',
  'go',
  'java',
  'rust',
  'csharp',
  'ruby',
  'php',
  'swift',
  'kotlin',

  // Testing
  'jest',
  'cypress',
  'playwright',
  'vitest',
  'storybook',

  // Mobile
  'react-native',
  'flutter',
  'ios',
  'android',

  // Tooling
  'git',
  'figma',
  'webpack',
  'vite',
  'eslint',
  'prettier',

  // Escape hatch
  'other',
] as const

export type TechKey = (typeof TECH_KEYS)[number]

/* ── DB shape ────────────────────────────────────────────────────────── */

type KnownTechItem = {
  value: Exclude<TechKey, 'other'>
}

type CustomTechItem = {
  value: 'other'
  customLabel: string
}

export type TechStackItem = KnownTechItem | CustomTechItem

/* ── Parsing ─────────────────────────────────────────────────────────── */

type RawTechStackItem = {
  value: string
  customLabel?: string | null
}

const TECH_KEY_SET: ReadonlySet<string> = new Set(TECH_KEYS)

function isKnownTechKey(value: string): value is Exclude<TechKey, 'other'> {
  return value !== 'other' && TECH_KEY_SET.has(value)
}

/**
 * Narrows raw DB/GraphQL tech stack items (loose string types) into the
 * typed TechStackItem discriminated union. Unknown values fall back to
 * `{ value: 'other', customLabel: rawValue }` rather than silently dropping.
 */
export function parseTechStack(raw: RawTechStackItem[]): TechStackItem[] {
  return raw.map((item): TechStackItem => {
    if (isKnownTechKey(item.value)) {
      return { value: item.value }
    }
    return { value: 'other', customLabel: item.customLabel ?? item.value }
  })
}
