import styled from 'styled-components'

export const ToggleGroup = styled.div`
  display: flex;
  gap: 0;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

export const ToggleButton = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;

  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accentForeground : theme.colors.foreground};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.muted};
  }
`

export const ToggleLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.space.xs};
  display: block;
`
