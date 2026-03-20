'use client'

import { useEffect, useState } from 'react'
import { CircleHelp, FolderGit2, Lightbulb, Plus, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GetExperienceProfileDocument } from '@/graphql/generated'
import { useQuery } from '@/modules/requests/client/hooks'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { DashboardHeader } from '@/components/features/dashboard/commons/header/Header'
import { SectionHeader } from '@/components/commons/section-header/SectionHeader'
import {
  AiSuggestions,
  type AiSuggestion,
} from '@/components/features/my-experience/ai-suggestions/AiSuggestions'
import { RolesList } from '@/components/features/my-experience/roles/list/RolesList'
import { RolesDetail } from '@/components/features/my-experience/roles/detail/RolesDetail'
import { RoleDrawer } from '@/components/features/my-experience/roles/drawer/RoleDrawer'
import { ProjectDrawer } from '@/components/features/my-experience/roles/drawer/ProjectDrawer'
import type {
  ExperienceRole,
  ExperienceRoleProject,
} from '@/components/features/my-experience/roles/data-types'
import { useDashboardLayout } from '@/components/layout/dashboard-layout/DashboardLayout'
import {
  PageContainer,
  RoleDetailSection,
  RolesSection,
} from './CompleteExperience.styles'

const PAGE_SECTIONS = [
  { id: 'roles-projects', label: 'Roles & Projects' },
  { id: 'role-detail', label: 'Role Detail' },
]

const SUGGESTIONS: AiSuggestion[] = [
  {
    id: 'leadership',
    icon: Lightbulb,
    title: 'Add a leadership example',
    description:
      'Many tech roles ask about leadership. Consider adding a specific example of when you led a team or initiative.',
    actionLabel: 'Add via chat',
  },
  {
    id: 'quantify-impact',
    icon: Zap,
    title: 'Quantify your StartupHub impact',
    description:
      "Your StartupHub role mentions 'fast-paced' but lacks metrics. Adding numbers makes it more compelling.",
    actionLabel: 'Polish with AI',
  },
  {
    id: 'common-question',
    icon: CircleHelp,
    title: 'Common question not covered',
    description:
      '"Why are you looking to leave your current role?" – prepare an answer for this frequently asked question.',
    actionLabel: 'Answer now',
  },
]

export function CompleteExperience() {
  const { registerSections } = useDashboardLayout()
  useEffect(() => registerSections(PAGE_SECTIONS), [registerSections])

  const { data } = useQuery(GetExperienceProfileDocument, undefined, {
    queryKey: queryKeys.experienceProfile.get(),
  })

  const profile = data?.experienceProfile?.profile
  const roles = data?.experienceProfile?.roles ?? []

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(
    roles.length > 0 ? roles[0].id : null
  )
  const [drawerRole, setDrawerRole] = useState<ExperienceRole | 'new' | null>(
    null
  )
  const [drawerProject, setDrawerProject] = useState<{
    roleId: string
    project?: ExperienceRoleProject
  } | null>(null)

  const selectedRole = roles.find((r) => r.id === selectedRoleId)

  function onRoleDeleted() {
    setSelectedRoleId(roles[0]?.id ?? null)
  }

  if (!profile) return null

  return (
    <PageContainer>
      <DashboardHeader
        title="Application Context"
        subtitle="Everything AI needs to help you with applications and proposals"
      />

      <AiSuggestions suggestions={SUGGESTIONS} />

      <RolesSection id="roles-projects">
        <SectionHeader
          title="Roles & Projects"
          subtitle="Work experience and side projects AI uses for applications"
          icon={<FolderGit2 size={20} />}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDrawerRole('new')}
            >
              <Plus />
              Add Role
            </Button>
          }
        />

        <RolesList
          roles={roles}
          selectedRoleId={selectedRoleId}
          onSelectRole={setSelectedRoleId}
        />
      </RolesSection>

      <RoleDetailSection id="role-detail">
        {selectedRole && (
          <RolesDetail
            role={selectedRole}
            onEditRole={(role) => setDrawerRole(role)}
            onAddProject={(roleId) => setDrawerProject({ roleId })}
            onEditProject={(roleId, project) =>
              setDrawerProject({ roleId, project })
            }
          />
        )}
      </RoleDetailSection>

      <RoleDrawer
        open={drawerRole !== null}
        onOpenChange={(open) => {
          if (!open) setDrawerRole(null)
        }}
        role={
          drawerRole !== 'new' && drawerRole !== null ? drawerRole : undefined
        }
        onDeleted={onRoleDeleted}
      />

      {drawerProject && (
        <ProjectDrawer
          open
          onOpenChange={(open) => {
            if (!open) setDrawerProject(null)
          }}
          roleId={drawerProject.roleId}
          project={drawerProject.project}
        />
      )}
    </PageContainer>
  )
}
