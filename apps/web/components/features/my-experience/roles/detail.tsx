'use client'

import { Button } from '@/components/ui/button'
import { GlassCard, GlassCardHeader } from '@/components/ui/glass-card'
import { Role } from './data'
import { IncompleteRoleBanner } from './detail/incomplete-role-banner/IncompleteRoleBanner'
import { RoleCompleteContent } from './detail/role-complete-content/RoleCompleteContent'
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
} from './detail.styles'

interface RolesDetailProps {
  role: Role
}

export function RolesDetail({ role }: RolesDetailProps) {
  const isComplete = role.status === 'Complete'

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
                {role.period} · {role.duration}
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
