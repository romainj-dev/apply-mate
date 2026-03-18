import styled from 'styled-components'
import { GlassCardContent, GlassCardTitle } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import type { Theme } from '@/styles/theme'

type StatusKey = keyof Theme['colors']['status']

/* ── Header ──────────────────────────────────────────────────────────── */

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
`

export const FlexFill = styled.div`
  flex: 1;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const RoleTitle = styled(GlassCardTitle)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`

interface EmploymentBadgeProps {
  $statusKey: StatusKey
}

export const EmploymentBadge = styled(Badge)<EmploymentBadgeProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: ${({ theme, $statusKey }) =>
    theme.colors.status[$statusKey].bg};
  color: ${({ theme, $statusKey }) => theme.colors.status[$statusKey].fg};
  border-color: ${({ theme, $statusKey }) =>
    theme.colors.status[$statusKey].border};
`

const InfoGridBase = styled.div`
  width: fit-content;
  margin-top: ${({ theme }) => theme.space.md};
  display: grid;
  grid-template-columns: auto auto;
  gap: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
`

interface InfoGridItemProps {
  $columnSpan?: number
}

const InfoGridItem = styled.div<InfoGridItemProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};

  & > svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`

export const InfoGrid = Object.assign(InfoGridBase, {
  Item: InfoGridItem,
})

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`

/* ── Content ─────────────────────────────────────────────────────────── */

export const ContentArea = styled(GlassCardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

/* ── Section headings ────────────────────────────────────────────────── */

export const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

/* ── Text blocks ─────────────────────────────────────────────────────── */

export const BodyText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.typography.lineHeight.sm};
`
