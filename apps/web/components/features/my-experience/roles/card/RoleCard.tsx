'use client'

import { Role } from '../data'
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
  role: Role
  isSelected: boolean
  onClick: () => void
}

export function RolesCard({ role, isSelected, onClick }: RolesCardProps) {
  const isComplete = role.status === 'Complete'

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
                  {role.status}
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
            {role.period} · {role.duration}
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
                  {role.projectsCount} Projects · {role.achievementsCount}{' '}
                  Achievements
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
                  {role.projectsCount} Projects · Add more info
                </SummaryText>
              </SummaryRow>
            </>
          )}
        </CardStack>
      </CardBody>
    </RoleCard>
  )
}
