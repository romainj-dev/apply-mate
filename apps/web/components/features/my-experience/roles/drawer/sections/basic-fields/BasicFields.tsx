'use client'

import { Input } from '@/components/ui/Input'
import type { RoleFormState, StringField } from '../../form-state'
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
  fieldErrors: Record<string, string[]> | null
}

export function BasicFields({
  state,
  onFieldChange,
  onToggleCurrent,
  fieldErrors,
}: BasicFieldsProps) {
  const years = getYearOptions()
  const titleError = fieldErrors?.['title']?.[0]
  const companyError = fieldErrors?.['company']?.[0]

  return (
    <FieldsGrid>
      <div>
        <FieldLabel htmlFor="role-title">Role Title</FieldLabel>
        <Input
          id="role-title"
          placeholder="e.g., Senior Full-Stack Developer"
          value={state.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          aria-invalid={!!titleError}
          aria-describedby={titleError ? 'role-title-error' : undefined}
        />
        {titleError && (
          <FieldError id="role-title-error" role="alert">
            {titleError}
          </FieldError>
        )}
      </div>

      <div>
        <FieldLabel htmlFor="role-company">
          {state.roleGroup === 'side-project'
            ? 'Project Name'
            : 'Company / Project Name'}
        </FieldLabel>
        <Input
          id="role-company"
          placeholder="e.g., TechCorp Inc."
          value={state.company}
          onChange={(e) => onFieldChange('company', e.target.value)}
          aria-invalid={!!companyError}
          aria-describedby={companyError ? 'role-company-error' : undefined}
        />
        {companyError && (
          <FieldError id="role-company-error" role="alert">
            {companyError}
          </FieldError>
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
