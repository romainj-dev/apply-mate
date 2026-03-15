import styled from 'styled-components'

export const ScrollContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 16rem;
  gap: ${({ theme }) => theme.space.md};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.space.md};
  margin-inline: ${({ theme }) => theme.spaceCalcNeg(2)};
  padding-inline: ${({ theme }) => theme.space.sm};
`
