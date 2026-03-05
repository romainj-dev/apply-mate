import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const bounce = keyframes`
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`

interface ColorValueProps {
  $color: string
}

interface DelayProps {
  $delay: string
}

export const UniverseWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  pointer-events: none;
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

export const AmbientCircleSm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16rem;
  height: 16rem;
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 5%, transparent);
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export const AmbientCircleLg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24rem;
  height: 24rem;
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 5%, transparent);
  border-radius: ${({ theme }) => theme.radii.full};
`

export const BubblesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xl};
  position: relative;
  z-index: 10;
`

export const BubbleWrapper = styled(motion.div)`
  cursor: pointer;
  position: relative;
`

export const BubbleInner = styled.div<ColorValueProps>`
  width: 7rem;
  height: 7rem;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.md};
  position: relative;
  overflow: hidden;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  background: radial-gradient(
    circle at 30% 30%,
    white 0%,
    ${({ $color }) => $color} 50%,
    color-mix(in srgb, ${({ $color }) => $color}, black 20%) 100%
  );
  box-shadow:
    0 10px 30px -5px
      color-mix(in srgb, ${({ $color }) => $color}, transparent 60%),
    inset 0 -4px 10px rgb(0 0 0 / 0.2);

  ${({ theme }) => theme.media.belowMobile} {
    width: 6rem;
    height: 6rem;
  }

  ${BubbleWrapper}:hover & {
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
  }
`

export const InnerGlow = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background: white;
  mix-blend-mode: overlay;
  border-radius: ${({ theme }) => theme.radii.full};
`

export const BubbleName = styled.span`
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  margin-bottom: ${({ theme }) => theme.space.sm};

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`

export const ScorePill = styled.div`
  background: rgb(0 0 0 / 0.8);
  backdrop-filter: blur(12px);
  padding-inline: ${({ theme }) => theme.space.sm};
  padding-block: 0.125rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid rgb(255 255 255 / 0.2);
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

export const ScoreText = styled.span`
  font-size: 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: white;
  line-height: 1;
`

export const HoverDots = styled.div`
  position: absolute;
  bottom: 0.25rem;
  opacity: 0;
  display: flex;
  gap: 0.125rem;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);

  ${BubbleWrapper}:hover & {
    opacity: 1;
  }
`

export const BounceDot = styled.div<DelayProps>`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: white;
  animation: ${bounce} 1s infinite;
  animation-delay: ${({ $delay }) => $delay};
`
