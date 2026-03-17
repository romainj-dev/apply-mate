'use client'

import { useState, useMemo, useRef } from 'react'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import type { TechStackItem } from '@/types/tech-stack'
import {
  TECH_CATALOG,
  getTechLabel,
  techStringToItem,
} from '@/components/features/my-experience/roles/tech-catalog'
import {
  Container,
  SectionLabel,
  ChipsRow,
  TechChip,
  RemoveButton,
  InputWrapper,
  SuggestionsList,
  SuggestionItem,
} from './TechStackInput.styles'

const KNOWN_TECHS = Object.entries(TECH_CATALOG).map(([value, entry]) => ({
  value,
  label: entry.label,
}))

interface TechStackInputProps {
  techStack: TechStackItem[]
  onAdd: (item: TechStackItem) => void
  onRemove: (index: number) => void
  label?: string
}

export function TechStackInput({
  techStack,
  onAdd,
  onRemove,
  label = 'Tech Stack',
}: TechStackInputProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return KNOWN_TECHS.filter((tech) => {
      const alreadySelected = techStack.some((t) => t.value === tech.value)
      if (alreadySelected) return false
      return (
        tech.label.toLowerCase().includes(q) ||
        tech.value.toLowerCase().includes(q)
      )
    }).slice(0, 8)
  }, [query, techStack])

  function handleSelect(value: string): void {
    const item = techStringToItem(value)
    onAdd(item)
    setQuery('')
    setIsOpen(false)
    setHighlightedIndex(0)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      )
    } else if (e.key === 'Enter' && query.trim()) {
      e.preventDefault()
      if (suggestions.length > 0) {
        handleSelect(suggestions[highlightedIndex].label)
      } else {
        onAdd(techStringToItem(query.trim()))
        setQuery('')
        setIsOpen(false)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <Container>
      <SectionLabel>{label}</SectionLabel>
      {techStack.length > 0 && (
        <ChipsRow>
          {techStack.map((item, index) => (
            <TechChip
              key={item.value === 'other' ? `other-${index}` : item.value}
              variant="secondary"
            >
              {getTechLabel(item)}
              <RemoveButton
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${getTechLabel(item)}`}
              >
                <X size={12} />
              </RemoveButton>
            </TechChip>
          ))}
        </ChipsRow>
      )}
      <InputWrapper>
        <Input
          ref={inputRef}
          placeholder="Add tech..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setHighlightedIndex(0)
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
        />
        {isOpen && suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((s, i) => (
              <SuggestionItem
                key={s.value}
                $highlighted={i === highlightedIndex}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelect(s.label)
                }}
                onMouseEnter={() => setHighlightedIndex(i)}
              >
                {s.label}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </InputWrapper>
    </Container>
  )
}
