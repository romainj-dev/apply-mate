import type { TechStackItem } from '@/types/tech-stack'
import type { EmploymentType } from '@/types/employment-types'
import { parseTechStack } from '@/types/tech-stack'
import type { ExperienceRole } from '../data-types'

/* ── Project sub-form ──────────────────────────────────────────────── */

export interface ProjectFormState {
  localId: string
  title: string
  description: string
  techStack: TechStackItem[]
}

/* ── Top-level form ────────────────────────────────────────────────── */

export interface RoleFormState {
  roleGroup: 'work' | 'side-project'
  employmentType: EmploymentType
  title: string
  company: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  isCurrent: boolean
  summary: string
  teamDevelopers: string
  teamDesigners: string
  teamPMs: string
  methodology: string
  techStack: TechStackItem[]
  keyMetrics: Array<{ localId: string; label: string; value: string }>
  keyAchievements: Array<{ localId: string; text: string }>
  projects: ProjectFormState[]
}

/* ── Actions ───────────────────────────────────────────────────────── */

export type StringField =
  | 'title'
  | 'company'
  | 'startMonth'
  | 'startYear'
  | 'endMonth'
  | 'endYear'
  | 'teamDevelopers'
  | 'teamDesigners'
  | 'teamPMs'
  | 'methodology'
  | 'summary'

export type RoleFormAction =
  | { type: 'SET_FIELD'; field: StringField; value: string }
  | { type: 'SET_ROLE_GROUP'; group: 'work' | 'side-project' }
  | { type: 'TOGGLE_CURRENT' }
  | { type: 'ADD_ACHIEVEMENT' }
  | { type: 'REMOVE_ACHIEVEMENT'; index: number }
  | { type: 'UPDATE_ACHIEVEMENT'; index: number; text: string }
  | { type: 'PASTE_ACHIEVEMENTS'; text: string }
  | { type: 'ADD_TECH'; item: TechStackItem }
  | { type: 'REMOVE_TECH'; index: number }
  | { type: 'ADD_METRIC' }
  | { type: 'REMOVE_METRIC'; index: number }
  | {
      type: 'UPDATE_METRIC'
      index: number
      field: 'label' | 'value'
      value: string
    }
  | { type: 'ADD_PROJECT' }
  | { type: 'REMOVE_PROJECT'; index: number }
  | {
      type: 'UPDATE_PROJECT'
      index: number
      field: 'title' | 'description'
      value: string
    }
  | { type: 'ADD_PROJECT_TECH'; projectIndex: number; item: TechStackItem }
  | { type: 'REMOVE_PROJECT_TECH'; projectIndex: number; techIndex: number }
  | { type: 'RESET'; role?: ExperienceRole }

/* ── Helpers ───────────────────────────────────────────────────────── */

function localId(): string {
  return crypto.randomUUID()
}

function parseAchievementLines(text: string): string[] {
  return text
    .split(/\n/)
    .map((line) =>
      line
        .replace(/^[\s]*[-*\u2022\u2023\u25E6\u2043\u2219]\s*/, '')
        .replace(/^\d+[.)]\s*/, '')
        .trim()
    )
    .filter((line) => line.length > 0)
}

function parseTeamStructure(raw: string | null | undefined): {
  teamDevelopers: string
  teamDesigners: string
  teamPMs: string
} {
  if (!raw) return { teamDevelopers: '', teamDesigners: '', teamPMs: '' }

  const devMatch = raw.match(/(\d+)\s*Developer/i)
  const designMatch = raw.match(/(\d+)\s*Designer/i)
  const pmMatch = raw.match(/(\d+)\s*PM/i)

  return {
    teamDevelopers: devMatch?.[1] ?? '',
    teamDesigners: designMatch?.[1] ?? '',
    teamPMs: pmMatch?.[1] ?? '',
  }
}

function parseDateParts(dateStr: string | null | undefined): {
  month: string
  year: string
} {
  if (!dateStr) return { month: '', year: '' }
  // Expected format: YYYY-MM or YYYY-MM-DD or "Month YYYY"
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})/)
  if (isoMatch) return { month: isoMatch[2], year: isoMatch[1] }

  const monthNames: Record<string, string> = {
    january: '01',
    february: '02',
    march: '03',
    april: '04',
    may: '05',
    june: '06',
    july: '07',
    august: '08',
    september: '09',
    october: '10',
    november: '11',
    december: '12',
  }
  const textMatch = dateStr.match(/^(\w+)\s+(\d{4})$/i)
  if (textMatch) {
    const m = monthNames[textMatch[1].toLowerCase()]
    if (m) return { month: m, year: textMatch[2] }
  }

  return { month: '', year: '' }
}

function parseKeyMetrics(
  raw: ExperienceRole['keyMetrics']
): RoleFormState['keyMetrics'] {
  if (!raw) return []
  return raw.map((m) => ({
    localId: localId(),
    label: m.type === 'other' ? (m.customType ?? '') : m.text,
    value: m.value,
  }))
}

