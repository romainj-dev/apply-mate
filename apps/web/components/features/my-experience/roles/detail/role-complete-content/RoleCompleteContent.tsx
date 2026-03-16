'use client'

import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import type { ExperienceRole } from '@/components/features/my-experience/roles/data-types'
import { getTechLabel } from '@/components/features/my-experience/roles/tech-catalog'
import { parseTechStack } from '@/types/tech-stack'
import { KeyMetrics } from '../key-metrics/KeyMetrics'
import {
  AchievementItem,
  AchievementList,
  AddProjectIcon,
  BadgesRow,
  CheckMark,
  FlexFill,
  IconOnlyEditIcon,
  MetaCard,
  MetaCardTitle,
  MetaCardValue,
  MetaGrid,
  MetaUsersIcon,
  ProjectAchievementItem,
  ProjectAchievements,
  ProjectCardContent,
  ProjectHeader,
  ProjectsList,
  ProjectTitle,
  ProjectsHeader,
  SectionMetricsIcon,
  SectionProjectsIcon,
  SectionTargetIcon,
  SectionTitle,
  BodyText,
  TechBadge,
} from './RoleCompleteContent.styles'

interface RoleCompleteContentProps {
  role: ExperienceRole
}

export function RoleCompleteContent({ role }: RoleCompleteContentProps) {
  const keyMetrics = role.keyMetrics ?? null
  const hasMetrics = keyMetrics && keyMetrics.length > 0
  const hasTeam = !!role.teamStructure
  const hasMethodologies = role.methodologies.length > 0
  const techStack = parseTechStack(role.techStack)
  const hasTechStack = techStack.length > 0
  const hasMetaCards = hasTeam || hasMethodologies || hasTechStack
  const hasAchievements = (role.keyAchievements?.length ?? 0) > 0
  const hasProjects = (role.projects?.length ?? 0) > 0

  return (
    <>
      {/* Key Metrics */}
      {hasMetrics && (
        <div>
          <SectionTitle>
            <SectionMetricsIcon />
            Key Metrics
          </SectionTitle>
          <KeyMetrics metrics={keyMetrics} />
        </div>
      )}

      {/* Team / Methodology / Tech Stack */}
      {hasMetaCards && (
        <MetaGrid>
          {hasTeam && (
            <MetaCard>
              <MetaCardTitle>Team</MetaCardTitle>
              <MetaCardValue>
                <MetaUsersIcon />
                {role.teamStructure}
              </MetaCardValue>
            </MetaCard>
          )}
          {hasMethodologies && (
            <MetaCard>
              <MetaCardTitle>Methodology</MetaCardTitle>
              <MetaCardValue>{role.methodologies.join(', ')}</MetaCardValue>
            </MetaCard>
          )}
          {hasTechStack && (
            <MetaCard>
              <MetaCardTitle>Tech Stack</MetaCardTitle>
              <BadgesRow>
                {techStack.map((item) => (
                  <TechBadge
                    key={item.value === 'other' ? item.customLabel : item.value}
                    variant="secondary"
                  >
                    {getTechLabel(item)}
                  </TechBadge>
                ))}
              </BadgesRow>
            </MetaCard>
          )}
        </MetaGrid>
      )}

      {/* Key Achievements */}
      {hasAchievements && (
        <div>
          <SectionTitle>
            <SectionTargetIcon />
            Key Achievements
          </SectionTitle>
          <AchievementList>
            {role.keyAchievements?.map((achievement, i) => (
              <AchievementItem key={`${achievement}-${i}`}>
                <CheckMark>&#10003;</CheckMark>
                <span>{achievement}</span>
              </AchievementItem>
            ))}
          </AchievementList>
        </div>
      )}

      {/* Projects */}
      {hasProjects && (
        <div>
          <ProjectsHeader>
            <SectionTitle>
              <SectionProjectsIcon />
              Notable Projects
            </SectionTitle>
            <Button variant="ghost" size="sm">
              <AddProjectIcon />
              Add Project
            </Button>
          </ProjectsHeader>
          <ProjectsList>
            {role.projects?.map((project) => {
              const projectTech = parseTechStack(project.techStack)
              return (
                <GlassCard key={project.id} variant="primary">
                  <ProjectCardContent>
                    <ProjectHeader>
                      <FlexFill>
                        <ProjectTitle>{project.title}</ProjectTitle>
                      </FlexFill>
                      <Button variant="ghost" size="sm">
                        <IconOnlyEditIcon />
                      </Button>
                    </ProjectHeader>
                    {project.description && (
                      <BodyText>{project.description}</BodyText>
                    )}
                    {projectTech.length > 0 && (
                      <BadgesRow>
                        {projectTech.map((item) => (
                          <TechBadge
                            key={
                              item.value === 'other'
                                ? item.customLabel
                                : item.value
                            }
                            variant="secondary"
                          >
                            {getTechLabel(item)}
                          </TechBadge>
                        ))}
                      </BadgesRow>
                    )}
                    {project.achievements.length > 0 && (
                      <ProjectAchievements>
                        {project.achievements.map((achievement, j) => (
                          <ProjectAchievementItem key={`${achievement}-${j}`}>
                            <CheckMark>&#10003;</CheckMark>
                            <span>{achievement}</span>
                          </ProjectAchievementItem>
                        ))}
                      </ProjectAchievements>
                    )}
                  </ProjectCardContent>
                </GlassCard>
              )
            })}
          </ProjectsList>
        </div>
      )}
    </>
  )
}
