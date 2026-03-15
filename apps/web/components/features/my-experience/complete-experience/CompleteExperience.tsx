'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { GetExperienceProfileDocument } from '@/graphql/generated'
import { useQuery } from '@/modules/requests/client/hooks'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { DashboardHeader } from '@/components/features/dashboard/commons/header/Header'
import { RolesList } from '@/components/features/my-experience/roles/list/RolesList'
import { RolesDetail } from '@/components/features/my-experience/roles/detail/RolesDetail'
import {
  AddIcon,
  PageContainer,
  RoleDetailSection,
  RolesHeader,
  RolesSection,
  RolesTitle,
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
        title="Professional Experience"
        subtitle="Build your tech profile by documenting roles, projects, and achievements"
      />

      <RolesSection>
        <RolesHeader>
          <RolesTitle>Your Roles</RolesTitle>
          <Button variant="outline" size="sm">
            <AddIcon />
            Add Role
          </Button>
        </RolesHeader>

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
