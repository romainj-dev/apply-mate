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

export const GenerateText = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

export const AchievementRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: center;
`

export const CheckIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.status.success.bg};
  color: ${({ theme }) => theme.colors.status.success.fg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  flex-shrink: 0;
`

export const AchievementInput = styled.div`
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
