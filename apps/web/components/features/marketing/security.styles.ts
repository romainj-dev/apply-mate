import styled from 'styled-components'

export const Section = styled.section`
  padding-block: ${({ theme }) => theme.spaceCalc(32)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.belowMobile} {
    padding-block: ${({ theme }) => theme.spaceCalc(20)};
  }
`

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.space.md};
`

export const SectionHeader = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space['3xl']};
`

export const Heading = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.space.md};
  text-wrap: balance;

  ${({ theme }) => theme.media.belowMobile} {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`

export const Lead = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-wrap: balance;
  line-height: 1.625;
`

export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
  grid-template-columns: repeat(4, 1fr);
  max-width: 72rem;
  margin: 0 auto;

  ${({ theme }) => theme.media.belowTablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.media.belowMobile} {
    grid-template-columns: 1fr;
  }
`

export const FeatureItem = styled.div`
  text-align: center;
`

export const FeatureIconWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space.md};
  display: flex;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.accent} 10%,
    transparent
  );
  margin-inline: auto;
  color: ${({ theme }) => theme.colors.accent};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const FeatureTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: 1.625;
`
