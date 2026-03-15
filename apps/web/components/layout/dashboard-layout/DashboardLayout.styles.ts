import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 18rem 1fr;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`

export const WhiteOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: rgb(255 255 255);
`

export const SidebarLayer = styled.div`
  position: relative;
  z-index: 10;
`

export const Content = styled.main`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.lg};
`
