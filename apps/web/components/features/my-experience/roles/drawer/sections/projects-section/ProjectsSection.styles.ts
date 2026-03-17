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

export const ProjectCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  background: ${({ theme }) => theme.colors.card};
`

export const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const ProjectTitleInput = styled.div`
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

export const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-bottom: ${({ theme }) => theme.space.xs};
  display: block;
`
