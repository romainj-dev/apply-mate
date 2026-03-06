import styled from 'styled-components'
import { GlassCardContent } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Code2, Edit2, FolderGit2, Plus, Target, Users } from 'lucide-react'

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
  margin-bottom: ${({ theme }) => theme.space.sm};
`

export const BodyText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.typography.lineHeight.sm};
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

export const BadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`

export const TechBadge = styled(Badge)`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  color: ${({ theme }) => theme.colors.primary};
`

export const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space.md};

  ${({ theme }) => theme.media.belowMobile} {
    grid-template-columns: 1fr;
  }
`

export const MetaText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

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

export const IconOnlyEditIcon = styled(Edit2)`
  width: 0.75rem;
  height: 0.75rem;
`

export const FlexFill = styled.div`
  flex: 1;
`
