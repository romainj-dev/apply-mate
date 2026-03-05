import styled from 'styled-components'
import { AlertCircle, Edit2 } from 'lucide-react'

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

export const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`

export const FlexFill = styled.div`
  flex: 1;
`
