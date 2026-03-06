import Image from 'next/image'
import styled from 'styled-components'

export const Section = styled.section`
  padding-block: ${({ theme }) => theme.spaceCalc(32)};
  position: relative;

  ${({ theme }) => theme.media.belowMobile} {
    padding-block: ${({ theme }) => theme.spaceCalc(20)};
  }
`

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.space.md};
`

export const SectionHeader = styled.div`
  margin: 0 auto;
  max-width: 42rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space['3xl']};
`

export const Heading = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.space.md};
  text-wrap: balance;
  letter-spacing: -0.025em;

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`

export const PrimaryText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

export const Lead = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-wrap: balance;
  line-height: 1.625;
`

export const FeaturesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['4xl']};
  max-width: 72rem;
  margin: 0 auto;
`

interface ReversedProps {
  $reversed: boolean
}

export const FeatureRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};
  grid-template-columns: 1fr 1fr;
  align-items: center;

  ${({ theme }) => theme.media.belowMobile} {
    grid-template-columns: 1fr;
  }
`

export const ContentCol = styled.div<ReversedProps>`
  order: ${({ $reversed }) => ($reversed ? 2 : 1)};

  ${({ theme }) => theme.media.belowMobile} {
    order: unset;
  }
`

export const ImageCol = styled.div<ReversedProps>`
  order: ${({ $reversed }) => ($reversed ? 1 : 2)};

  ${({ theme }) => theme.media.belowMobile} {
    order: unset;
  }
`

export const IconBox = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
  display: flex;
  height: 3.5rem;
  width: 3.5rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: linear-gradient(
    to bottom right,
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent),
    color-mix(in srgb, ${({ theme }) => theme.colors.accent} 10%, transparent)
  );
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent);
  box-shadow: ${({ theme }) => theme.shadows.sm};

  svg {
    width: 1.75rem;
    height: 1.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const FeatureTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.025em;

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`

export const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: 1.625;
`

export const ImageCard = styled.div`
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.card} 50%,
    transparent
  );
  padding: ${({ theme }) => theme.space.sm};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
    transform: translateY(-0.25rem);
  }
`

export const AspectWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
`

export const FeatureImage = styled(Image)`
  object-fit: cover;
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);

  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
`

export const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgb(255 255 255 / 0.05);
  opacity: 0;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);

  ${ImageCard}:hover & {
    opacity: 1;
  }
`
