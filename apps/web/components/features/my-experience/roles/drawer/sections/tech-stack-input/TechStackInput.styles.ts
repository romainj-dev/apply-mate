import styled from 'styled-components'
import { Badge } from '@/components/ui/Badge'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const SectionLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
`

export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
`

export const TechChip = styled(Badge)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  cursor: default;
`

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: inherit;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

export const InputWrapper = styled.div`
  position: relative;
`

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  max-height: 200px;
  overflow-y: auto;
  margin-top: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => theme.space.xs} 0;
  list-style: none;
`

export const SuggestionItem = styled.li<{ $highlighted: boolean }>`
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  background: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.muted : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`
