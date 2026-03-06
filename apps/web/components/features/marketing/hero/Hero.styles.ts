import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding-top: ${({ theme }) => theme.spaceCalc(40)};
  padding-bottom: ${({ theme }) => theme.spaceCalc(32)};

  ${({ theme }) => theme.media.belowMobile} {
    padding-top: ${({ theme }) => theme.spaceCalc(32)};
    padding-bottom: ${({ theme }) => theme.spaceCalc(20)};
  }
`

export const GridBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: -10;
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

export const AuroraContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -10;
  overflow: hidden;
`

export const AuroraBlob1 = styled.div`
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  height: 500px;
  width: 800px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 20%,
    transparent
  );
  filter: blur(100px);
`

export const AuroraBlob2 = styled.div`
  position: absolute;
  top: 10%;
  left: 25%;
  height: 300px;
  width: 500px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.accent} 20%,
    transparent
  );
  filter: blur(80px);
`

export const Inner = styled.div`
  margin: 0 auto;
  max-width: 56rem;
  text-align: center;
`

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.lg};
  padding-inline: ${({ theme }) => theme.space.md};
  padding-block: ${({ theme }) => theme.spaceCalc(1.5)};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 20%, transparent);
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
  backdrop-filter: blur(4px);
`

export const BadgeSparklesIcon = styled(Sparkles)`
  width: 1rem;
  height: 1rem;
`

export const Heading = styled.h1`
  margin-bottom: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.typography.fontSize['7xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.foreground};
  text-wrap: balance;

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  }
`

export const GradientText = styled.span`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`

export const Subtitle = styled.p`
  margin-bottom: ${({ theme }) => theme.spaceCalc(10)};
  margin-inline: auto;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-wrap: balance;
  max-width: 42rem;
  line-height: 1.625;

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space['3xl']};

  ${({ theme }) => theme.media.belowMobile} {
    flex-direction: column;
  }
`

export const PrimaryButton = styled(Button)`
  height: 3rem;
  padding-inline: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radii.full};
  box-shadow:
    ${({ theme }) => theme.shadows.lg},
    0 10px 15px -3px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      );
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.05);
  }
`

export const PrimaryArrowIcon = styled(ArrowRight)`
  width: 1rem;
  height: 1rem;
`

export const OutlineButton = styled(Button)`
  height: 3rem;
  padding-inline: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radii.full};
  border-color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 20%,
    transparent
  );
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.background} 50%,
    transparent
  );
  backdrop-filter: blur(4px);

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.background} 80%,
      transparent
    );
  }
`

export const OutlinePlayIcon = styled(Play)`
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`

export const ImageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 64rem;
  perspective: 1000px;
`

export const ImageGlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 20%, transparent),
    color-mix(in srgb, ${({ theme }) => theme.colors.accent} 20%, transparent)
  );
  filter: blur(64px);
  z-index: -10;
  transform: translateY(2.5rem);
  opacity: 0.5;
`

export const GlassCard = styled.div`
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: ${({ theme }) => theme.space.sm};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.card} 50%,
    transparent
  );
  backdrop-filter: blur(4px);
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${float} 6s ease-in-out infinite;

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.card} 80%,
      transparent
    );
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

export const VideoFrame = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
`

export const DashboardImage = styled(Image)`
  object-fit: cover;
`

export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top right,
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent),
    transparent
  );
  pointer-events: none;
`
