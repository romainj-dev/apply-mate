'use client'

import { useState } from 'react'
import { Table, TableBody } from '@/components/ui/Table'
import { ApplicationRow } from './application-row/ApplicationRow'
import { ApplicationsTableEmptyState } from './empty-state/ApplicationsTableEmptyState'
import { TableHeader } from './table-header/TableHeader'
import type { Application, ApplicationStatus } from './types'
import {
  HeaderCell,
  HeaderCellActions,
  HeaderCellCompany,
  HeaderRow,
  StyledTableHeader,
  TableCard,
  TableWrap,
} from './ApplicationsTable.styles'

export type { Application, ApplicationStatus }

const STATUS_CONFIG: Record<ApplicationStatus, { label: string }> = {
  Pending: { label: 'Pending' },
  Accepted: { label: 'Accepted' },
  Applied: { label: 'Applied' },
  Interview: { label: 'Interview' },
  Rejected: { label: 'Rejected' },
  Offer: { label: 'Offer' },
}

interface ApplicationsTableProps {
  items: null | Application[]
}

export function ApplicationsTable({ items }: ApplicationsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>(
    'All'
  )

  const isEmpty = items === null

  return (
    <TableCard $isEmpty={isEmpty} size="none">
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        disabled={isEmpty}
      />

      <TableWrap>
        <Table>
          <StyledTableHeader>
            <HeaderRow>
              <HeaderCellCompany>Company</HeaderCellCompany>
              <HeaderCell>Position</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Date Applied</HeaderCell>
              <HeaderCell>Tags</HeaderCell>
              <HeaderCellActions>Actions</HeaderCellActions>
            </HeaderRow>
          </StyledTableHeader>
          <TableBody>
            {isEmpty ? (
              <ApplicationsTableEmptyState variant="empty" />
            ) : items.length === 0 ? (
              <ApplicationsTableEmptyState variant="no-results" />
            ) : (
              items.map((app) => (
                <ApplicationRow
                  key={app.id}
                  application={app}
                  statusLabel={STATUS_CONFIG[app.status].label}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableWrap>
    </TableCard>
  )
}
