'use client'

import { Button } from '@/components/ui/Button'
import { GlassCard, GlassCardHeader } from '@/components/ui/GlassCard'
import type { ExperienceRole } from '../data-types'
import { getEmploymentTypeBadge } from '../employment-type'
import { IncompleteRoleBanner } from './incomplete-role-banner/IncompleteRoleBanner'
import { RoleCompleteContent } from './role-complete-content/RoleCompleteContent'
import { Edit2, Sparkles } from 'lucide-react'
import {
  BodyText,
  ButtonGroup,
  CompanyBuildingIcon,
  CompanyName,
  ContentArea,
  EmploymentBadge,
  FlexFill,
  HeaderRow,
  PeriodCalendarIcon,
  PeriodItem,
  PeriodRow,
  RoleTitle,
  SectionTitle,
  TitleRow,
} from './RolesDetail.styles'

interface RolesDetailProps {
  role: ExperienceRole
}

export function RolesDetail({ role }: RolesDetailProps) {
  const isComplete = role.status === 'complete'
  const employmentBadge = getEmploymentTypeBadge(role.employmentType)

  return (
    <GlassCard variant={!isComplete ? 'accent' : 'default'}>
      <GlassCardHeader>
        <HeaderRow>
          <FlexFill>
            <TitleRow>
              <RoleTitle>{role.title}</RoleTitle>
              {employmentBadge && (
                <EmploymentBadge $statusKey={employmentBadge.statusKey}>
                  {employmentBadge.label}
                </EmploymentBadge>
              )}
            </TitleRow>
            <CompanyName>
              <CompanyBuildingIcon />
              {role.company}
            </CompanyName>
            <PeriodRow>
              <PeriodItem>
                <PeriodCalendarIcon />
                {role.periodLabel}
              </PeriodItem>
            </PeriodRow>
          </FlexFill>
          <ButtonGroup>
            <Button variant="accent" size="sm">
              <Sparkles />
              Polish
            </Button>
            <Button variant="outline" size="sm">
              <Edit2 />
              Edit
            </Button>
          </ButtonGroup>
        </HeaderRow>
      </GlassCardHeader>

      <ContentArea>
        {!isComplete ? <IncompleteRoleBanner /> : null}

        {/* Role summary */}
        {role.summary && (
          <div>
            <SectionTitle>Summary</SectionTitle>
            <BodyText>{role.summary}</BodyText>
          </div>
        )}

        {isComplete && <RoleCompleteContent role={role} />}
      </ContentArea>
    </GlassCard>
  )
}
