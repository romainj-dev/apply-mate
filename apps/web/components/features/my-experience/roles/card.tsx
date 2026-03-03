'use client'

import { Building2, Calendar, AlertCircle } from 'lucide-react'
import { Role } from './data'
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
  CompanyLine,
  PeriodLine,
  TechStack,
  TechBadge,
  SummaryRow,
  SummaryText,
  MissingDetails,
} from './card.styles'

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
                <Building2 size={14} />
                {role.company}
              </CompanyLine>
            </CardHeaderContent>
          </CardHeader>
          <PeriodLine>
            <Calendar size={14} />
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
                <AlertCircle size={14} />
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
