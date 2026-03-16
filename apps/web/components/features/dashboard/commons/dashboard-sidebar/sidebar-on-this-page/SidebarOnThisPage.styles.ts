import styled from 'styled-components'

interface OnThisPageLinkProps {
  $isActive: boolean
}

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin-block: ${({ theme }) => theme.space.md};
  flex-shrink: 0;
  opacity: 0.5;
  background: linear-gradient(
    to right,
    transparent,
    ${({ theme }) => theme.colors.border},
    transparent
  );
`

export const OnThisPageWrapper = styled.div`
  padding-inline: ${({ theme }) => theme.space.md};
  padding-bottom: ${({ theme }) => theme.space.md};
  flex-shrink: 0;
`

export const OnThisPageLabel = styled.div`
  padding-inline: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.mutedForeground} 50%,
    transparent
  );
`

export const OnThisPageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(1)};
`

export const OnThisPageLink = styled.a<OnThisPageLinkProps>`
  display: block;
  padding: ${({ theme }) => theme.spaceCalc(2)} ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 200ms ease;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.mutedForeground};
  background: ${({ theme, $isActive }) =>
    $isActive
      ? `color-mix(in srgb, ${theme.colors.primary} 10%, transparent)`
      : 'transparent'};

  &:hover {
    background: rgb(255 255 255 / 0.5);
    color: ${({ theme }) => theme.colors.foreground};
  }
`
