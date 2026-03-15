'use client'

import { Button } from '@/components/ui/Button'
import { GlassCard, GlassCardHeader } from '@/components/ui/GlassCard'
import type { ExperienceRole } from '../data'
import { IncompleteRoleBanner } from './incomplete-role-banner/IncompleteRoleBanner'
import { RoleCompleteContent } from './role-complete-content/RoleCompleteContent'
import {
  BodyText,
  CompanyName,
  ContentArea,
  FlexFill,
  HeaderEditIcon,
  HeaderRow,
  PeriodCalendarIcon,
  PeriodItem,
  PeriodRow,
  RoleTitle,
  SectionTitle,
} from './RolesDetail.styles'

interface RolesDetailProps {
  role: ExperienceRole
}

export function RolesDetail({ role }: RolesDetailProps) {
  const isComplete = role.status === 'complete'

  return (
    <GlassCard variant={!isComplete ? 'accent' : 'default'}>
      <GlassCardHeader>
        <HeaderRow>
          <FlexFill>
            <RoleTitle>{role.title}</RoleTitle>
            <CompanyName>{role.company}</CompanyName>
            <PeriodRow>
              <PeriodItem>
                <PeriodCalendarIcon />
                {role.periodLabel} · {role.durationLabel}
              </PeriodItem>
            </PeriodRow>
          </FlexFill>
          <Button variant="ghost" size="sm">
            <HeaderEditIcon />
          </Button>
        </HeaderRow>
      </GlassCardHeader>

      <ContentArea>
        {!isComplete ? <IncompleteRoleBanner /> : null}

        {/* Role summary */}
        <div>
          <SectionTitle>Role Summary</SectionTitle>
          <BodyText>{role.summary}</BodyText>
        </div>

        {isComplete && <RoleCompleteContent role={role} />}
      </ContentArea>
    </GlassCard>
  )
}
