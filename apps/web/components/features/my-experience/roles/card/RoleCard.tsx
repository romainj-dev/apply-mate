'use client'

import type { ExperienceRole } from '../data-types'
import { getEmploymentTypeBadge } from '../employment-type'
import {
  RoleCard,
  CardBody,
  CardStack,
  CardHeader,
  CardHeaderContent,
  BadgeRow,
  EmploymentTypeBadge,
  CurrentBadge,
  RoleTitle,
  CompanyIcon,
  CompanyLine,
  PeriodLine,
  PeriodIcon,
  TechStack,
  TechBadge,
  TechOverflow,
  SummaryRow,
  SummaryText,
} from './RoleCard.styles'

const MAX_VISIBLE_TECH = 2

interface RolesCardProps {
  role: ExperienceRole
  isSelected: boolean
  onClick: () => void
}

export function RolesCard({ role, isSelected, onClick }: RolesCardProps) {
  const employmentBadge = getEmploymentTypeBadge(role.employmentType)
  const visibleTech = role.techStack?.slice(0, MAX_VISIBLE_TECH) ?? []
  const overflowCount = Math.max(
    0,
    (role.techStack?.length ?? 0) - MAX_VISIBLE_TECH
  )

  return (
    <RoleCard
      interactive={true}
      variant="default"
      selected={isSelected}
      onClick={onClick}
    >
      <CardBody>
        <CardStack>
          <CardHeader>
            <CardHeaderContent>
              <BadgeRow>
                {role.isCurrent && (
                  <CurrentBadge variant="outline">Current</CurrentBadge>
                )}
                {employmentBadge && (
                  <EmploymentTypeBadge
                    variant="outline"
                    $statusKey={employmentBadge.statusKey}
                  >
                    {employmentBadge.label}
                  </EmploymentTypeBadge>
                )}
              </BadgeRow>
              <RoleTitle>{role.title}</RoleTitle>
              <CompanyLine>
                <CompanyIcon />
                {role.company}
              </CompanyLine>
            </CardHeaderContent>
          </CardHeader>

          <PeriodLine>
            <PeriodIcon />
            {role.periodLabel} · {role.durationLabel}
          </PeriodLine>

          {visibleTech.length > 0 && (
            <TechStack>
              {visibleTech.map((tech) => (
                <TechBadge key={tech} variant="secondary">
                  {tech}
                </TechBadge>
              ))}
              {overflowCount > 0 && (
                <TechOverflow>+{overflowCount}</TechOverflow>
              )}
            </TechStack>
          )}

          <SummaryRow>
            <SummaryText>
              {role.projects.length} Projects · {role.keyAchievements.length}{' '}
              Achievements
            </SummaryText>
          </SummaryRow>
        </CardStack>
      </CardBody>
    </RoleCard>
  )
}
