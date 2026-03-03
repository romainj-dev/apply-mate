import styled, { css, keyframes } from 'styled-components'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { GlassCard } from '@/components/ui/glass-card'
import { Input } from '@/components/ui/input'
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type StatusTone =
  | 'Pending'
  | 'Accepted'
  | 'Applied'
  | 'Interview'
  | 'Rejected'
  | 'Offer'

interface CardProps {
  $isEmpty: boolean
}

interface StatusBadgeProps {
  $status: StatusTone
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeAndZoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const pulse = keyframes`
  50% {
    opacity: 0.5;
  }
`

const glassPanel = css`
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.background} 60%,
    transparent
  );
  backdrop-filter: blur(24px);
  border: 1px solid rgb(255 255 255 / 0.1);
  box-shadow: ${({ theme }) => theme.shadows.xl};
`

const statusToneStyles: Record<
  StatusTone,
  { bg: string; text: string; border: string }
> = {
  Pending: {
    bg: 'rgb(234 179 8 / 0.15)',
    text: '#a16207', // text-yellow-700
    border: '#fde68a', // border-yellow-200
  },
  Accepted: {
    bg: 'rgb(59 130 246 / 0.15)',
    text: '#1d4ed8', // text-blue-700
    border: '#bfdbfe', // border-blue-200
  },
  Applied: {
    bg: 'rgb(99 102 241 / 0.15)',
    text: '#4338ca', // text-indigo-700
    border: '#c7d2fe', // border-indigo-200
  },
  Interview: {
    bg: 'rgb(249 115 22 / 0.15)',
    text: '#c2410c', // text-orange-700
    border: '#fed7aa', // border-orange-200
  },
  Rejected: {
    bg: 'rgb(239 68 68 / 0.15)',
    text: '#b91c1c', // text-red-700
    border: '#fecaca', // border-red-200
  },
  Offer: {
    bg: 'rgb(34 197 94 / 0.15)',
    text: '#15803d', // text-green-700
    border: '#bbf7d0', // border-green-200
  },
}

export const TableCard = styled(GlassCard)<CardProps>`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  opacity: ${({ $isEmpty }) => ($isEmpty ? 0.9 : 1)};
`

export const HeaderSection = styled.div`
  padding: ${({ theme }) => theme.spaceCalc(6)};
  border-bottom: 1px solid rgb(255 255 255 / 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaceCalc(6)};

  ${({ theme }) => theme.media.belowMobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spaceCalc(3)};
  }
`

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const HeaderSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const HeaderActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spaceCalc(3)};

  ${({ theme }) => theme.media.belowMobile} {
    flex-direction: column;
  }
`

export const SearchField = styled.div`
  position: relative;
`

export const SearchIconWrap = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spaceCalc(3)};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  ${SearchField}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const SearchInput = styled(Input)`
  padding-left: 2.25rem;
  width: 16rem;
  background: rgb(255 255 255 / 0.5);
  border-color: rgb(255 255 255 / 0.2);
  border-radius: ${({ theme }) => theme.radii.xl};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    background: rgb(255 255 255);
  }

  ${({ theme }) => theme.media.belowMobile} {
    width: 100%;
  }
`

export const FilterButton = styled(Button)`
  background: rgb(255 255 255 / 0.5);
  border-color: rgb(255 255 255 / 0.2);
  border-radius: ${({ theme }) => theme.radii.xl};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgb(255 255 255);
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const MenuContent = styled(DropdownMenuContent)`
  border-radius: ${({ theme }) => theme.radii.xl};
  border-color: rgb(255 255 255 / 0.2);
  ${glassPanel};
`

export const MenuSeparator = styled(DropdownMenuSeparator)`
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.border} 50%,
    transparent
  );
`

export const TableWrap = styled.div`
  position: relative;
`

export const StyledTableHeader = styled(TableHeader)`
  background: color-mix(
    in oklch,
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

export const EmptyRow = styled(TableRow)`
  &:hover {
    background: transparent;
  }
`

export const EmptyStateCell = styled(TableCell)`
  height: 16rem;
  border: none;
