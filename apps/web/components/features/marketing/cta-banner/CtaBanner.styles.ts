import styled from 'styled-components'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export const Section = styled.section`
  padding-block: ${({ theme }) => theme.spaceCalc(32)};
  background: color-mix(
    in srgb,
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

export const BannerWrapper = styled.div`
  max-width: 56rem;
  margin: 0 auto;
`

export const Banner = styled.div`
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(
    to bottom right,
    color-mix(in srgb, ${({ theme }) => theme.colors.accent} 10%, transparent),
    transparent
  );
  padding: ${({ theme }) => theme.space['2xl']};
  text-align: center;
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

export const SubText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-bottom: ${({ theme }) => theme.space.xl};
  text-wrap: balance;
  line-height: 1.625;
  max-width: 42rem;
  margin-inline: auto;
`

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};

  ${({ theme }) => theme.media.belowMobile} {
    flex-direction: column;
  }
`

export const PrimaryButton = styled(Button)`
  height: 3rem;
  padding-inline: ${({ theme }) => theme.space.xl};
`

export const CtaArrowIcon = styled(ArrowRight)`
  width: 1rem;
  height: 1rem;
`

export const OutlineButton = styled(Button)`
  height: 3rem;
  padding-inline: ${({ theme }) => theme.space.xl};
  background: transparent;
`
