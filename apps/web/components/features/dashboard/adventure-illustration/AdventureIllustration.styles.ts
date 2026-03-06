import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  50% {
    opacity: 0.5;
  }
`

export const IllustrationSvg = styled.svg`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
`

export const SlowPulsingPath = styled.path`
  animation: ${pulse} 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export const EaseInPulsingPath = styled.path`
  animation: ${pulse} 3s ease-in-out infinite;
`

export const PulsingCircle = styled.circle`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`
