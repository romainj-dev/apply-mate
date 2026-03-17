'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import type { TechStackItem } from '@/types/tech-stack'
import type { ProjectFormState } from '../../form-state'
import { TechStackInput } from '../tech-stack-input/TechStackInput'
import {
  Container,
  HeaderRow,
  SectionLabel,
  ProjectCard,
  ProjectHeader,
  ProjectTitleInput,
  RemoveButton,
  FieldLabel,
} from './ProjectsSection.styles'

interface ProjectsSectionProps {
  projects: ProjectFormState[]
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdateField: (
    index: number,
    field: 'title' | 'description',
    value: string
  ) => void
  onAddTech: (projectIndex: number, item: TechStackItem) => void
  onRemoveTech: (projectIndex: number, techIndex: number) => void
}

export function ProjectsSection({
  projects,
  onAdd,
  onRemove,
  onUpdateField,
  onAddTech,
  onRemoveTech,
}: ProjectsSectionProps) {
  return (
    <Container>
      <HeaderRow>
        <SectionLabel>Notable Projects</SectionLabel>
        <Button variant="ghost" size="sm" type="button" onClick={onAdd}>
          <Plus size={14} />
          Add Project
        </Button>
      </HeaderRow>

      {projects.map((project, index) => (
        <ProjectCard key={project.localId}>
          <ProjectHeader>
            <ProjectTitleInput>
              <Input
                placeholder="Project title"
                value={project.title}
                onChange={(e) => onUpdateField(index, 'title', e.target.value)}
              />
            </ProjectTitleInput>
            <RemoveButton
              type="button"
              onClick={() => onRemove(index)}
              aria-label="Remove project"
            >
              <Trash2 size={16} />
            </RemoveButton>
          </ProjectHeader>

          <div>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              placeholder="Describe the project..."
              value={project.description}
              onChange={(e) =>
                onUpdateField(index, 'description', e.target.value)
              }
              rows={3}
            />
          </div>

          <TechStackInput
            label="Tech Stack"
            techStack={project.techStack}
            onAdd={(item) => onAddTech(index, item)}
            onRemove={(techIndex) => onRemoveTech(index, techIndex)}
          />
        </ProjectCard>
      ))}
    </Container>
  )
}
