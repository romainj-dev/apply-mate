import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`

export const BackgroundPattern = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.2;
  background-size: 40px 40px;
  background-image:
    linear-gradient(
      to right,
      ${({ theme }) => theme.colors.border} 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.border} 1px,
      transparent 1px
    );
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
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
  z-index: 10;
  margin-left: 18rem;
  flex: 1;
  padding-inline: ${({ theme }) => theme.space.lg};
  padding-block: ${({ theme }) => theme.spaceCalc(10)};
`
