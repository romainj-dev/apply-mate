import styled from 'styled-components'
import { Sparkles } from 'lucide-react'
import { GlassCard, GlassCardContent } from '@/components/ui/GlassCard'

export const SuggestionsContainer = styled.div`
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: linear-gradient(
    to bottom right,
    color-mix(in srgb, ${({ theme }) => theme.colors.accent} 8%, transparent),
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 5%, transparent)
  );
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.accent} 15%, transparent);
  padding: ${({ theme }) => theme.space.lg};
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

export const HeaderIcon = styled(Sparkles)`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.accent};
`

export const HeaderTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.md};

  ${({ theme }) => theme.media.belowTablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.media.belowMobile} {
    grid-template-columns: 1fr;
  }
`

export const SuggestionCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
`

export const CardBody = styled(GlassCardContent)`
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.sm};
  flex: 1;
`

export const CardTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  min-width: 0;
`

export const IconCircle = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.accent} 10%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;

  svg {
    width: 1rem;
    height: 1rem;
  }
`

export const CardTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.typography.lineHeight.xs};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const ActionLink = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  &:hover {
    text-decoration: underline;
  }
`
