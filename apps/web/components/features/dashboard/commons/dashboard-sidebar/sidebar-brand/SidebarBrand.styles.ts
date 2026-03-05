import Link from 'next/link'
import styled from 'styled-components'

export const BrandSection = styled.div`
  padding: ${({ theme }) => theme.spaceCalc(6)};
  padding-bottom: ${({ theme }) => theme.space.sm};
`

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  padding-inline: ${({ theme }) => theme.space.sm};
`

export const BrandIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 10px 15px -3px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      ),
    0 4px 6px -4px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      );
`

export const BrandIconText = styled.span`
  color: rgb(255 255 255);
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`

export const BrandTitle = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 1;
  letter-spacing: -0.025em;
`

export const BrandSubtitle = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`
