import styled from 'styled-components'
import { GlassCardContent } from '@/components/ui/GlassCard'
import { BarChart3, Edit2, FolderGit2, Plus, Target, Users } from 'lucide-react'

/* ── Section headings ────────────────────────────────────────────────── */

/** Heading with leading icon and gap. mb can be overridden via $mb3. */
export const SectionTitleFlex = styled.h4<{ $mb3?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme, $mb3 }) =>
    $mb3 ? theme.spaceCalc(3) : theme.space.sm};
`

export const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

/* ── Section icons (all accent-colored) ──────────────────────────────── */

export const SectionMetricsIcon = styled(BarChart3)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`

export const SectionTargetIcon = styled(Target)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`

export const SectionUsersIcon = styled(Users)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`

export const SectionProjectsIcon = styled(FolderGit2)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`

export const AddProjectIcon = styled(Plus)`
  width: 0.75rem;
  height: 0.75rem;
  margin-right: ${({ theme }) => theme.space.xs};
`

/* ── Achievements ────────────────────────────────────────────────────── */

export const AchievementList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

export const AchievementItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const CheckMark = styled.span`
  color: ${({ theme }) => theme.colors.status.success.fg};
  margin-top: 0.125rem;
  flex-shrink: 0;
`

/* ── Projects ────────────────────────────────────────────────────────── */

export const ProjectsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spaceCalc(3)};
`

export const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const ProjectCardContent = styled(GlassCardContent)`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

export const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const ProjectTitle = styled.h5`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const ProjectText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.typography.lineHeight.sm};
  white-space: pre-wrap;
`

export const ProjectAchievements = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`

export const ProjectAchievementItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const IconOnlyEditIcon = styled(Edit2)`
  width: 0.75rem;
  height: 0.75rem;
`

export const FlexFill = styled.div`
  flex: 1;
`
