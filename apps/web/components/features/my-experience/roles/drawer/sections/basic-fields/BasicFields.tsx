'use client'

import { Input } from '@/components/ui/Input'
import type { RoleFormState, StringField } from '../../form-state'
import type { ValidationErrors } from '../../RoleDrawer.hook'
import {
  FieldsGrid,
  DateRow,
  DateGroup,
  DateSelects,
  DateSelect,
  CurrentCheckbox,
  FieldLabel,
  FieldError,
} from './BasicFields.styles'

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

function getYearOptions(): string[] {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  for (let y = currentYear; y >= 1970; y--) {
    years.push(String(y))
  }
  return years
}

interface BasicFieldsProps {
  state: RoleFormState
  onFieldChange: (field: StringField, value: string) => void
  onToggleCurrent: () => void
  validationErrors: ValidationErrors
  onClearFieldError: (field: 'title' | 'company') => void
}

export function BasicFields({
  state,
  onFieldChange,
  onToggleCurrent,
  validationErrors,
  onClearFieldError,
}: BasicFieldsProps) {
  const years = getYearOptions()

  return (
    <FieldsGrid>
      <div>
        <FieldLabel>Role Title</FieldLabel>
        <Input
          placeholder="e.g., Senior Full-Stack Developer"
          value={state.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          onFocus={() => onClearFieldError('title')}
          aria-invalid={!!validationErrors.title}
        />
        {validationErrors.title && (
          <FieldError>{validationErrors.title}</FieldError>
        )}
      </div>

      <div>
        <FieldLabel>
          {state.roleGroup === 'side-project'
            ? 'Project Name'
            : 'Company / Project Name'}
        </FieldLabel>
        <Input
          placeholder="e.g., TechCorp Inc."
          value={state.company}
          onChange={(e) => onFieldChange('company', e.target.value)}
          onFocus={() => onClearFieldError('company')}
          aria-invalid={!!validationErrors.company}
        />
        {validationErrors.company && (
          <FieldError>{validationErrors.company}</FieldError>
        )}
      </div>

      <DateRow>
        <DateGroup>
          <FieldLabel>Start Date</FieldLabel>
          <DateSelects>
            <DateSelect
              value={state.startMonth}
              onChange={(e) => onFieldChange('startMonth', e.target.value)}
            >
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </DateSelect>
            <DateSelect
              value={state.startYear}
              onChange={(e) => onFieldChange('startYear', e.target.value)}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </DateSelect>
          </DateSelects>
        </DateGroup>

        <DateGroup>
          <FieldLabel>End Date</FieldLabel>
          <DateSelects>
            <DateSelect
              value={state.endMonth}
              onChange={(e) => onFieldChange('endMonth', e.target.value)}
              disabled={state.isCurrent}
            >
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </DateSelect>
            <DateSelect
              value={state.endYear}
              onChange={(e) => onFieldChange('endYear', e.target.value)}
              disabled={state.isCurrent}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </DateSelect>
          </DateSelects>
          <CurrentCheckbox>
            <input
              type="checkbox"
              checked={state.isCurrent}
              onChange={onToggleCurrent}
            />
            Current
          </CurrentCheckbox>
        </DateGroup>
      </DateRow>
    </FieldsGrid>
  )
}
