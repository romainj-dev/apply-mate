import styled, { keyframes } from 'styled-components'

import { TableCell, TableRow } from '@/components/ui/Table'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeAndZoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const pulse = keyframes`
  50% {
    opacity: 0.5;
  }
`

export const EmptyRow = styled(TableRow)`
  &:hover {
    background: transparent;
  }
`

export const EmptyStateCell = styled(TableCell)`
  height: 16rem;
  border: none;
`

export const EmptyStateContainer = styled.div`
  height: 100%;
  padding-block: ${({ theme }) => theme.space['2xl']};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 500ms cubic-bezier(0.4, 0, 0.2, 1);
`

export const IllustrationWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

export const FloatingLabelTop = styled.div`
  position: absolute;
  top: 25%;
  right: 22%;
  opacity: 0;
  animation: ${fadeAndZoomIn} 700ms cubic-bezier(0.4, 0, 0.2, 1) 300ms forwards;
`

export const FloatingLabelBottom = styled.div`
  position: absolute;
  bottom: 28%;
  left: 15%;
  opacity: 0;
  animation: ${fadeAndZoomIn} 700ms cubic-bezier(0.4, 0, 0.2, 1) 150ms forwards;
`

export const LabelCard = styled.div`
  background: rgb(255 255 255 / 0.95);
  backdrop-filter: blur(4px);
  border: 1px solid rgb(226 232 240 / 0.6);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spaceCalc(1.5)}
    ${({ theme }) => theme.spaceCalc(3)};
  border-radius: ${({ theme }) => theme.radii.xl};
  transform: rotate(-6deg);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;

  &:hover {
    transform: rotate(0deg);
  }
`

export const LabelCardSecondary = styled(LabelCard)`
  transform: rotate(3deg);
`

export const LabelRow = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const PulseDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.status.success.fg};
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export const SecondaryLabelText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const LabelPointer = styled.div`
  position: absolute;
  bottom: -0.25rem;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  transform: translateX(-50%) rotate(45deg);
  background: rgb(255 255 255);
  border-right: 1px solid rgb(226 232 240 / 0.6);
  border-bottom: 1px solid rgb(226 232 240 / 0.6);
`

export const EmptyTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spaceCalc(3)};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const EmptyDescription = styled.p`
  max-width: 280px;
  margin-bottom: ${({ theme }) => theme.space.xl};
  text-align: center;
  white-space: normal;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.625;
  color: ${({ theme }) => theme.colors.mutedForeground};

  ${({ theme }) => theme.media.belowMobile} {
    max-width: 24rem;
  }
`

export const NoResultsCell = styled(TableCell)`
  text-align: center;
  padding-block: ${({ theme }) => theme.space['2xl']};
  color: ${({ theme }) => theme.colors.mutedForeground};
`
