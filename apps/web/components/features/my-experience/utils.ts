export interface SkillDetails {
  name: string
  score: number
  fill: string
}

export interface SkillCategory {
  id: string
  name: string
  totalScore: number
  color: string
  skills: SkillDetails[]
}

const CATEGORY_MAP: Record<string, string> = {
  // Frontend
  React: 'Frontend',
  'Next.js': 'Frontend',
  TypeScript: 'Frontend', // Primary language for FE
  Tailwind: 'Frontend',
  Cypress: 'Frontend',

  // Backend
  'Node.js': 'Backend',
  PostgreSQL: 'Backend',
  Redis: 'Backend',
  GraphQL: 'Backend',
  Python: 'Backend',
  Go: 'Backend',

  // Cloud/DevOps
  AWS: 'DevOps',
  Docker: 'DevOps',
  Kubernetes: 'DevOps',
  'CI/CD': 'DevOps',
  Terraform: 'DevOps',

  // Tooling/Other
  Git: 'Tooling',
  Figma: 'Tooling',
  Agile: 'Tooling',
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'oklch(0.65 0.22 260)', // Vibrant Blue
  Backend: 'oklch(0.6 0.18 160)', // Emerald/Teal
  DevOps: 'oklch(0.65 0.22 30)', // Orange/Accent
  Tooling: 'oklch(0.65 0.22 300)', // Purple/Pink
  Other: 'oklch(0.7 0.1 200)', // Muted Cyan
}
