'use client'

import { useState } from 'react'
import { AdventureIllustration } from './adventure-illustration'
import {
  ActionMenuItem,
  ActionsCell,
  BodyRow,
  CompanyCell,
  CompanyContent,
  CompanyIconBox,
  DateMeta,
  DestructiveMenuItem,
  EmptyDescription,
  EmptyRow,
  EmptyStateCell,
  EmptyStateContainer,
  EmptyTitle,
  FilterButton,
  FloatingLabelBottom,
  FloatingLabelTop,
  HeaderActions,
  HeaderCell,
  HeaderCellActions,
  HeaderCellCompany,
  HeaderRow,
  HeaderSection,
  HeaderSubtitle,
  HeaderText,
  HeaderTitle,
  IllustrationWrapper,
  LabelCard,
  LabelCardSecondary,
  LabelPointer,
  LabelRow,
  MenuContent,
  MenuSeparator,
  NoResultsCell,
  PositionText,
  PulseDot,
  RowActionButton,
  SearchField,
  SearchIconWrap,
  SearchInput,
  SecondaryLabelText,
  StatusBadge,
  StyledTableHeader,
  TableCard,
  TableWrap,
  TagBadge,
  TagsWrap,
} from './applications-table.styles'

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  Calendar,
  Building2,
  Briefcase,
} from 'lucide-react'

export type ApplicationStatus =
  | 'Pending'
  | 'Accepted'
  | 'Applied'
  | 'Interview'
  | 'Rejected'
  | 'Offer'

export interface Application {
  id: string
  company: string
  position: string
  status: ApplicationStatus
  dateApplied: string
  tags: string[]
}

const statusConfig: Record<ApplicationStatus, { label: string }> = {
  Pending: {
    label: 'Pending',
  },
  Accepted: {
    label: 'Accepted',
  },
  Applied: {
    label: 'Applied',
  },
  Interview: {
    label: 'Interview',
  },
  Rejected: {
    label: 'Rejected',
  },
  Offer: {
    label: 'Offer',
  },
}

export function ApplicationsTable({ items }: { items: null | Application[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>(
    'All'
  )

  const isEmpty = items === null

  return (
    <TableCard $isEmpty={isEmpty} size="none">
      <HeaderSection>
        <HeaderText>
          <HeaderTitle>
            <Briefcase size={20} color="var(--primary)" />
            Applications
          </HeaderTitle>
          <HeaderSubtitle>
            Manage and track your job applications
          </HeaderSubtitle>
        </HeaderText>

        <HeaderActions>
          <SearchField>
            <SearchIconWrap>
              <Search size={16} />
            </SearchIconWrap>
            <SearchInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isEmpty}
            />
          </SearchField>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FilterButton variant="outline" disabled={isEmpty}>
                <Filter size={16} />
                {statusFilter === 'All' ? 'Filter' : statusFilter}
              </FilterButton>
            </DropdownMenuTrigger>
            <MenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('All')}>
                All Status
              </DropdownMenuItem>
              <MenuSeparator />
              {Object.keys(statusConfig).map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status as ApplicationStatus)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </MenuContent>
          </DropdownMenu>
        </HeaderActions>
      </HeaderSection>

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
              <EmptyRow>
                <EmptyStateCell colSpan={6}>
                  <EmptyStateContainer>
                    <IllustrationWrapper>
                      <AdventureIllustration />

                      <FloatingLabelTop>
                        <LabelCard>
                          <LabelRow>
                            <PulseDot />
                            Dream Job
                          </LabelRow>
                        </LabelCard>
                      </FloatingLabelTop>

                      <FloatingLabelBottom>
                        <LabelCardSecondary>
                          <SecondaryLabelText>You are here</SecondaryLabelText>
                          <LabelPointer />
                        </LabelCardSecondary>
                      </FloatingLabelBottom>
                    </IllustrationWrapper>

                    <EmptyTitle>Ready to start your journey?</EmptyTitle>
                    <EmptyDescription>
                      Your applications dashboard is waiting for its first
                      success story. Complete your profile to unlock full
                      tracking capabilities.
                    </EmptyDescription>
                  </EmptyStateContainer>
                </EmptyStateCell>
              </EmptyRow>
            ) : items.length === 0 ? (
              <TableRow>
                <NoResultsCell colSpan={6}>
                  No applications found matching your criteria
                </NoResultsCell>
              </TableRow>
            ) : (
              items.map((app) => (
                <BodyRow key={app.id}>
                  <CompanyCell>
                    <CompanyContent>
                      <CompanyIconBox>
                        <Building2 size={16} color="var(--muted-foreground)" />
                      </CompanyIconBox>
                      {app.company}
                    </CompanyContent>
                  </CompanyCell>
                  <TableCell>
                    <PositionText>{app.position}</PositionText>
                  </TableCell>
                  <TableCell>
                    <StatusBadge variant="secondary" $status={app.status}>
                      {statusConfig[app.status].label}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <DateMeta>
                      <Calendar size={14} />
                      {new Date(app.dateApplied).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </DateMeta>
                  </TableCell>
                  <TableCell>
                    <TagsWrap>
                      {app.tags.map((tag) => (
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
                          <MoreHorizontal size={16} />
                        </RowActionButton>
                      </DropdownMenuTrigger>
                      <MenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <MenuSeparator />
                        <ActionMenuItem>
                          <Eye size={16} color="var(--primary)" />
                          View Details
                        </ActionMenuItem>
                        <ActionMenuItem>
                          <Download size={16} />
                          Documents
                        </ActionMenuItem>
                        <MenuSeparator />
                        <DestructiveMenuItem>
                          <Trash2 size={16} />
                          Delete
                        </DestructiveMenuItem>
                      </MenuContent>
                    </DropdownMenu>
                  </ActionsCell>
                </BodyRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableWrap>
    </TableCard>
  )
}
