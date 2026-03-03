import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
`

export const StepGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

interface StepBadgeProps {
  $active: boolean
}

export const StepBadge = styled.div<StepBadgeProps>`
  height: 2rem;
  width: 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme, $active }) =>
    $active
      ? theme.colors.primaryForeground
      : theme.colors.secondaryForeground};
`

export const StepLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
`

export const Connector = styled.div`
  height: 0.125rem;
  width: 3rem;
  background-color: ${({ theme }) => theme.colors.border};
`
