'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { GetExperienceProfileDocument } from '@/graphql/generated'
import { useQuery } from '@/modules/requests/client/hooks'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { DashboardHeader } from '@/components/features/dashboard/commons/header'
import { ProgressCard } from '@/components/features/my-experience/progress-card'
import { TechnicalSkills } from '@/components/features/my-experience/technical-skills/TechnicalSkills'
import { ROLES } from '@/components/features/my-experience/roles/data'
import { RolesList } from '@/components/features/my-experience/roles/list'
import { RolesDetail } from '@/components/features/my-experience/roles/detail'
import {
  AddIcon,
  PageContainer,
  RoleDetailSection,
  RolesHeader,
  RolesSection,
  RolesTitle,
} from './page.styles'

export default function ProfileOngoingPage() {
  useQuery(GetExperienceProfileDocument, undefined, {
    queryKey: queryKeys.experienceProfile.get(),
  })

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>('role1')

  const selectedRole = ROLES.find((r) => r.id === selectedRoleId)

  return (
    <PageContainer>
      <DashboardHeader
        title="Professional Experience"
        subtitle="Build your tech profile by documenting roles, projects, and achievements"
      />

      {/* Progress card */}
      <ProgressCard />

      {/* Technical skills */}
      <TechnicalSkills />

      <RolesSection>
        <RolesHeader>
          <RolesTitle>Your Roles</RolesTitle>
          <Button variant="outline" size="sm">
            <AddIcon />
            Add Role
          </Button>
        </RolesHeader>

        <RolesList
          roles={ROLES}
          selectedRoleId={selectedRoleId}
          onSelectRole={setSelectedRoleId}
        />
      </RolesSection>

      {/* Right: Selected role details */}
      <RoleDetailSection>
        {selectedRole && <RolesDetail role={selectedRole} />}
      </RoleDetailSection>
    </PageContainer>
  )
}
