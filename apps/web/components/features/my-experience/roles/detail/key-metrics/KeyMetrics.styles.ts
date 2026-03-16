import styled from 'styled-components'

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: ${({ theme }) => theme.space.md};
`

export const MetricCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.primary} 5%,
    transparent
  );
`

export const MetricIconWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.space.sm};

  & > svg {
    width: 100%;
    height: 100%;
  }
`

export const MetricValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const MetricLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-top: ${({ theme }) => theme.space.xs};
`
