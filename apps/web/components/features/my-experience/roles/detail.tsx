'use client'

import {
  Calendar,
  Edit2,
  Code2,
  Target,
  Users,
  FolderGit2,
  Plus,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard, GlassCardHeader } from '@/components/ui/glass-card'
import { Role } from './data'
import {
  AchievementItem,
  AchievementList,
  AchievementsLabel,
  BadgesRow,
  BodyText,
  BulletMark,
  ButtonRow,
  CheckMark,
  CompanyName,
  ContentArea,
  FlexFill,
  HeaderRow,
  IncompleteWarning,
  MetaText,
  PeriodItem,
  PeriodRow,
  ProjectAchievementItem,
  ProjectAchievements,
  ProjectCardContent,
  ProjectHeader,
  ProjectPeriod,
  ProjectsList,
  ProjectTitle,
  ProjectsHeader,
  RoleTitle,
  SectionTitle,
  SectionTitleFlex,
  TechBadge,
  TwoColGrid,
  WarningRow,
  WarningText,
  WarningTitle,
} from './detail.styles'
import { Badge } from '@/components/ui/badge'

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
                <Calendar size={16} color="var(--primary)" />
                {role.period} · {role.duration}
              </PeriodItem>
            </PeriodRow>
          </FlexFill>
          <Button variant="ghost" size="sm">
            <Edit2 size={16} />
          </Button>
        </HeaderRow>
      </GlassCardHeader>

      <ContentArea>
        {!isComplete ? (
          <IncompleteWarning>
            <WarningRow>
              <AlertCircle
                size={20}
                style={{
                  color: '#ea580c',
                  flexShrink: 0,
                  marginTop: '0.125rem',
                }}
              />
              <FlexFill>
                <WarningTitle>This role needs more details</WarningTitle>
                <WarningText>
                  Add projects, tech stack, and achievements to strengthen your
                  profile
                </WarningText>
              </FlexFill>
            </WarningRow>
            <ButtonRow>
              <Button variant="outline" size="sm">
                <Edit2 size={12} style={{ marginRight: '0.25rem' }} />
                Edit
              </Button>
            </ButtonRow>
          </IncompleteWarning>
        ) : null}

        {/* Role summary */}
        <div>
          <SectionTitle>Role Summary</SectionTitle>
          <BodyText>{role.summary}</BodyText>
        </div>

        {isComplete && (
          <>
            {/* Tech Stack */}
            <div>
              <SectionTitleFlex $mb3>
                <Code2 size={16} color="var(--primary)" />
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
                  <Target size={16} color="var(--muted-foreground)" />
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
                  <Users size={16} color="var(--muted-foreground)" />
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
                  <FolderGit2 size={16} color="var(--primary)" />
                  Notable Projects
                </SectionTitleFlex>
                <Button variant="ghost" size="sm">
                  <Plus size={12} style={{ marginRight: '0.25rem' }} />
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
                          <Edit2 size={12} />
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
        )}
      </ContentArea>
    </GlassCard>
  )
}
