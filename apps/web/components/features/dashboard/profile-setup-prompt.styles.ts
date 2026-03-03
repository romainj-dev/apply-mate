import styled from 'styled-components'
import { ArrowRight } from 'lucide-react'

import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

export const Card = styled(GlassCard)`
  position: relative;
  overflow: hidden;
`

export const GlowBlob = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: ${({ theme }) => theme.spaceCalcNeg(8)};
  margin-right: ${({ theme }) => theme.spaceCalcNeg(8)};
  width: 8rem;
  height: 8rem;
  background: rgb(249 115 22 / 0.1);
  border-radius: ${({ theme }) => theme.radii.full};
  filter: blur(40px);
  pointer-events: none;
`

export const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spaceCalc(5)};
  position: relative;
  z-index: 10;

  ${({ theme }) => theme.media.belowMobile} {
    flex-direction: column;
  }
`

export const IconShrink = styled.div`
  flex-shrink: 0;
`

export const IconBox = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: rgb(255 237 213 / 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

export const TextContent = styled.div`
  flex: 1;
`

export const Heading = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

export const Body = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-bottom: ${({ theme }) => theme.space.lg};
  max-width: 42rem;
  line-height: 1.625; /* leading-relaxed */
`

export const ArrowIcon = styled(ArrowRight)`
  height: 1rem;
  width: 1rem;
  margin-left: ${({ theme }) => theme.space.sm};
`

export const SetupButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow:
    0 10px 15px -3px rgb(249 115 22 / 0.2),
    0 4px 6px -4px rgb(249 115 22 / 0.2); /* shadow-lg shadow-orange/20 */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow:
      0 10px 15px -3px rgb(249 115 22 / 0.3),
      0 4px 6px -4px rgb(249 115 22 / 0.3); /* hover:shadow-orange/30 */
  }
`
