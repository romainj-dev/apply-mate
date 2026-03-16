import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  max-width: 100%;
`

export const RolesSection = styled.div``

export const RoleDetailSection = styled.div`
  grid-column: span 2 / span 2;

  ${({ theme }) => theme.media.belowTablet} {
    grid-column: auto;
  }
`
