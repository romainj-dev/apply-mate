import styled, { css } from 'styled-components'

import { DropdownMenuContent } from '@/components/ui/DropdownMenu'

const glassPanel = css`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.background} 60%,
    transparent
  );
  backdrop-filter: blur(24px);
  border: 1px solid rgb(255 255 255 / 0.1);
  box-shadow: ${({ theme }) => theme.shadows.xl};
`

export const StyledTableMenuContent = styled(DropdownMenuContent)`
  border-radius: ${({ theme }) => theme.radii.xl};
  border-color: rgb(255 255 255 / 0.2);
  ${glassPanel};
`
