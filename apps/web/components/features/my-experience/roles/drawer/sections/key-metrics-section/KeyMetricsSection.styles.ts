import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SectionLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
`

export const MetricCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.card};
`

export const MetricTopRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: center;
`

export const MetricSelectWrapper = styled.div`
  flex: 1;
  min-width: 0;
`

export const MetricFieldsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: center;
`

export const MetricLabelInput = styled.div`
  flex: 2;
`

export const MetricValueInput = styled.div`
  flex: 1;
`

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mutedForeground};
  padding: ${({ theme }) => theme.space.xs};
  display: flex;
  align-items: center;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.destructive};
  }
`
