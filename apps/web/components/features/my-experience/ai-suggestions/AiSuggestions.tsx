'use client'

import type { LucideIcon } from 'lucide-react'
import {
  SuggestionsContainer,
  HeaderRow,
  HeaderIcon,
  HeaderTitle,
  CardsGrid,
  SuggestionCard,
  CardBody,
  CardTextGroup,
  IconCircle,
  CardTitle,
  CardDescription,
  ActionLink,
} from './AiSuggestions.styles'

type AiSuggestion = {
  id: string
  icon: LucideIcon
  title: string
  description: string
  actionLabel: string
}

interface AiSuggestionsProps {
  suggestions: AiSuggestion[]
  onActionClick?: (suggestionId: string) => void
}

export type { AiSuggestion }

export function AiSuggestions({
  suggestions,
  onActionClick,
}: AiSuggestionsProps) {
  return (
    <SuggestionsContainer>
      <HeaderRow>
        <HeaderIcon />
        <HeaderTitle>AI Suggestions to Improve Your Profile</HeaderTitle>
      </HeaderRow>

      <CardsGrid>
        {suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} variant="default" size="none">
            <CardBody>
              <IconCircle>
                <suggestion.icon />
              </IconCircle>
              <CardTextGroup>
                <CardTitle>{suggestion.title}</CardTitle>
                <CardDescription>{suggestion.description}</CardDescription>
                <ActionLink onClick={() => onActionClick?.(suggestion.id)}>
                  {suggestion.actionLabel}
                </ActionLink>
              </CardTextGroup>
            </CardBody>
          </SuggestionCard>
        ))}
      </CardsGrid>
    </SuggestionsContainer>
  )
}
