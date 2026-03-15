'use client'

import { useState } from 'react'
import { FolderGit2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GetExperienceProfileDocument } from '@/graphql/generated'
import { useQuery } from '@/modules/requests/client/hooks'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { DashboardHeader } from '@/components/features/dashboard/commons/header/Header'
import { SectionHeader } from '@/components/commons/section-header/SectionHeader'
import { RolesList } from '@/components/features/my-experience/roles/list/RolesList'
import { RolesDetail } from '@/components/features/my-experience/roles/detail/RolesDetail'
import {
  PageContainer,
  RoleDetailSection,
  RolesSection,
} from './CompleteExperience.styles'

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

      <RolesSection>
        <SectionHeader
          title="Roles & Projects"
          subtitle="Work experience and side projects AI uses for applications"
          icon={<FolderGit2 size={20} />}
          action={
            <Button variant="outline" size="sm">
              <Plus size={16} />
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
