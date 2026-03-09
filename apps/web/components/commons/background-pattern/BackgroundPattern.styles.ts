import styled from 'styled-components'

export const Pattern = styled.div<{
  $position?: 'absolute' | 'fixed'
  $zIndex?: number
}>`
  position: ${({ $position }) => $position ?? 'absolute'};
  inset: 0;
  pointer-events: none;
  opacity: 0.2;
  ${({ $zIndex }) => $zIndex !== undefined && `z-index: ${$zIndex};`}
  background-size: 40px 40px;
  background-image:
    linear-gradient(
      to right,
      ${({ theme }) => theme.colors.border} 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.border} 1px,
      transparent 1px
    );
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
`
