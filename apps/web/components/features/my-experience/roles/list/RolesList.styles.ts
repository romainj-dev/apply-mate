import styled from 'styled-components'
import { GlassCard, GlassCardContent } from '@/components/ui/GlassCard'
import { Plus } from 'lucide-react'

export const ScrollContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 20rem;
  gap: ${({ theme }) => theme.space.md};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.space.md};
  margin-inline: ${({ theme }) => theme.spaceCalcNeg(2)};
  padding-inline: ${({ theme }) => theme.space.sm};
`

export const AddRoleCard = styled(GlassCard)`
  width: 100%;
  max-width: 100%;
`

export const AddCardBody = styled(GlassCardContent)`
  padding: ${({ theme }) => theme.spaceCalc(5)};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
`

export const AddContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const AddIconCircle = styled.div`
  height: 3rem;
  width: 3rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: auto;
  color: ${({ theme }) => theme.colors.primary};
`

export const AddRolePlusIcon = styled(Plus)`
  width: 1.5rem;
  height: 1.5rem;
`

export const AddLabel = styled.p`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.foreground};
`

export const AddSubLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`
