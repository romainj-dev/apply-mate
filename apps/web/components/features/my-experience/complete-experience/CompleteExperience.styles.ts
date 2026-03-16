import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  max-width: 100%;
`

export const RolesSection = styled.div`
  scroll-margin-top: ${({ theme }) => theme.space.xl};
`

export const RoleDetailSection = styled.div`
  grid-column: span 2 / span 2;
  scroll-margin-top: ${({ theme }) => theme.space.xl};

  ${({ theme }) => theme.media.belowTablet} {
    grid-column: auto;
  }
`
