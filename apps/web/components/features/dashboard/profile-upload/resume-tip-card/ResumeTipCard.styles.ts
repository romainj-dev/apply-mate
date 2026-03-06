import styled from 'styled-components'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

type TipBrand = 'linkedin' | 'indeed'

export const TipCard = styled.div`
  padding: ${({ theme }) => theme.spaceCalc(5)};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.card} 20%,
    transparent
  );
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.card} 40%,
      transparent
    );
  }
`

export const TipInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`

export const TipIconBox = styled.div<{ $brand: TipBrand }>`
  margin-top: 0.25rem;
  height: 2.5rem;
  width: 2.5rem;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(
    in srgb,
    ${({ $brand }) => ($brand === 'linkedin' ? '#0077b5' : '#2164f3')} 10%,
    transparent
  );
  color: ${({ $brand }) => ($brand === 'linkedin' ? '#0077b5' : '#2164f3')};
  border: 1px solid
    color-mix(
      in srgb,
      ${({ $brand }) => ($brand === 'linkedin' ? '#0077b5' : '#2164f3')} 20%,
      transparent
    );
`

export const TipBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  flex: 1;
`

export const TipTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TipTitle = styled.h5`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const TipText = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const GhostLinkButton = styled(Button)`
  height: 1.75rem;
  padding-inline: ${({ theme }) => theme.space.sm};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.primary} 5%,
      transparent
    );
  }
`

export const ExternalLinkIcon = styled(ExternalLink)`
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 0.25rem;
`
