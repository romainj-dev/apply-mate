'use client'

import type { ExperienceRole } from '@/components/features/my-experience/roles/data-types'
import { RolesCard } from '@/components/features/my-experience/roles/card/RoleCard'
import { ScrollContainer } from './RolesList.styles'

interface RolesListProps {
  roles: ExperienceRole[]
  selectedRoleId: string | null
  onSelectRole: (id: string) => void
}

export function RolesList({
  roles,
  selectedRoleId,
  onSelectRole,
}: RolesListProps) {
  return (
    <ScrollContainer>
      {roles.map((role) => (
        <RolesCard
          key={role.id}
          role={role}
          isSelected={selectedRoleId === role.id}
          onClick={() => onSelectRole(role.id)}
        />
      ))}
    </ScrollContainer>
  )
}
