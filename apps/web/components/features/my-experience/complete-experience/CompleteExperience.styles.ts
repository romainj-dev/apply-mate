import { Plus } from 'lucide-react'
import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  max-width: 100%;
`

export const RolesSection = styled.div``

export const RolesHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const RolesTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const AddIcon = styled(Plus).attrs({
  size: 16,
})`
  margin-right: ${({ theme }) => theme.space.sm};
`

export const RoleDetailSection = styled.div`
  grid-column: span 2 / span 2;

  ${({ theme }) => theme.media.belowTablet} {
    grid-column: auto;
  }
`
