import styled from 'styled-components'

export const TeamGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

export const TeamRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  align-items: flex-end;
`

export const TeamInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  flex: 1;
`

export const MethodologyGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  flex: 1.5;
`

export const TeamLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const SectionLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
`

export const MethodologySelect = styled.select`
  padding: ${({ theme }) => theme.space.sm};
  border: 1px solid ${({ theme }) => theme.colors.input};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  appearance: auto;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.ring};
    outline-offset: -1px;
  }
`