/* ── Initializer ───────────────────────────────────────────────────── */

export function initFormState(role?: ExperienceRole): RoleFormState {
  if (!role) {
    return {
      roleGroup: 'work',
      employmentType: 'full-time',
      title: '',
      company: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isCurrent: false,
      summary: '',
      teamDevelopers: '',
      teamDesigners: '',
      teamPMs: '',
      methodology: '',
      techStack: [],
      keyMetrics: [],
      keyAchievements: [],
      projects: [],
    }
  }

  const isSideProject = ['side-project', 'open-source'].includes(
    role.employmentType ?? ''
  )
  const startParts = parseDateParts(role.startDate)
  const endParts = parseDateParts(role.endDate)
  const teamParts = parseTeamStructure(role.teamStructure)

  return {
    roleGroup: isSideProject ? 'side-project' : 'work',
    employmentType: role.employmentType as EmploymentType,
    title: role.title,
    company: role.company,
    startMonth: startParts.month,
    startYear: startParts.year,
    endMonth: endParts.month,
    endYear: endParts.year,
    isCurrent: role.isCurrent ?? false,
    summary: role.summary ?? '',
    ...teamParts,
    methodology: role.methodologies[0] ?? '',
    techStack: parseTechStack(role.techStack),
    keyMetrics: parseKeyMetrics(role.keyMetrics),
    keyAchievements: (role.keyAchievements ?? []).map((text) => ({
      localId: localId(),
      text,
    })),
    projects: role.projects.map((p) => ({
      localId: localId(),
      title: p.title,
      description: p.description ?? '',
      techStack: parseTechStack(p.techStack),
    })),
  }
}

/* ── Reducer ───────────────────────────────────────────────────────── */

export function roleFormReducer(
  state: RoleFormState,
  action: RoleFormAction
): RoleFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }

    case 'SET_ROLE_GROUP':
      return {
        ...state,
        roleGroup: action.group,
        employmentType:
          action.group === 'side-project' ? 'side-project' : 'full-time',
      }

    case 'TOGGLE_CURRENT':
      return {
        ...state,
        isCurrent: !state.isCurrent,
        ...(state.isCurrent ? {} : { endMonth: '', endYear: '' }),
      }

    // ── Achievements ──
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        keyAchievements: [
          ...state.keyAchievements,
          { localId: localId(), text: '' },
        ],
      }

    case 'REMOVE_ACHIEVEMENT':
      return {
        ...state,
        keyAchievements: state.keyAchievements.filter(
          (_, i) => i !== action.index
        ),
      }

    case 'UPDATE_ACHIEVEMENT':
      return {
        ...state,
        keyAchievements: state.keyAchievements.map((a, i) =>
          i === action.index ? { ...a, text: action.text } : a
        ),
      }

    case 'PASTE_ACHIEVEMENTS': {
      const lines = parseAchievementLines(action.text)
      return {
        ...state,
        keyAchievements: [
          ...state.keyAchievements,
          ...lines.map((text) => ({ localId: localId(), text })),
        ],
      }
    }

    // ── Tech stack ──
    case 'ADD_TECH':
      if (state.techStack.some((t) => t.value === action.item.value)) {
        return state
      }
      return { ...state, techStack: [...state.techStack, action.item] }

    case 'REMOVE_TECH':
      return {
        ...state,
        techStack: state.techStack.filter((_, i) => i !== action.index),
      }

    // ── Metrics ──
    case 'ADD_METRIC':
      return {
        ...state,
        keyMetrics: [
          ...state.keyMetrics,
          { localId: localId(), label: '', value: '' },
        ],
      }

    case 'REMOVE_METRIC':
      return {
        ...state,
        keyMetrics: state.keyMetrics.filter((_, i) => i !== action.index),
      }

    case 'UPDATE_METRIC':
      return {
        ...state,
        keyMetrics: state.keyMetrics.map((m, i) =>
          i === action.index ? { ...m, [action.field]: action.value } : m
        ),
      }

    // ── Projects ──
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [
          ...state.projects,
          { localId: localId(), title: '', description: '', techStack: [] },
        ],
      }

    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((_, i) => i !== action.index),
      }

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p, i) =>
          i === action.index ? { ...p, [action.field]: action.value } : p
        ),
      }

    case 'ADD_PROJECT_TECH': {
      const proj = state.projects[action.projectIndex]
      if (!proj || proj.techStack.some((t) => t.value === action.item.value)) {
        return state
      }
      return {
        ...state,
        projects: state.projects.map((p, i) =>
          i === action.projectIndex
            ? { ...p, techStack: [...p.techStack, action.item] }
            : p
        ),
      }
    }

    case 'REMOVE_PROJECT_TECH':
      return {
        ...state,
        projects: state.projects.map((p, i) =>
          i === action.projectIndex
            ? {
                ...p,
                techStack: p.techStack.filter((_, j) => j !== action.techIndex),
              }
            : p
        ),
      }

    case 'RESET':
      return initFormState(action.role)

    default:
      return state
  }
}
