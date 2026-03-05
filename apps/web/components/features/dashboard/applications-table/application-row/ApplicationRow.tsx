'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { TableCell } from '@/components/ui/table'
import type { Application } from '../types'
import { MenuContent, MenuSeparator } from '../ApplicationsTable.styles'
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
          <MenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <MenuSeparator />
            <ActionMenuItem>
              <ActionEyeIcon />
              View Details
            </ActionMenuItem>
            <ActionMenuItem>
              <ActionDownloadIcon />
              Documents
            </ActionMenuItem>
            <MenuSeparator />
            <DestructiveMenuItem>
              <ActionTrashIcon />
              Delete
            </DestructiveMenuItem>
          </MenuContent>
        </DropdownMenu>
      </ActionsCell>
    </BodyRow>
  )
}
