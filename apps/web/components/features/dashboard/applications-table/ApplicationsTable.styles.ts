import styled, { css } from 'styled-components'

import { GlassCard } from '@/components/ui/glass-card'
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface CardProps {
  $isEmpty: boolean
}

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

export const TableCard = styled(GlassCard)<CardProps>`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  opacity: ${({ $isEmpty }) => ($isEmpty ? 0.9 : 1)};
`

export const TableWrap = styled.div`
  position: relative;
`

export const StyledTableHeader = styled(TableHeader)`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
`

export const HeaderRow = styled(TableRow)`
  border-bottom: 1px solid rgb(255 255 255 / 0.1);

  &:hover {
    background: transparent;
  }
`

export const HeaderCell = styled(TableHead)`
  padding-top: ${({ theme }) => theme.space.md};
  padding-bottom: ${({ theme }) => theme.space.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary};
`

export const HeaderCellCompany = styled(HeaderCell)`
  padding-left: ${({ theme }) => theme.spaceCalc(6)};
`

export const HeaderCellActions = styled(HeaderCell)`
  text-align: right;
  padding-right: ${({ theme }) => theme.spaceCalc(6)};
`

export const MenuContent = styled(DropdownMenuContent)`
  border-radius: ${({ theme }) => theme.radii.xl};
  border-color: rgb(255 255 255 / 0.2);
  ${glassPanel};
`

export const MenuSeparator = styled(DropdownMenuSeparator)`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.border} 50%,
    transparent
  );
`
