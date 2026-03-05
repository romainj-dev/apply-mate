import styled from 'styled-components'
import { ArrowRight, Link2, Lock } from 'lucide-react'

import { GlassCard } from '@/components/ui/glass-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface DisabledProps {
  $disabled?: boolean
}

export const Card = styled(GlassCard)<DisabledProps>`
  position: relative;
  ${({ $disabled }) => $disabled && 'opacity: 0.8;'}
`

export const Form = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.sm};
`

export const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`

export const IconHolder = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.space.md};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgb(255 255 255 / 0.5);
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const LinkIcon = styled(Link2)`
  width: 1rem;
  height: 1rem;
`

export const StyledInput = styled(Input)<DisabledProps>`
  padding-left: 3.5rem;
  height: 3.5rem;
  background: transparent;
  border-color: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'auto')};

  &::placeholder {
    color: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.mutedForeground} 50%,
      transparent
    );
  }

  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`

export const DisabledBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding-inline: ${({ theme }) => theme.space.lg};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.muted} 50%,
    transparent
  );
  border-radius: ${({ theme }) => theme.radii.xl};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.border} 50%, transparent);
`

export const LockIcon = styled(Lock)`
  width: 1rem;
  height: 1rem;
`

export const SubmitButton = styled(Button)`
  height: 3.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  padding-inline: ${({ theme }) => theme.space.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  box-shadow:
    0 10px 15px -3px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      ),
    0 4px 6px -4px
      color-mix(
        in srgb,
        ${({ theme }) => theme.colors.primary} 25%,
        transparent
      );
`

export const ArrowIcon = styled(ArrowRight)`
  height: 1.25rem;
  width: 1.25rem;
  margin-left: ${({ theme }) => theme.space.sm};
`
