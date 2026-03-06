import styled from 'styled-components'

import { DropdownMenuSeparator } from '@/components/ui/DropdownMenu'

export const StyledTableMenuSeparator = styled(DropdownMenuSeparator)`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.border} 50%,
    transparent
  );
`
