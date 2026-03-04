import styled from 'styled-components'
import { GlassCardContent, GlassCardTitle } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import {
  AlertCircle,
  Calendar,
  Code2,
  Edit2,
  FolderGit2,
  Plus,
  Target,
  Users,
} from 'lucide-react'

/* ── Header ──────────────────────────────────────────────────────────── */

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
`

export const FlexFill = styled.div`
  flex: 1;
`

export const RoleTitle = styled(GlassCardTitle)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`

export const CompanyName = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-top: ${({ theme }) => theme.space.xs};
`

export const PeriodRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const PeriodItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`

export const PeriodCalendarIcon = styled(Calendar)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const HeaderEditIcon = styled(Edit2)`
  width: 1rem;
  height: 1rem;
`

/* ── Content ─────────────────────────────────────────────────────────── */

export const ContentArea = styled(GlassCardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

/* ── Incomplete Warning ───────────────────────────────────────────────── */

export const IncompleteWarning = styled.div`
  background: ${({ theme }) => theme.colors.status.attention.bg};
  border: 1px solid ${({ theme }) => theme.colors.status.attention.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const WarningRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const WarningTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
`

export const WarningText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-top: ${({ theme }) => theme.space.xs};
`

export const WarningAlertIcon = styled(AlertCircle)`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.status.attention.fg};
  flex-shrink: 0;
  margin-top: ${({ theme }) => theme.space.xs};
`

export const SmallEditIcon = styled(Edit2)`
  width: 0.75rem;
  height: 0.75rem;
  margin-right: ${({ theme }) => theme.space.xs};
`

export const IconOnlyEditIcon = styled(Edit2)`
  width: 0.75rem;
  height: 0.75rem;
`

export const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`

/* ── Section headings ────────────────────────────────────────────────── */

/** Plain heading (no icon). mb = 8px by default. */
export const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

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

export const SectionCodeIcon = styled(Code2)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const SectionTargetIcon = styled(Target)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const SectionUsersIcon = styled(Users)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const SectionProjectsIcon = styled(FolderGit2)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const AddProjectIcon = styled(Plus)`
  width: 0.75rem;
  height: 0.75rem;
  margin-right: ${({ theme }) => theme.space.xs};
`

/* ── Text blocks ─────────────────────────────────────────────────────── */

export const BodyText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.typography.lineHeight.sm};
`

export const MetaText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

/* ── Tech badges ─────────────────────────────────────────────────────── */

export const BadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`

export const TechBadge = styled(Badge)`
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  color: ${({ theme }) => theme.colors.primary};
`

/* ── Two-column grid ─────────────────────────────────────────────────── */

export const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space.md};

  ${({ theme }) => theme.media.belowMobile} {
    grid-template-columns: 1fr;
  }
`

/* ── Achievement list ────────────────────────────────────────────────── */

export const AchievementList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const AchievementItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.sm};
`

export const CheckMark = styled.span`
  color: ${({ theme }) => theme.colors.status.success.fg};
  margin-top: 0.125rem;
`

/* ── Projects section ────────────────────────────────────────────────── */

export const ProjectsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spaceCalc(3)};
`

export const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const ProjectCardContent = styled(GlassCardContent)`
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const ProjectTitle = styled.h5`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const ProjectPeriod = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-top: ${({ theme }) => theme.space.xs};
`

export const AchievementsLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.spaceCalc(1.5)};
`

export const ProjectAchievements = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const ProjectAchievementItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
`

export const BulletMark = styled.span`
  color: ${({ theme }) => theme.colors.status.success.fg};
  margin-top: 0.125rem;
`
