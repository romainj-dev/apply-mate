import styled from 'styled-components'

import { GlassCard } from '@/components/ui/glass-card'

export const SidebarCard = styled(GlassCard)`
  position: fixed;
  left: ${({ theme }) => theme.spaceCalc(6)};
  top: ${({ theme }) => theme.spaceCalc(6)};
  bottom: ${({ theme }) => theme.spaceCalc(6)};
  z-index: 50;
  width: 16rem;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
`

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin-block: ${({ theme }) => theme.space.md};
  opacity: 0.5;
  background: linear-gradient(
    to right,
    transparent,
    ${({ theme }) => theme.colors.border},
    transparent
  );
`
