'use client'

import { Role } from '../data'
import { RolesCard } from '../card/RoleCard'
import {
  ScrollContainer,
  AddRoleCard,
  AddCardBody,
  AddContent,
  AddIconCircle,
  AddRolePlusIcon,
  AddLabel,
  AddSubLabel,
} from './RolesList.styles'

interface RolesListProps {
  roles: Role[]
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

      {/* Add new role card */}
      <AddRoleCard
        interactive={true}
        variant="dashed"
        onClick={() => {
          // Logic to add new role
        }}
      >
        <AddCardBody>
          <AddContent>
            <AddIconCircle>
              <AddRolePlusIcon />
            </AddIconCircle>
            <AddLabel>Add New Role</AddLabel>
            <AddSubLabel>Document another position</AddSubLabel>
          </AddContent>
        </AddCardBody>
      </AddRoleCard>
    </ScrollContainer>
  )
}
