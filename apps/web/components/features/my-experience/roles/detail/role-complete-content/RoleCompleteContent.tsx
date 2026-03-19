'use client'

import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import type {
  ExperienceRole,
  ExperienceRoleProject,
} from '@/components/features/my-experience/roles/data-types'
import { TechBadgeRow } from '@/components/features/my-experience/roles/_commons/tech-badge/TechBadge'
import { KeyMetrics } from '../key-metrics/KeyMetrics'
import {
  AchievementItem,
  AchievementList,
  AddProjectIcon,
  CheckMark,
  FlexFill,
  IconOnlyEditIcon,
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
  ProjectText,
} from './RoleCompleteContent.styles'

interface RoleCompleteContentProps {
  role: ExperienceRole
  onAddProject: () => void
  onEditProject: (project: ExperienceRoleProject) => void
}

export function RoleCompleteContent({
  role,
  onAddProject,
  onEditProject,
}: RoleCompleteContentProps) {
  const keyMetrics = role.keyMetrics ?? null
  const hasMetrics = keyMetrics && keyMetrics.length > 0
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
            <Button variant="ghost" size="sm" onClick={onAddProject}>
              <AddProjectIcon />
              Add Project
            </Button>
          </ProjectsHeader>
          <ProjectsList>
            {role.projects?.map((project) => (
              <GlassCard key={project.id}>
                <ProjectCardContent>
                  <ProjectHeader>
                    <FlexFill>
                      <ProjectTitle>{project.title}</ProjectTitle>
                    </FlexFill>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditProject(project)}
                    >
                      <IconOnlyEditIcon />
                      Edit
                    </Button>
                  </ProjectHeader>
                  {project.description && (
                    <ProjectText>{project.description}</ProjectText>
                  )}
                  {project.techStack.length > 0 && (
                    <TechBadgeRow techStack={project.techStack} />
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
            ))}
          </ProjectsList>
        </div>
      )}
    </>
  )
}
