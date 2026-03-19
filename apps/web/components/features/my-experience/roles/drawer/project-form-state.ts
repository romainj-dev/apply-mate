import type { TechStackItem } from '@/types/tech-stack'
import { parseTechStack } from '@/types/tech-stack'
import type { ExperienceRoleProject } from '../data-types'

/* ── Form state ──────────────────────────────────────────────────── */

export interface ProjectDrawerFormState {
  title: string
  description: string
  techStack: TechStackItem[]
  achievements: Array<{ localId: string; text: string }>
}

/* ── Actions ──────────────────────────────────────────────────────── */

export type ProjectFormAction =
  | { type: 'SET_TITLE'; value: string }
  | { type: 'SET_DESCRIPTION'; value: string }
  | { type: 'ADD_TECH'; item: TechStackItem }
  | { type: 'REMOVE_TECH'; index: number }
  | { type: 'ADD_ACHIEVEMENT' }
  | { type: 'REMOVE_ACHIEVEMENT'; index: number }
  | { type: 'UPDATE_ACHIEVEMENT'; index: number; text: string }
  | { type: 'PASTE_ACHIEVEMENTS'; text: string }
  | { type: 'RESET'; project?: ExperienceRoleProject }

/* ── Helpers ──────────────────────────────────────────────────────── */

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

/* ── Initializer ─────────────────────────────────────────────────── */

export function initProjectFormState(
  project?: ExperienceRoleProject
): ProjectDrawerFormState {
  if (!project) {
    return {
      title: '',
      description: '',
      techStack: [],
      achievements: [],
    }
  }

  return {
    title: project.title,
    description: project.description ?? '',
    techStack: parseTechStack(project.techStack),
    achievements: (project.achievements ?? []).map((text) => ({
      localId: localId(),
      text,
    })),
  }
}

/* ── Reducer ─────────────────────────────────────────────────────── */

export function projectFormReducer(
  state: ProjectDrawerFormState,
  action: ProjectFormAction
): ProjectDrawerFormState {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.value }

    case 'SET_DESCRIPTION':
      return { ...state, description: action.value }

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

    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...state.achievements, { localId: localId(), text: '' }],
      }

    case 'REMOVE_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.filter((_, i) => i !== action.index),
      }

    case 'UPDATE_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map((a, i) =>
          i === action.index ? { ...a, text: action.text } : a
        ),
      }

    case 'PASTE_ACHIEVEMENTS': {
      const lines = parseAchievementLines(action.text)
      return {
        ...state,
        achievements: [
          ...state.achievements,
          ...lines.map((text) => ({ localId: localId(), text })),
        ],
      }
    }

    case 'RESET':
      return initProjectFormState(action.project)

    default:
      return state
  }
}
