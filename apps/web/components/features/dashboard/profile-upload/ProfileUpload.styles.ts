import styled from 'styled-components'
import { Download, Linkedin, Sparkles } from 'lucide-react'
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/GlassCard'
import { CardDescription } from '@/components/ui/Card'

/* ── Card shell ──────────────────────────────────────────────────────── */

export const UploadCard = styled(GlassCard)`
  position: relative;
  overflow: hidden;
`

export const BlobBottomRight = styled.div`
  position: absolute;
  bottom: -3rem;
  right: -3rem;
  height: 16rem;
  width: 16rem;
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
  border-radius: ${({ theme }) => theme.radii.full};
  filter: blur(64px);
`

export const BlobTopLeft = styled.div`
  position: absolute;
  top: -3rem;
  left: -3rem;
  height: 16rem;
  width: 16rem;
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
  border-radius: ${({ theme }) => theme.radii.full};
  filter: blur(64px);
`

/* ── Card header ─────────────────────────────────────────────────────── */

export const UploadHeader = styled(GlassCardHeader)`
  border-bottom: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
  padding-bottom: ${({ theme }) => theme.space.lg};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 2%,
    transparent
  );
`

export const HeaderInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`

export const HeaderIconBox = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  flex-shrink: 0;
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 20%, transparent);

  ${({ theme }) => theme.media.belowMobile} {
    width: 2.5rem;
    height: 2.5rem;
  }
`

export const HeaderSparklesIcon = styled(Sparkles)`
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const HeaderTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const UploadTitle = styled(GlassCardTitle)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.025em;

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`

export const UploadDescription = styled(CardDescription)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`

/* ── Content area ────────────────────────────────────────────────────── */

export const UploadContent = styled(GlassCardContent)`
  padding: ${({ theme }) => theme.space.xl};

  ${({ theme }) => theme.media.belowMobile} {
    padding: ${({ theme }) => theme.space.lg};
  }
`

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  position: relative;

  ${({ theme }) => theme.media.belowTablet} {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

/* ── Vertical divider with OR badge ─────────────────────────────────── */

export const Divider = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.border} 50%,
    transparent
  );
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.belowTablet} {
    display: none;
  }
`

export const OrBadge = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 2rem;
  width: 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.mutedForeground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

/* ── Column layout ───────────────────────────────────────────────────── */

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

export const StepIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const StepNumRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const StepNumBadgeMuted = styled.span`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.mutedForeground} 20%,
    transparent
  );
  color: ${({ theme }) => theme.colors.mutedForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const StepTitleMuted = styled.h4`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const StepHint = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-left: ${({ theme }) => theme.space.xl};
`

/* ── Right column: tip cards (icons & text styles for parent content) ───── */

export const TipLinkedinIcon = styled(Linkedin)`
  width: 1.25rem;
  height: 1.25rem;
`

export const TipDownloadIcon = styled(Download)`
  width: 1.25rem;
  height: 1.25rem;
`

export const FastestBadge = styled.span`
  font-size: 9px;
  padding-inline: ${({ theme }) => theme.spaceCalc(1.5)};
  padding-block: 0.125rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.025em;
`

export const TipStrong = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const TipStrongItalic = styled(TipStrong)`
  font-style: italic;
`

export const TipPrimaryStrong = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

/* ── Next-step callout ───────────────────────────────────────────────── */

export const NextStepCard = styled.div`
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent);
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`

export const NextStepIconBox = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 20%, transparent);
`

export const NextStepSparklesIcon = styled(Sparkles)`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const NextStepBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const NextStepLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const NextStepText = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.typography.lineHeight.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-style: italic;
`
