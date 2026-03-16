import type { TechCategory, TechKey, TechStackItem } from '@/types/tech-stack'

type TechEntry = {
  label: string
  categories: TechCategory[]
}

const TECH_CATALOG: Record<Exclude<TechKey, 'other'>, TechEntry> = {
  // Frontend
  react: { label: 'React', categories: ['frontend'] },
  vue: { label: 'Vue.js', categories: ['frontend'] },
  angular: { label: 'Angular', categories: ['frontend'] },
  svelte: { label: 'Svelte', categories: ['frontend'] },
  nextjs: { label: 'Next.js', categories: ['frontend', 'backend'] },
  nuxt: { label: 'Nuxt', categories: ['frontend', 'backend'] },
  remix: { label: 'Remix', categories: ['frontend', 'backend'] },
  tailwind: { label: 'Tailwind CSS', categories: ['frontend'] },
  styledcomponents: { label: 'styled-components', categories: ['frontend'] },

  // Backend
  nodejs: { label: 'Node.js', categories: ['backend'] },
  express: { label: 'Express', categories: ['backend'] },
  nestjs: { label: 'NestJS', categories: ['backend'] },
  django: { label: 'Django', categories: ['backend'] },
  flask: { label: 'Flask', categories: ['backend'] },
  rails: { label: 'Rails', categories: ['backend'] },
  spring: { label: 'Spring', categories: ['backend'] },
  graphql: { label: 'GraphQL', categories: ['backend', 'frontend'] },
  rest: { label: 'REST', categories: ['backend'] },

  // Database
  postgresql: { label: 'PostgreSQL', categories: ['database'] },
  mysql: { label: 'MySQL', categories: ['database'] },
  mongodb: { label: 'MongoDB', categories: ['database'] },
  redis: { label: 'Redis', categories: ['database'] },
  sqlite: { label: 'SQLite', categories: ['database'] },
  dynamodb: { label: 'DynamoDB', categories: ['database'] },
  elasticsearch: { label: 'Elasticsearch', categories: ['database'] },

  // DevOps
  docker: { label: 'Docker', categories: ['devops'] },
  kubernetes: { label: 'Kubernetes', categories: ['devops'] },
  aws: { label: 'AWS', categories: ['devops'] },
  gcp: { label: 'GCP', categories: ['devops'] },
  azure: { label: 'Azure', categories: ['devops'] },
  terraform: { label: 'Terraform', categories: ['devops'] },
  'github-actions': { label: 'GitHub Actions', categories: ['devops'] },
  jenkins: { label: 'Jenkins', categories: ['devops'] },
  vercel: { label: 'Vercel', categories: ['devops'] },
  netlify: { label: 'Netlify', categories: ['devops'] },

  // Languages
  typescript: {
    label: 'TypeScript',
    categories: ['language', 'frontend', 'backend'],
  },
  javascript: {
    label: 'JavaScript',
    categories: ['language', 'frontend', 'backend'],
  },
  python: { label: 'Python', categories: ['language', 'backend'] },
  go: { label: 'Go', categories: ['language', 'backend'] },
  java: { label: 'Java', categories: ['language', 'backend'] },
  rust: { label: 'Rust', categories: ['language', 'backend'] },
  csharp: { label: 'C#', categories: ['language', 'backend'] },
  ruby: { label: 'Ruby', categories: ['language', 'backend'] },
  php: { label: 'PHP', categories: ['language', 'backend'] },
  swift: { label: 'Swift', categories: ['language', 'mobile'] },
  kotlin: { label: 'Kotlin', categories: ['language', 'mobile', 'backend'] },

  // Testing
  jest: { label: 'Jest', categories: ['testing'] },
  cypress: { label: 'Cypress', categories: ['testing'] },
  playwright: { label: 'Playwright', categories: ['testing'] },
  vitest: { label: 'Vitest', categories: ['testing'] },
  storybook: { label: 'Storybook', categories: ['testing', 'frontend'] },

  // Mobile
  'react-native': { label: 'React Native', categories: ['mobile', 'frontend'] },
  flutter: { label: 'Flutter', categories: ['mobile'] },
  ios: { label: 'iOS', categories: ['mobile'] },
  android: { label: 'Android', categories: ['mobile'] },

  // Tooling
  git: { label: 'Git', categories: ['tooling'] },
  figma: { label: 'Figma', categories: ['tooling'] },
  webpack: { label: 'Webpack', categories: ['tooling'] },
  vite: { label: 'Vite', categories: ['tooling'] },
  eslint: { label: 'ESLint', categories: ['tooling'] },
  prettier: { label: 'Prettier', categories: ['tooling'] },
}

/** Display label for a tech stack item. */
export function getTechLabel(item: TechStackItem): string {
  if (item.value === 'other') return item.customLabel
  return TECH_CATALOG[item.value].label
}

/** Categories for a tech stack item. "other" items default to ["tooling"]. */
export function getTechCategories(item: TechStackItem): TechCategory[] {
  if (item.value === 'other') return ['tooling']
  return TECH_CATALOG[item.value].categories
}

/** Display label for a category key. */
export function getCategoryLabel(category: TechCategory): string {
  const labels: Record<TechCategory, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    language: 'Language',
    testing: 'Testing',
    mobile: 'Mobile',
    tooling: 'Tooling',
  }
  return labels[category]
}

/**
 * Try to resolve a raw tech string (e.g. "React") to a known TechKey.
 * Returns `null` when no match is found.
 */
export function resolveTechKey(
  raw: string
): Exclude<TechStackItem, { value: 'other' }> | null {
  const normalised = raw.toLowerCase().replace(/[\s.-]/g, '')

  for (const [key, entry] of Object.entries(TECH_CATALOG)) {
    const normKey = key.replace(/-/g, '')
    const normLabel = entry.label.toLowerCase().replace(/[\s.-]/g, '')
    if (normalised === normKey || normalised === normLabel) {
      return { value: key as Exclude<TechKey, 'other'> }
    }
  }
  return null
}

/**
 * Convert a raw tech string to a TechStackItem.
 * Resolves to a known key when possible, falls back to `other`.
 */
export function techStringToItem(raw: string): TechStackItem {
  return resolveTechKey(raw) ?? { value: 'other', customLabel: raw }
}
