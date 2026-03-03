import { Button } from '@/components/ui/button'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

export const Section = styled.section`
  padding-block: ${({ theme }) => theme.spaceCalc(32)};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.card} 50%,
    transparent
  );

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

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`

export const Lead = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-wrap: balance;
  line-height: 1.625;
`

const StateCardBase = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: ${({ theme }) => theme.spaceCalc(10)};
  text-align: center;
`

export const LoadingCard = styled(StateCardBase)`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.background} 60%,
    transparent
  );
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export const ErrorCard = styled(StateCardBase)`
  border: 1px solid
    color-mix(
      in oklch,
      ${({ theme }) => theme.colors.destructive} 40%,
      transparent
    );
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.destructive} 5%,
    transparent
  );
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
`

export const EmptyCard = styled(StateCardBase)`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.background} 60%,
    transparent
  );
`

export const StateText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const RetryButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const PlansGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
  grid-template-columns: 1fr 1fr;
  max-width: 56rem;
  margin: 0 auto;

  ${({ theme }) => theme.media.belowMobile} {
    grid-template-columns: 1fr;
  }
`

interface PlanCardProps {
  $popular: boolean
}

export const PlanCard = styled.div<PlanCardProps>`
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: ${({ theme }) => theme.spaceCalc(8)};
  position: relative;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid
    ${({ $popular, theme }) =>
      $popular ? theme.colors.accent : theme.colors.border};
  box-shadow: ${({ $popular, theme }) =>
    $popular
      ? `${theme.shadows.lg}, 0 10px 15px -3px color-mix(in oklch, ${theme.colors.accent} 10%, transparent)`
      : 'none'};
`

export const PopularBadgeWrapper = styled.div`
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
`

export const PopularBadge = styled.div`
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.accent};
  padding-inline: ${({ theme }) => theme.space.md};
  padding-block: ${({ theme }) => theme.spaceCalc(1)};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accentForeground};
  white-space: nowrap;
`

export const PlanHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`

export const PlanName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

export const PlanDescription = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const PriceWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`

export const PriceAmount = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const PricePeriod = styled.span`
  color: ${({ theme }) => theme.colors.mutedForeground};
`

interface PlanButtonProps {
  $popular: boolean
}

export const PlanButton = styled(Button)<PlanButtonProps>`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.lg};
  background: ${({ $popular, theme }) =>
    $popular ? theme.colors.primary : theme.colors.secondary};
  color: ${({ $popular, theme }) =>
    $popular
      ? theme.colors.primaryForeground
      : theme.colors.secondaryForeground};

  &:hover {
    background: ${({ $popular, theme }) =>
      $popular
        ? `color-mix(in oklch, ${theme.colors.primary} 90%, transparent)`
        : `color-mix(in oklch, ${theme.colors.secondary} 90%, transparent)`};
  }
`

export const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  list-style: none;
  padding: 0;
  margin: 0;
`

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const CheckIconWrapper = styled.span`
  flex-shrink: 0;
  margin-top: ${({ theme }) => theme.spaceCalc(0.5)};
  color: ${({ theme }) => theme.colors.accent};
`

export const FeatureText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`
