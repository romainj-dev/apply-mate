'use client'

import type { ExperienceRole } from '../data'
import {
  RoleCard,
  CardBody,
  CardStack,
  CardHeader,
  CardHeaderContent,
  BadgeRow,
  StatusBadge,
  CurrentBadge,
  RoleTitle,
  CompanyIcon,
  CompanyLine,
  MissingDetailsIcon,
  PeriodLine,
  PeriodIcon,
  TechStack,
  TechBadge,
  SummaryRow,
  SummaryText,
  MissingDetails,
} from './RoleCard.styles'

interface RolesCardProps {
  role: ExperienceRole
  isSelected: boolean
  onClick: () => void
}

export function RolesCard({ role, isSelected, onClick }: RolesCardProps) {
  const isComplete = role.status === 'complete'

  return (
    <RoleCard
      interactive={true}
      variant={isComplete ? 'primary' : 'accent'}
      selected={isSelected}
      onClick={onClick}
    >
      <CardBody>
        <CardStack>
          <CardHeader>
            <CardHeaderContent>
              <BadgeRow>
                <StatusBadge variant="secondary" $isComplete={isComplete}>
                  {isComplete ? 'Complete' : 'Incomplete'}
                </StatusBadge>
                {role.isCurrent && (
                  <CurrentBadge variant="outline">Current</CurrentBadge>
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

          {isComplete ? (
            <>
              {role.techStack && (
                <TechStack>
                  {role.techStack.slice(0, 4).map((tech) => (
                    <TechBadge key={tech} variant="secondary">
                      {tech}
                    </TechBadge>
                  ))}
                </TechStack>
              )}
              <SummaryRow>
                <SummaryText>
                  {role.projects.length} Projects ·{' '}
                  {role.keyAchievements.length} Achievements
                </SummaryText>
              </SummaryRow>
            </>
          ) : (
            <>
              <MissingDetails>
                <MissingDetailsIcon />
                {role.missingDetails}
              </MissingDetails>
              <SummaryRow>
                <SummaryText>
                  {role.projects.length} Projects · Add more info
                </SummaryText>
              </SummaryRow>
            </>
          )}
        </CardStack>
      </CardBody>
    </RoleCard>
  )
}
