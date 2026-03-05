import styled from 'styled-components'
import { AlertCircle } from 'lucide-react'

export const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.status.danger.bg};
  border: 1px solid ${({ theme }) => theme.colors.status.danger.border};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.status.danger.fg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const ErrorAlertIcon = styled(AlertCircle)`
  width: 1rem;
  height: 1rem;
  margin-top: ${({ theme }) => theme.space.xs};
  flex-shrink: 0;
`
