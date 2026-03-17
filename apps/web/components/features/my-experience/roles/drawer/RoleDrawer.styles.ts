import styled from 'styled-components'
import { AlertCircle } from 'lucide-react'

export const SaveErrorBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.status.danger.bg};
  border: 1px solid ${({ theme }) => theme.colors.status.danger.border};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.status.danger.fg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const SaveErrorIcon = styled(AlertCircle)`
  width: 1rem;
  height: 1rem;
  margin-top: 2px;
  flex-shrink: 0;
`

export const FormBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

export const SectionLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.space.xs};
`

export const SectionRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: flex-start;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
`
