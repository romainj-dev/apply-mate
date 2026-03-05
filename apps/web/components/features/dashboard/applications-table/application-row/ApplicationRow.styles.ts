import styled from 'styled-components'
import {
  Building2,
  Calendar,
  Download,
  Eye,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'

type StatusTone =
  | 'Pending'
  | 'Accepted'
  | 'Applied'
  | 'Interview'
  | 'Rejected'
  | 'Offer'

interface StatusBadgeProps {
  $status: StatusTone
}

const STATUS_TONE_BY_APPLICATION_STATUS: Record<
  StatusTone,
  'warning' | 'info' | 'progress' | 'attention' | 'danger' | 'success'
> = {
  Pending: 'warning',
  Accepted: 'info',
  Applied: 'progress',
  Interview: 'attention',
  Rejected: 'danger',
  Offer: 'success',
}

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

export const CompanyBuildingIcon = styled(Building2)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const PositionText = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.foreground} 80%,
    transparent
  );
`

export const StatusBadge = styled(Badge)<StatusBadgeProps>`
  border: 1px solid
    ${({ theme, $status }) =>
      theme.colors.status[STATUS_TONE_BY_APPLICATION_STATUS[$status]].border};
  background: ${({ theme, $status }) =>
    theme.colors.status[STATUS_TONE_BY_APPLICATION_STATUS[$status]].bg};
  color: ${({ theme, $status }) =>
    theme.colors.status[STATUS_TONE_BY_APPLICATION_STATUS[$status]].fg};
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

export const DateCalendarIcon = styled(Calendar)`
  width: 0.875rem;
  height: 0.875rem;
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
      in srgb,
      ${({ theme }) => theme.colors.primary} 10%,
      transparent
    );
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const RowMoreIcon = styled(MoreHorizontal)`
  width: 1rem;
  height: 1rem;
`

export const ActionMenuItem = styled(DropdownMenuItem)`
  cursor: pointer;
`

export const ActionEyeIcon = styled(Eye)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const ActionDownloadIcon = styled(Download)`
  width: 1rem;
  height: 1rem;
`

export const DestructiveMenuItem = styled(ActionMenuItem)`
  color: ${({ theme }) => theme.colors.status.danger.fg};

  &:focus {
    color: ${({ theme }) => theme.colors.status.danger.fg};
    background: ${({ theme }) => theme.colors.status.danger.bg};
  }
`

export const ActionTrashIcon = styled(Trash2)`
  width: 1rem;
  height: 1rem;
`
