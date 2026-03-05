import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { ChevronLeft, Orbit } from 'lucide-react'
import {
  GlassCard,
  GlassCardHeader,
  GlassCardContent,
  GlassCardTitle,
} from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'

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

/* ── TechnicalSkills ─────────────────────────────────────────────────── */

export const SkillsCard = styled(GlassCard)`
  height: 100%;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgb(255 255 255 / 0.5);
`

export const SkillsHeader = styled(GlassCardHeader)`
  padding-bottom: ${({ theme }) => theme.space.sm};
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const BackButton = styled(motion.button)`
  padding: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.radii.full};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

export const BackChevronIcon = styled(ChevronLeft)``

export const OrbitIcon = styled(Orbit)`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const CardTitle = styled(GlassCardTitle)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const SubTitle = styled.p`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const DotsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`

export const ColorDot = styled.div<ColorValueProps>`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ $color }) => $color};
`

export const SkillsContent = styled(GlassCardContent)`
  flex: 1;
  position: relative;
  padding: ${({ theme }) => theme.space.lg};
  overflow: hidden;
`

export const Footer = styled.div`
  padding: ${({ theme }) => theme.spaceCalc(3)};
  border-top: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.border} 10%, transparent);
  background: rgb(255 255 255 / 0.4);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FooterText = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const AiBadge = styled(Badge)`
  font-size: 9px;
  height: 1rem;
  padding-inline: ${({ theme }) => theme.spaceCalc(1.5)};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
  border-color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 20%,
    transparent
  );
  color: ${({ theme }) => theme.colors.primary};
`

/* ── GlobalUniverse ──────────────────────────────────────────────────── */

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

/* ── CategoryDetails ─────────────────────────────────────────────────── */

export const CategoryContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.lg};
`

export const CategoryHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const CategoryColorDot = styled.div<ColorValueProps>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ $color }) => $color};
`

export const CategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

export const MonoBadge = styled(Badge)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: 10px;
`

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space.md};
`

export const SkillItem = styled(motion.div)`
  position: relative;
`

export const SkillCard = styled.div`
  background: white;
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: ${({ theme }) => theme.spaceCalc(3)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-0.25rem);
  }
`

export const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.space.sm};
`

export const SkillName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

  ${SkillItem}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const SkillScore = styled.span`
  font-size: 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const ProgressTrack = styled.div`
  height: 0.375rem;
  width: 100%;
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.secondary} 50%,
    transparent
  );
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
`

export const ProgressFill = styled(motion.div)<ColorValueProps>`
  height: 100%;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ $color }) => $color};
`

export const FloatingDot = styled(motion.div)<ColorValueProps>`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  opacity: 0.4;
  filter: blur(2px);
  background-color: ${({ $color }) => $color};
`

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`

export const EmptyStateText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-style: italic;
`
