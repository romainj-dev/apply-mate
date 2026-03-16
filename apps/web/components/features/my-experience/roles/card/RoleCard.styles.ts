import styled from 'styled-components'
import { Badge } from '@/components/ui/Badge'
import { GlassCard, GlassCardContent } from '@/components/ui/GlassCard'
import { Building2, Calendar } from 'lucide-react'
import type { Theme } from '@/styles/theme'

type StatusKey = keyof Theme['colors']['status']

export const RoleCard = styled(GlassCard)`
  flex-shrink: 0;
  width: 16rem;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
`

export const CardBody = styled(GlassCardContent)`
  padding: 0;
`

export const CardStack = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: ${({ theme }) => theme.space.xs};
`

export const CardHeader = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: ${({ theme }) => theme.space.sm};
`

export const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

export const CurrentBadge = styled(Badge)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: ${({ theme }) => theme.colors.status.success.bg};
  color: ${({ theme }) => theme.colors.status.success.fg};
  border-color: ${({ theme }) => theme.colors.status.success.border};
`

interface EmploymentTypeBadgeProps {
  $statusKey: StatusKey
}

export const EmploymentTypeBadge = styled(Badge)<EmploymentTypeBadgeProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: ${({ theme, $statusKey }) =>
    theme.colors.status[$statusKey].bg};
  color: ${({ theme, $statusKey }) => theme.colors.status[$statusKey].fg};
  border-color: ${({ theme, $statusKey }) =>
    theme.colors.status[$statusKey].border};
`

export const RoleTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const CompanyLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.space.xs};
  width: 100%;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const CompanyIcon = styled(Building2)`
  width: 0.875rem;
  height: 0.875rem;
`

export const CompanyName = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const PeriodLine = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const PeriodIcon = styled(Calendar)`
  width: 0.875rem;
  height: 0.875rem;
`

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
`

export const TechBadge = styled(Badge)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  color: ${({ theme }) => theme.colors.primary};
`

export const TechOverflow = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`
