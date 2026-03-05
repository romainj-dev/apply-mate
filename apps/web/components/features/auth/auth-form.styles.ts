import styled, { keyframes } from 'styled-components'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/* ── Animations ──────────────────────────────────────────────────────── */

const fadeSlideInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

/* ── Layout ──────────────────────────────────────────────────────────── */

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

export const TextCenter = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const GradientTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.025em;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    #a855f7,
    ${({ theme }) => theme.colors.accent}
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${fadeSlideInFromBottom} 1000ms ease both;
`

export const SubText = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
`

/* ── Card shell ──────────────────────────────────────────────────────── */

export const AuthCard = styled(Card)`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.card} 50%,
    transparent
  );
  backdrop-filter: blur(4px);
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.muted} 50%, transparent);
  box-shadow: ${({ theme }) => theme.shadows.xl};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.card} 80%,
      transparent
    );
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

export const AuthCardHeader = styled(CardHeader)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const AuthCardTitle = styled(CardTitle)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`

export const AuthCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

export const AuthCardFooter = styled(CardFooter)``

/* ── OAuth buttons — shared base ─────────────────────────────────────── */

const OAuthButton = styled(Button)`
  width: 100%;
  height: 3rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.background} 50%,
    transparent
  );
  border-color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.mutedForeground} 20%,
    transparent
  );
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.foreground};
  }

  /* Scale SVG icons on hover */
  & svg {
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover svg {
    transform: scale(1.1);
  }
`

export const GoogleButton = styled(OAuthButton)`
  &:hover {
    border-color: color-mix(in srgb, #ef4444 50%, transparent);
    box-shadow:
      0 10px 15px -3px color-mix(in srgb, #ef4444 10%, transparent),
      0 4px 6px -4px color-mix(in srgb, #ef4444 10%, transparent);
  }
`

export const LinkedInButton = styled(OAuthButton)`
  &:hover {
    border-color: color-mix(in srgb, #2563eb 50%, transparent);
    box-shadow:
      0 10px 15px -3px color-mix(in srgb, #2563eb 10%, transparent),
      0 4px 6px -4px color-mix(in srgb, #2563eb 10%, transparent);
  }
`

export const GitHubButton = styled(OAuthButton)`
  &:hover {
    border-color: color-mix(in srgb, #7c3aed 50%, transparent);
    box-shadow:
      0 10px 15px -3px color-mix(in srgb, #7c3aed 10%, transparent),
      0 4px 6px -4px color-mix(in srgb, #7c3aed 10%, transparent);
  }
`

/* ── Button inner layouts ────────────────────────────────────────────── */

export const LoadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${spin} 1s linear infinite;
`

export const ButtonContent = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceCalc(3)};
`

/* ── Footer text ─────────────────────────────────────────────────────── */

export const FooterText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-align: center;
  width: 100%;
`
