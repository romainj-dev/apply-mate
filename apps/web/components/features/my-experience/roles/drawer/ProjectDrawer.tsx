'use client'

import { Save, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import type { ExperienceRoleProject } from '../data-types'
import { useProjectForm } from './ProjectDrawer.hook'
import {
  Form,
  FormBody,
  SectionLabel,
  SectionDivider,
  SaveErrorBanner,
  SaveErrorIcon,
} from './RoleDrawer.styles'
import { TechStackInput } from './sections/tech-stack-input/TechStackInput'
import { AchievementsSection } from './sections/achievements-section/AchievementsSection'
import {
  Footer,
  SaveButton,
} from './sections/drawer-footer/DrawerFooter.styles'

interface ProjectDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleId: string
  project?: ExperienceRoleProject
}

export function ProjectDrawer({
  open,
  onOpenChange,
  roleId,
  project,
}: ProjectDrawerProps) {
  const {
    state,
    dispatch,
    handleSubmit,
    isPending,
    isEditMode,
    fieldErrors,
    serverError,
  } = useProjectForm({
    roleId,
    project,
    onClose: () => onOpenChange(false),
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" size="md">
        <SheetHeader>
          <SheetTitle>
            {isEditMode ? 'Edit Project' : 'Add New Project'}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {isEditMode
              ? 'Edit an existing project'
              : 'Add a new project to this role'}
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

            <div>
              <SectionLabel>Project Title</SectionLabel>
              <Input
                placeholder="Project title"
                value={state.title}
                onChange={(e) =>
                  dispatch({ type: 'SET_TITLE', value: e.target.value })
                }
              />
              {fieldErrors?.title && (
                <span
                  style={{ color: 'var(--destructive)', fontSize: '0.75rem' }}
                >
                  {fieldErrors.title[0]}
                </span>
              )}
            </div>

            <div>
              <SectionLabel>Description</SectionLabel>
              <Textarea
                placeholder="Describe the project..."
                value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_DESCRIPTION',
                    value: e.target.value,
                  })
                }
                rows={4}
              />
            </div>

            <SectionDivider />

            <TechStackInput
              techStack={state.techStack}
              onAdd={(item) => dispatch({ type: 'ADD_TECH', item })}
              onRemove={(index) => dispatch({ type: 'REMOVE_TECH', index })}
            />

            <SectionDivider />

            <AchievementsSection
              label="Key Achievements"
              achievements={state.achievements}
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
          </FormBody>

          <Footer>
            <SaveButton>
              <Button
                type="submit"
                variant="accent"
                style={{ width: '100%' }}
                disabled={isPending}
              >
                <Save />
                {isPending ? 'Saving...' : 'Save Project'}
              </Button>
            </SaveButton>
          </Footer>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
