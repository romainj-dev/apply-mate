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
