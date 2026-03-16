'use client'

import { useState } from 'react'
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
import {
  PageContainer,
  RoleDetailSection,
  RolesSection,
} from './CompleteExperience.styles'

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
  const { data } = useQuery(GetExperienceProfileDocument, undefined, {
    queryKey: queryKeys.experienceProfile.get(),
  })

  const profile = data?.experienceProfile?.profile
  const roles = data?.experienceProfile?.roles ?? []

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(
    roles.length > 0 ? roles[0].id : null
  )

  const selectedRole = roles.find((r) => r.id === selectedRoleId)

  if (!profile) return null

  return (
    <PageContainer>
      <DashboardHeader
        title="Application Context"
        subtitle="Everything AI needs to help you with applications and proposals"
      />

      <AiSuggestions suggestions={SUGGESTIONS} />

      <RolesSection>
        <SectionHeader
          title="Roles & Projects"
          subtitle="Work experience and side projects AI uses for applications"
          icon={<FolderGit2 size={20} />}
          action={
            <Button variant="outline" size="sm">
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

      <RoleDetailSection>
        {selectedRole && <RolesDetail role={selectedRole} />}
      </RoleDetailSection>
    </PageContainer>
  )
}
