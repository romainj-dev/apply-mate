import styled from 'styled-components'
import { GlassCardContent, GlassCardTitle } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'

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

/* ── Content ─────────────────────────────────────────────────────────── */

export const ContentArea = styled(GlassCardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

/* ── Incomplete Warning ───────────────────────────────────────────────── */

export const IncompleteWarning = styled.div`
  background: rgb(255 247 237 / 0.5); /* orange-50/50 */
  border: 1px solid #fed7aa; /* orange-200 */
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
  /* green-600 */
  color: #16a34a;
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
  /* green-600 */
  color: #16a34a;
  margin-top: 0.125rem;
`
