import styled from 'styled-components'
import {
  AlertCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Linkedin,
  Loader2,
  Sparkles,
  Upload,
} from 'lucide-react'
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/glass-card'
import { CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type TipBrand = 'linkedin' | 'indeed'

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
    in oklch,
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
    in oklch,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
  border-radius: ${({ theme }) => theme.radii.full};
  filter: blur(64px);
`

/* ── Card header ─────────────────────────────────────────────────────── */

export const UploadHeader = styled(GlassCardHeader)`
  border-bottom: 1px solid
    color-mix(in oklch, ${({ theme }) => theme.colors.border} 50%, transparent);
  padding-bottom: ${({ theme }) => theme.space.lg};
  background: color-mix(
    in oklch,
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
    in oklch,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  flex-shrink: 0;
  border: 1px solid
    color-mix(in oklch, ${({ theme }) => theme.colors.primary} 20%, transparent);

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
    in oklch,
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

export const StepNumBadgePrimary = styled.span`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export const StepNumBadgeMuted = styled.span`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: color-mix(
    in oklch,
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

export const StepTitle = styled.h4`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
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

/* ── File upload dropzone ─────────────────────────────────────────────── */

export const UploadLabel = styled.label<{ $hasFile: boolean }>`
  display: block;
  border-width: 2px;
  border-style: dashed;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: ${({ theme }) => theme.spaceCalc(10)};
  text-align: center;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  ${({ theme, $hasFile }) =>
    $hasFile
      ? `
    border-color: ${theme.colors.status.success.border};
    background: ${theme.colors.status.success.bg};
  `
      : `
    border-color: color-mix(in oklch, ${theme.colors.primary} 30%, transparent);
    background: color-mix(in oklch, ${theme.colors.primary} 1%, transparent);

    &:hover {
      border-color: color-mix(in oklch, ${theme.colors.primary} 60%, transparent);
      background: color-mix(in oklch, ${theme.colors.primary} 4%, transparent);
    }
  `}
`

export const HiddenInput = styled.input`
  display: none;
`

/* ── Uploaded-file state ─────────────────────────────────────────────── */

export const UploadedStateContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

export const SuccessIconBox = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: ${({ theme }) => theme.colors.status.success.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: auto;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.status.success.border};
`

export const SuccessCheckIcon = styled(CheckCircle2)`
  width: 1.75rem;
  height: 1.75rem;
  color: ${({ theme }) => theme.colors.status.success.fg};
`

export const UploadedFileName = styled.p`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 240px;
  margin-inline: auto;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

/* ── Default (empty) upload state ────────────────────────────────────── */

export const DefaultStateContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

export const UploadIconBox = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: auto;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  /* ring-1 ring-primary/20 */
  box-shadow: 0 0 0 1px
    color-mix(in oklch, ${({ theme }) => theme.colors.primary} 20%, transparent);

  ${UploadLabel}:hover & {
    transform: scale(1.1);
  }
`

export const UploadFileIcon = styled(Upload)`
  width: 1.75rem;
  height: 1.75rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const DropTitle = styled.p`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

export const DropHint = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-top: ${({ theme }) => theme.space.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const SelectFilePt = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
`

export const SelectFileSpan = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding-inline: ${({ theme }) => theme.space.md};
  padding-block: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  ${UploadLabel}:hover & {
    background: color-mix(
      in oklch,
      ${({ theme }) => theme.colors.primary} 90%,
      transparent
    );
  }
`

export const SelectFileTextIcon = styled(FileText)`
  width: 1rem;
  height: 1rem;
`

/* ── Error message ───────────────────────────────────────────────────── */

export const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spaceCalc(3)};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.status.danger.bg};
  border: 1px solid ${({ theme }) => theme.colors.status.danger.border};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.status.danger.fg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const ErrorAlertIcon = styled(AlertCircle)`
  width: 1rem;
  height: 1rem;
  margin-top: ${({ theme }) => theme.space.xs};
  flex-shrink: 0;
`

/* ── Analyze button ──────────────────────────────────────────────────── */

export const AnalyzeButton = styled(Button)`
  width: 100%;
  height: 3rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  gap: ${({ theme }) => theme.spaceCalc(3)};
  /* shadow-xl shadow-primary/25 — colored shadow geometry */
  box-shadow:
    0 20px 25px -5px
      color-mix(
        in oklch,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      ),
    0 8px 10px -6px
      color-mix(
        in oklch,
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

/* ── Right column: tip cards ─────────────────────────────────────────── */

export const TipCard = styled.div`
  padding: ${({ theme }) => theme.spaceCalc(5)};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.card} 20%,
    transparent
  );
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: color-mix(
      in oklch,
      ${({ theme }) => theme.colors.card} 40%,
      transparent
    );
  }
`

export const TipInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`

export const TipIconBox = styled.div<{ $brand: TipBrand }>`
  margin-top: 0.25rem;
  height: 2.5rem;
  width: 2.5rem;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(
    in oklch,
    ${({ $brand }) => ($brand === 'linkedin' ? '#0077b5' : '#2164f3')} 10%,
    transparent
  );
  color: ${({ $brand }) => ($brand === 'linkedin' ? '#0077b5' : '#2164f3')};
  border: 1px solid
    color-mix(
      in oklch,
      ${({ $brand }) => ($brand === 'linkedin' ? '#0077b5' : '#2164f3')} 20%,
      transparent
    );
`

export const TipLinkedinIcon = styled(Linkedin)`
  width: 1.25rem;
  height: 1.25rem;
`

export const TipDownloadIcon = styled(Download)`
  width: 1.25rem;
  height: 1.25rem;
`

export const TipBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  flex: 1;
`

export const TipTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TipTitle = styled.h5`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const FastestBadge = styled.span`
  font-size: 9px;
  padding-inline: ${({ theme }) => theme.spaceCalc(1.5)};
  padding-block: 0.125rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 900; /* font-black — no theme token */
  text-transform: uppercase;
  letter-spacing: -0.025em;
`

export const TipText = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const GhostLinkButton = styled(Button)`
  height: 1.75rem;
  padding-inline: ${({ theme }) => theme.space.sm};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background: color-mix(
      in oklch,
      ${({ theme }) => theme.colors.primary} 5%,
      transparent
    );
  }
`

export const ExternalLinkIcon = styled(ExternalLink)`
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 0.25rem;
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
    in oklch,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
  border: 1px solid
    color-mix(in oklch, ${({ theme }) => theme.colors.primary} 10%, transparent);
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`

export const NextStepIconBox = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid
    color-mix(in oklch, ${({ theme }) => theme.colors.primary} 20%, transparent);
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
