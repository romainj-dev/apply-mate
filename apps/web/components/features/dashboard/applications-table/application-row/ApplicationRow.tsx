'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/DropdownMenu'
import { TableCell } from '@/components/ui/Table'
import { TableMenuContent } from '../../commons/table-menu-content/TableMenuContent'
import { TableMenuSeparator } from '../../commons/table-menu-separator/TableMenuSeparator'
import type { Application } from '../types'
import {
  ActionDownloadIcon,
  ActionEyeIcon,
  ActionTrashIcon,
  ActionsCell,
  BodyRow,
  CompanyBuildingIcon,
  CompanyCell,
  CompanyContent,
  CompanyIconBox,
  DateCalendarIcon,
  DateMeta,
  DestructiveMenuItem,
  ActionMenuItem,
  PositionText,
  RowActionButton,
  RowMoreIcon,
  StatusBadge,
  TagBadge,
  TagsWrap,
} from './ApplicationRow.styles'

export interface ApplicationRowProps {
  application: Application
  statusLabel: string
}

export function ApplicationRow({
  application,
  statusLabel,
}: ApplicationRowProps) {
  return (
    <BodyRow>
      <CompanyCell>
        <CompanyContent>
          <CompanyIconBox>
            <CompanyBuildingIcon />
          </CompanyIconBox>
          {application.company}
        </CompanyContent>
      </CompanyCell>
      <TableCell>
        <PositionText>{application.position}</PositionText>
      </TableCell>
      <TableCell>
        <StatusBadge variant="secondary" $status={application.status}>
          {statusLabel}
        </StatusBadge>
      </TableCell>
      <TableCell>
        <DateMeta>
          <DateCalendarIcon />
          {new Date(application.dateApplied).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </DateMeta>
      </TableCell>
      <TableCell>
        <TagsWrap>
          {application.tags.map((tag) => (
            <TagBadge key={tag} variant="outline">
              {tag}
            </TagBadge>
          ))}
        </TagsWrap>
      </TableCell>
      <ActionsCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <RowActionButton variant="ghost" size="sm">
              <RowMoreIcon />
            </RowActionButton>
          </DropdownMenuTrigger>
          <TableMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <TableMenuSeparator />
            <ActionMenuItem>
              <ActionEyeIcon />
              View Details
            </ActionMenuItem>
            <ActionMenuItem>
              <ActionDownloadIcon />
              Documents
            </ActionMenuItem>
            <TableMenuSeparator />
            <DestructiveMenuItem>
              <ActionTrashIcon />
              Delete
            </DestructiveMenuItem>
          </TableMenuContent>
        </DropdownMenu>
      </ActionsCell>
    </BodyRow>
  )
}
