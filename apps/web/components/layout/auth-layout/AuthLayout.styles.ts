import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.space.md};
`

export const BackgroundGradient = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.background},
    transparent,
    transparent
  );
`

export const VibrancyOrb = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 500px;
  width: 500px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  border-radius: ${({ theme }) => theme.radii.full};
  filter: blur(100px);
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 20%,
    transparent
  );
`

export const Content = styled.div`
  position: relative;
  z-index: 10;
`
