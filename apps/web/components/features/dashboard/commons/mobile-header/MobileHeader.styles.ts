import styled from 'styled-components'

export const MobileHeaderBar = styled.header`
  display: none;

  ${({ theme }) => theme.media.belowTablet} {
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    align-items: center;
    justify-items: center;
    padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
    background: rgb(255 255 255 / 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    position: sticky;
    top: 0;
    z-index: 100;
  }
`

export const HamburgerButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgb(255 255 255 / 0.6);
  color: ${({ theme }) => theme.colors.foreground};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background: rgb(255 255 255 / 0.9);
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
`

export const BrandTitle = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.foreground};
`
