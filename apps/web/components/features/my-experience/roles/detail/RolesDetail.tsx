'use client'

import { Button } from '@/components/ui/Button'
import { GlassCard, GlassCardHeader } from '@/components/ui/GlassCard'
import type { ExperienceRole } from '../data-types'
import { getEmploymentTypeBadge } from '../employment-type'
import { RoleCompleteContent } from './role-complete-content/RoleCompleteContent'
import {
  Edit2,
  Sparkles,
  Building2,
  Calendar,
  Users,
  ListTree,
} from 'lucide-react'

import {
  BodyText,
  ButtonGroup,
  InfoGrid,
  ContentArea,
  EmploymentBadge,
  FlexFill,
  HeaderRow,
  RoleTitle,
  SectionTitle,
  TitleRow,
} from './RolesDetail.styles'
import { TechBadgeRow } from '../_commons/tech-badge/TechBadge'

interface RolesDetailProps {
  role: ExperienceRole
  onEditRole: (role: ExperienceRole) => void
}

export function RolesDetail({ role, onEditRole }: RolesDetailProps) {
  const {
    title,
    company,
    employmentType,
    periodLabel,
    summary,
    teamStructure,
    methodologies,
    techStack,
  } = role
  const employmentBadge = getEmploymentTypeBadge(employmentType)

  return (
    <GlassCard>
      <GlassCardHeader>
        <HeaderRow>
          <FlexFill>
            <TitleRow>
              <RoleTitle>{title}</RoleTitle>
              {employmentBadge && (
                <EmploymentBadge $statusKey={employmentBadge.statusKey}>
                  {employmentBadge.label}
                </EmploymentBadge>
              )}
            </TitleRow>
            <InfoGrid>
              <InfoGrid.Item>
                <Building2 />
                <span>{company}</span>
              </InfoGrid.Item>
              <InfoGrid.Item>
                <Calendar />
                <span>{periodLabel}</span>
              </InfoGrid.Item>

              <InfoGrid.Item>
                <Users />
                <span>{teamStructure}</span>
              </InfoGrid.Item>
              <InfoGrid.Item>
                <ListTree />
                <span>{methodologies.join(', ')}</span>
              </InfoGrid.Item>
            </InfoGrid>
          </FlexFill>
          <ButtonGroup>
            <Button variant="accent" size="sm">
              <Sparkles />
              Polish
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditRole(role)}
            >
              <Edit2 />
              Edit
            </Button>
          </ButtonGroup>
        </HeaderRow>
      </GlassCardHeader>

      <ContentArea>
        {/* Role summary */}
        {summary && (
          <div>
            <SectionTitle>Summary</SectionTitle>
            <BodyText>{summary}</BodyText>
          </div>
        )}

        {techStack.length > 0 && (
          <div>
            <SectionTitle>Tech Stack</SectionTitle>
            <TechBadgeRow techStack={techStack} />
          </div>
        )}

        <RoleCompleteContent role={role} />
      </ContentArea>
    </GlassCard>
  )
}
