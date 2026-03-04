import styled from 'styled-components'
import { Badge } from '@/components/ui/badge'
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card'
import { AlertCircle, Building2, Calendar } from 'lucide-react'

export const RoleCard = styled(GlassCard)`
  flex-shrink: 0;
  width: 20rem;
`

export const CardBody = styled(GlassCardContent)`
  padding: ${({ theme }) => theme.spaceCalc(5)};
`

export const CardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
`

export const CardHeaderContent = styled.div`
  flex: 1;
`

export const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

interface StatusBadgeProps {
  $isComplete: boolean
}

export const StatusBadge = styled(Badge)<StatusBadgeProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: ${({ $isComplete }) =>
    $isComplete ? '#dcfce7' : '#ffedd5'};
  color: ${({ $isComplete }) => ($isComplete ? '#15803d' : '#c2410c')};
`

export const CurrentBadge = styled(Badge)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`

export const RoleTitle = styled.h4`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const CompanyLine = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-top: ${({ theme }) => theme.space.xs};
`

export const CompanyIcon = styled(Building2)`
  width: 0.875rem;
  height: 0.875rem;
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
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
`

export const TechBadge = styled(Badge)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  color: ${({ theme }) => theme.colors.primary};
`

export const SummaryRow = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const SummaryText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const MissingDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: #ea580c;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const MissingDetailsIcon = styled(AlertCircle)`
  width: 0.875rem;
  height: 0.875rem;
`
