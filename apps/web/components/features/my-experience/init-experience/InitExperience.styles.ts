import { Check, Loader2 } from 'lucide-react'
import styled, { keyframes } from 'styled-components'

import { GlassCard } from '@/components/ui/GlassCard'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  max-width: 100%;
`

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

export const ProcessingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: ${({ theme }) => theme.spaceCalc(20)};
`

export const ProcessingCard = styled(GlassCard)`
  width: 100%;
  max-width: 32rem;
`

export const ProcessingContent = styled.div`
  padding-top: ${({ theme }) => theme.space.xl};
  padding-bottom: ${({ theme }) => theme.space.xl};
  text-align: center;
`

export const IconCircle = styled.div`
  margin-inline: auto;
  display: flex;
  height: 4rem;
  width: 4rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.full};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
`

export const SpinningLargeLoader = styled(Loader2).attrs({
  size: 32,
})`
  color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 1s linear infinite;
`

export const HeadingBlock = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`

export const ProcessingTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const ProcessingText = styled.p`
  margin: ${({ theme }) => theme.space.sm} 0 0;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const Checklist = styled.div`
  margin-inline: auto;
  margin-top: ${({ theme }) => theme.space.lg};
  display: flex;
  max-width: 20rem;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.sm};
`

export const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const CompletedItem = styled(ChecklistItem)`
  color: ${({ theme }) => theme.colors.status.success.fg};
`

export const ActiveItem = styled(ChecklistItem)`
  color: ${({ theme }) => theme.colors.primary};
`

export const CompletedIcon = styled(Check).attrs({
  size: 20,
})`
  flex-shrink: 0;
`

export const SpinningSmallLoader = styled(Loader2).attrs({
  size: 20,
})`
  flex-shrink: 0;
  animation: ${spin} 1s linear infinite;
`
