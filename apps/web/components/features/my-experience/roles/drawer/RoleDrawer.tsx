'use client'

import { X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import type { ExperienceRole } from '../data-types'
import { useRoleForm } from './RoleDrawer.hook'
import {
  Form,
  FormBody,
  SaveErrorBanner,
  SaveErrorIcon,
  SectionDivider,
} from './RoleDrawer.styles'
import { TypeToggle } from './sections/type-toggle/TypeToggle'
import { BasicFields } from './sections/basic-fields/BasicFields'
import { SummarySection } from './sections/summary-section/SummarySection'
import { TeamSection } from './sections/team-section/TeamSection'
import { TechStackInput } from './sections/tech-stack-input/TechStackInput'
import { KeyMetricsSection } from './sections/key-metrics-section/KeyMetricsSection'
import { AchievementsSection } from './sections/achievements-section/AchievementsSection'
import { ProjectsSection } from './sections/projects-section/ProjectsSection'
import { DrawerFooter } from './sections/drawer-footer/DrawerFooter'

interface RoleDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role?: ExperienceRole
}

export function RoleDrawer({ open, onOpenChange, role }: RoleDrawerProps) {
  const {
    state,
    dispatch,
    handleSubmit,
    isPending,
    isEditMode,
    fieldErrors,
    serverError,
  } = useRoleForm({
    role,
    onClose: () => onOpenChange(false),
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" size="md">
        <SheetHeader>
          <SheetTitle>{isEditMode ? 'Edit Role' : 'Add New Role'}</SheetTitle>
          <SheetDescription className="sr-only">
            {isEditMode
              ? 'Edit an existing role'
              : 'Add a new role to your experience'}
          </SheetDescription>
          <SheetClose asChild>
            <Button variant="ghost" size="icon-sm">
              <X />
            </Button>
          </SheetClose>
        </SheetHeader>

        <Form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <FormBody>
            {serverError && (
              <SaveErrorBanner>
                <SaveErrorIcon />
                <span>{serverError}</span>
              </SaveErrorBanner>
            )}

            <TypeToggle
              roleGroup={state.roleGroup}
              onChangeGroup={(group) =>
                dispatch({ type: 'SET_ROLE_GROUP', group })
              }
            />

            <BasicFields
              state={state}
              onFieldChange={(field, value) =>
                dispatch({ type: 'SET_FIELD', field, value })
              }
              onToggleCurrent={() => dispatch({ type: 'TOGGLE_CURRENT' })}
              fieldErrors={fieldErrors}
            />

            <SectionDivider />

            <SummarySection
              summary={state.summary}
              onChange={(value) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'summary',
                  value,
                })
              }
            />

            <TeamSection
              state={state}
              onFieldChange={(field, value) =>
                dispatch({ type: 'SET_FIELD', field, value })
              }
            />

            <SectionDivider />

            <TechStackInput
              techStack={state.techStack}
              onAdd={(item) => dispatch({ type: 'ADD_TECH', item })}
              onRemove={(index) => dispatch({ type: 'REMOVE_TECH', index })}
            />

            <SectionDivider />

            <KeyMetricsSection
              metrics={state.keyMetrics}
              onAdd={() => dispatch({ type: 'ADD_METRIC' })}
              onRemove={(index) => dispatch({ type: 'REMOVE_METRIC', index })}
              onUpdate={(index, field, value) =>
                dispatch({ type: 'UPDATE_METRIC', index, field, value })
              }
            />

            <SectionDivider />

            <AchievementsSection
              achievements={state.keyAchievements}
              onAdd={() => dispatch({ type: 'ADD_ACHIEVEMENT' })}
              onRemove={(index) =>
                dispatch({ type: 'REMOVE_ACHIEVEMENT', index })
              }
              onUpdate={(index, text) =>
                dispatch({ type: 'UPDATE_ACHIEVEMENT', index, text })
              }
              onPaste={(index, text) => {
                dispatch({ type: 'REMOVE_ACHIEVEMENT', index })
                dispatch({ type: 'PASTE_ACHIEVEMENTS', text })
              }}
            />

            <SectionDivider />

            <ProjectsSection
              projects={state.projects}
              onAdd={() => dispatch({ type: 'ADD_PROJECT' })}
              onRemove={(index) => dispatch({ type: 'REMOVE_PROJECT', index })}
              onUpdateField={(index, field, value) =>
                dispatch({ type: 'UPDATE_PROJECT', index, field, value })
              }
              onAddTech={(projectIndex, item) =>
                dispatch({ type: 'ADD_PROJECT_TECH', projectIndex, item })
              }
              onRemoveTech={(projectIndex, techIndex) =>
                dispatch({
                  type: 'REMOVE_PROJECT_TECH',
                  projectIndex,
                  techIndex,
                })
              }
            />
          </FormBody>

          <DrawerFooter isPending={isPending} />
        </Form>
      </SheetContent>
    </Sheet>
  )
}