`

export const EmptyStateContainer = styled.div`
  height: 100%;
  padding-block: ${({ theme }) => theme.space['2xl']};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 500ms cubic-bezier(0.4, 0, 0.2, 1);
`

export const IllustrationWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

export const FloatingLabelTop = styled.div`
  position: absolute;
  top: 25%;
  right: 22%;
  opacity: 0;
  animation: ${fadeAndZoomIn} 700ms cubic-bezier(0.4, 0, 0.2, 1) 300ms forwards;
`

export const FloatingLabelBottom = styled.div`
  position: absolute;
  bottom: 28%;
  left: 15%;
  opacity: 0;
  animation: ${fadeAndZoomIn} 700ms cubic-bezier(0.4, 0, 0.2, 1) 150ms forwards;
`

export const LabelCard = styled.div`
  background: rgb(255 255 255 / 0.95);
  backdrop-filter: blur(4px);
  border: 1px solid rgb(226 232 240 / 0.6);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spaceCalc(1.5)}
    ${({ theme }) => theme.spaceCalc(3)};
  border-radius: ${({ theme }) => theme.radii.xl};
  transform: rotate(-6deg);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;

  &:hover {
    transform: rotate(0deg);
  }
`

export const LabelCardSecondary = styled(LabelCard)`
  transform: rotate(3deg);
`

export const LabelRow = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(1.5)};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #334155; // text-slate-700
`

export const PulseDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgb(16 185 129); /* emerald-500 — active/success indicator */
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export const SecondaryLabelText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: #64748b; // text-slate-500
`

export const LabelPointer = styled.div`
  position: absolute;
  bottom: -0.25rem;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  transform: translateX(-50%) rotate(45deg);
  background: rgb(255 255 255);
  border-right: 1px solid rgb(226 232 240 / 0.6);
  border-bottom: 1px solid rgb(226 232 240 / 0.6);
`

export const EmptyTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spaceCalc(3)};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const EmptyDescription = styled.p`
  max-width: 280px;
  margin-bottom: ${({ theme }) => theme.space.xl};
  text-align: center;
  white-space: normal;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.625;
  color: ${({ theme }) => theme.colors.mutedForeground};

  ${({ theme }) => theme.media.belowMobile} {
    max-width: 24rem;
  }
`

export const NoResultsCell = styled(TableCell)`
  text-align: center;
  padding-block: ${({ theme }) => theme.space['2xl']};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const BodyRow = styled(TableRow)`
  border-bottom: 1px solid rgb(255 255 255 / 0.05);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgb(255 255 255 / 0.4);
  }
`

export const CompanyCell = styled(TableCell)`
  padding-left: ${({ theme }) => theme.spaceCalc(6)};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const CompanyContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const CompanyIconBox = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgb(255 255 255);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(255 255 255 / 0.2);
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

export const PositionText = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.foreground} 80%,
    transparent
  );
`

export const StatusBadge = styled(Badge)<StatusBadgeProps>`
  border: 1px solid ${({ $status }) => statusToneStyles[$status].border};
  background: ${({ $status }) => statusToneStyles[$status].bg};
  color: ${({ $status }) => statusToneStyles[$status].text};
  backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const DateMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
`

export const TagBadge = styled(Badge)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background: rgb(255 255 255 / 0.3);
  border-color: rgb(255 255 255 / 0.2);
  color: ${({ theme }) => theme.colors.mutedForeground};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgb(255 255 255 / 0.5);
  }
`

export const ActionsCell = styled(TableCell)`
  text-align: right;
  padding-right: ${({ theme }) => theme.spaceCalc(6)};
`

export const RowActionButton = styled(Button)`
  width: 2rem;
  height: 2rem;
  padding: 0;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &[data-state='open'] {
    background: color-mix(
      in oklch,
      ${({ theme }) => theme.colors.primary} 10%,
      transparent
    );
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const ActionMenuItem = styled(DropdownMenuItem)`
  cursor: pointer;
`

export const DestructiveMenuItem = styled(ActionMenuItem)`
  color: #dc2626; // text-red-600

  &:focus {
    color: #b91c1c; // text-red-700
    background: #fef2f2; // bg-red-50
  }
`
