import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import styled from 'styled-components'

export const FooterRoot = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.card} 30%,
    transparent
  );
`

export const Container = styled.div`
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.space.md};
  padding-block: ${({ theme }) => theme.space['4xl']};

  ${({ theme }) => theme.media.belowMobile} {
    padding-block: ${({ theme }) => theme.space['2xl']};
  }
`

export const TopGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin-bottom: ${({ theme }) => theme.space.xl};

  ${({ theme }) => theme.media.belowTablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.belowMobile} {
    grid-template-columns: 1fr;
  }
`

export const BrandColumn = styled.div`
  grid-column: span 2 / span 2;

  ${({ theme }) => theme.media.belowTablet} {
    grid-column: auto;
  }
`

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

export const BrandIcon = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.accent};
`

export const BrandSparkles = styled(Sparkles)`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.accentForeground};
`

export const BrandName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const Description = styled.p`
  max-width: 20rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.625;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const Column = styled.div``

export const ColumnTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spaceCalc(3)};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const FooterLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`

export const Bottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.space.xl};
`

export const BottomContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};

  ${({ theme }) => theme.media.belowMobile} {
    flex-direction: column;
  }
`

export const Copyright = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
`
