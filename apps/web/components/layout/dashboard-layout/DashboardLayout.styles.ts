import styled from 'styled-components'

interface RootProps {
  $collapsed: boolean
}

export const Root = styled.div<RootProps>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ $collapsed }) =>
      $collapsed ? '5rem' : '18rem'} 1fr;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  transition: grid-template-columns 0.2s ease;

  ${({ theme }) => theme.media.belowTablet} {
    grid-template-columns: 1fr;
  }
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

  ${({ theme }) => theme.media.belowTablet} {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
`

export const ContentInner = styled.div`
  display: contents;

  ${({ theme }) => theme.media.belowTablet} {
    display: block;
    padding: ${({ theme }) => theme.space.lg};
    flex: 1;
  }
`
