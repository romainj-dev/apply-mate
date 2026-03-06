import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'

interface ColorValueProps {
  $color: string
}

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
