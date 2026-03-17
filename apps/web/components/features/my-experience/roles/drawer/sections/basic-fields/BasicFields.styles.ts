import styled from 'styled-components'

export const FieldsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

export const DateRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.md};
`

export const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const DateSelects = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`

export const DateSelect = styled.select`
  flex: 1;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const CurrentCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.space.xs};

  input[type='checkbox'] {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`

export const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
`

export const FieldError = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.space.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.status.danger.fg};
`
