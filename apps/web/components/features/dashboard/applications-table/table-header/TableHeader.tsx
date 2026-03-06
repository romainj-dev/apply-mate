'use client'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import {
  FilterButton,
  FilterIcon,
  HeaderActions,
  HeaderBriefcaseIcon,
  HeaderSection,
  HeaderSubtitle,
  HeaderText,
  HeaderTitle,
  SearchField,
  SearchIcon,
  SearchIconWrap,
  SearchInput,
} from './TableHeader.styles'
import { TableMenuContent } from '../../commons/table-menu-content/TableMenuContent'
import { TableMenuSeparator } from '../../commons/table-menu-separator/TableMenuSeparator'

export type ApplicationStatus =
  | 'Pending'
  | 'Accepted'
  | 'Applied'
  | 'Interview'
  | 'Rejected'
  | 'Offer'

const STATUS_CONFIG: Record<ApplicationStatus, { label: string }> = {
  Pending: { label: 'Pending' },
  Accepted: { label: 'Accepted' },
  Applied: { label: 'Applied' },
  Interview: { label: 'Interview' },
  Rejected: { label: 'Rejected' },
  Offer: { label: 'Offer' },
}

export interface TableHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: ApplicationStatus | 'All'
  onStatusFilterChange: (status: ApplicationStatus | 'All') => void
  disabled: boolean
}

export function TableHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  disabled,
}: TableHeaderProps) {
  return (
    <HeaderSection>
      <HeaderText>
        <HeaderTitle>
          <HeaderBriefcaseIcon />
          Applications
        </HeaderTitle>
        <HeaderSubtitle>Manage and track your job applications</HeaderSubtitle>
      </HeaderText>

      <HeaderActions>
        <SearchField>
          <SearchIconWrap>
            <SearchIcon />
          </SearchIconWrap>
          <SearchInput
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={disabled}
          />
        </SearchField>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <FilterButton variant="outline" disabled={disabled}>
              <FilterIcon />
              {statusFilter === 'All' ? 'Filter' : statusFilter}
            </FilterButton>
          </DropdownMenuTrigger>
          <TableMenuContent align="end">
            <DropdownMenuItem onClick={() => onStatusFilterChange('All')}>
              All Status
            </DropdownMenuItem>
            <TableMenuSeparator />
            {(Object.keys(STATUS_CONFIG) as ApplicationStatus[]).map(
              (status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => onStatusFilterChange(status)}
                >
                  {status}
                </DropdownMenuItem>
              )
            )}
          </TableMenuContent>
        </DropdownMenu>
      </HeaderActions>
    </HeaderSection>
  )
}
