import styled from 'styled-components'
import { CheckCircle2, FileText, Upload } from 'lucide-react'

/* ── Step intro (left column) ─────────────────────────────────────────── */

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

export const StepTitle = styled.h4`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
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
    border-color: color-mix(in srgb, ${theme.colors.primary} 30%, transparent);
    background: color-mix(in srgb, ${theme.colors.primary} 1%, transparent);

    &:hover {
      border-color: color-mix(in srgb, ${theme.colors.primary} 60%, transparent);
      background: color-mix(in srgb, ${theme.colors.primary} 4%, transparent);
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
    in srgb,
    ${({ theme }) => theme.colors.primary} 10%,
    transparent
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: auto;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 1px
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 20%, transparent);

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
      in srgb,
      ${({ theme }) => theme.colors.primary} 90%,
      transparent
    );
  }
`

export const SelectFileTextIcon = styled(FileText)`
  width: 1rem;
  height: 1rem;
`
