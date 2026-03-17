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

export const MetricRow = styled.div`
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

  &:hover {
    color: ${({ theme }) => theme.colors.destructive};
  }
`
