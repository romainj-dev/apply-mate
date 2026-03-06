import styled from 'styled-components'
import { Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const AnalyzeButton = styled(Button)`
  width: 100%;
  height: 3rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  gap: ${({ theme }) => theme.spaceCalc(3)};
  box-shadow:
    0 20px 25px -5px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      ),
    0 8px 10px -6px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      );
`

export const AnalyzeLoaderIcon = styled(Loader2)`
  width: 1.25rem;
  height: 1.25rem;
`

export const AnalyzeSparklesIcon = styled(Sparkles)`
  width: 1.25rem;
  height: 1.25rem;
`
