import styled from 'styled-components'
import { Progress } from '@radix-ui/react-progress'
import { Badge } from '@/components/ui/badge'
import { GlassCardContent } from '@/components/ui/glass-card'

export const CardBody = styled(GlassCardContent)`
  padding: ${({ theme }) => theme.space.lg};
`

export const ContentRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`

export const IconWrapper = styled.div`
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: #ffedd5;
  padding: ${({ theme }) => theme.space.sm};
  flex-shrink: 0;
  color: #ea580c;
`

export const ContentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const ProfileLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
`

export const ProfileDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-top: ${({ theme }) => theme.spaceCalc(0.5)};
`

export const ProgressBar = styled(Progress)`
  height: 0.5rem;
`

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`

export const GreenBadge = styled(Badge)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: #dcfce7;
  color: #15803d;
  border-color: #bbf7d0;
`

export const OrangeBadge = styled(Badge)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: #ffedd5;
  color: #c2410c;
  border-color: #fed7aa;
`
