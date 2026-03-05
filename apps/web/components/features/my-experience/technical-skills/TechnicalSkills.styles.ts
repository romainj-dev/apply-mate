import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ChevronLeft, Orbit } from 'lucide-react'
import {
  GlassCard,
  GlassCardHeader,
  GlassCardContent,
  GlassCardTitle,
} from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'

interface ColorValueProps {
  $color: string
}

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
