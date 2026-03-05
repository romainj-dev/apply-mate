'use client'

import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { BodyText, SectionTitle } from '../../detail.styles'
import type { Role } from '../../data'
import {
  AchievementItem,
  AchievementList,
  AddProjectIcon,
  BadgesRow,
  BulletMark,
  CheckMark,
  FlexFill,
  IconOnlyEditIcon,
  MetaText,
  ProjectAchievementItem,
  ProjectAchievements,
  ProjectCardContent,
  ProjectHeader,
  ProjectPeriod,
  ProjectsHeader,
  ProjectsList,
  ProjectTitle,
  AchievementsLabel,
  SectionCodeIcon,
  SectionProjectsIcon,
  SectionTargetIcon,
  SectionTitleFlex,
  SectionUsersIcon,
  TechBadge,
  TwoColGrid,
} from './RoleCompleteContent.styles'

interface RoleCompleteContentProps {
  role: Role
}

export function RoleCompleteContent({ role }: RoleCompleteContentProps) {
  return (
    <>
      {/* Tech Stack */}
      <div>
        <SectionTitleFlex $mb3>
          <SectionCodeIcon />
          Tech Stack
        </SectionTitleFlex>
        <BadgesRow>
          {role.techStack?.map((tech) => (
            <TechBadge key={tech} variant="secondary">
              {tech}
            </TechBadge>
          ))}
        </BadgesRow>
      </div>

      {/* Methodology & Team */}
      <TwoColGrid>
        <div>
          <SectionTitleFlex>
            <SectionTargetIcon />
            Methodology
          </SectionTitleFlex>
          <BadgesRow>
            {role.methodology?.map((method) => (
              <Badge key={method} variant="outline">
                {method}
              </Badge>
            ))}
          </BadgesRow>
        </div>
        <div>
          <SectionTitleFlex>
            <SectionUsersIcon />
            Team
          </SectionTitleFlex>
          <MetaText>{role.teamStructure}</MetaText>
        </div>
      </TwoColGrid>

      {/* Key achievements */}
      <div>
        <SectionTitle>Key Achievements</SectionTitle>
        <AchievementList>
          {role.keyAchievements?.map((achievement, i) => (
            <AchievementItem key={i}>
              <CheckMark>✓</CheckMark>
              <span>{achievement}</span>
            </AchievementItem>
          ))}
        </AchievementList>
      </div>

      {/* Projects */}
      <div>
        <ProjectsHeader>
          <SectionTitleFlex>
            <SectionProjectsIcon />
            Notable Projects
          </SectionTitleFlex>
          <Button variant="ghost" size="sm">
            <AddProjectIcon />
            Add Project
          </Button>
        </ProjectsHeader>
        <ProjectsList>
          {role.projects?.map((project, i) => (
            <GlassCard key={i} variant="primary">
              <ProjectCardContent>
                <ProjectHeader>
                  <FlexFill>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectPeriod>{project.period}</ProjectPeriod>
                  </FlexFill>
                  <Button variant="ghost" size="sm">
                    <IconOnlyEditIcon />
                  </Button>
                </ProjectHeader>
                <BodyText>{project.description}</BodyText>
                <div>
                  <AchievementsLabel>Achievements</AchievementsLabel>
                  <ProjectAchievements>
                    {project.achievements.map((achievement, j) => (
                      <ProjectAchievementItem key={j}>
                        <BulletMark>•</BulletMark>
                        <span>{achievement}</span>
                      </ProjectAchievementItem>
                    ))}
                  </ProjectAchievements>
                </div>
              </ProjectCardContent>
            </GlassCard>
          ))}
        </ProjectsList>
      </div>
    </>
  )
}
