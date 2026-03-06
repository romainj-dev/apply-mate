import styled from 'styled-components'
import { GlassCardContent, GlassCardTitle } from '@/components/ui/GlassCard'
import { Calendar, Edit2 } from 'lucide-react'

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

export const RoleTitle = styled(GlassCardTitle)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`

export const CompanyName = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-top: ${({ theme }) => theme.space.xs};
`

export const PeriodRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const PeriodItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`

export const PeriodCalendarIcon = styled(Calendar)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const HeaderEditIcon = styled(Edit2)`
  width: 1rem;
  height: 1rem;
`

/* ── Content ─────────────────────────────────────────────────────────── */

export const ContentArea = styled(GlassCardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

/* ── Section headings ────────────────────────────────────────────────── */

/** Plain heading (no icon). mb = 8px by default. */
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
