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

export const StepsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
  grid-template-columns: repeat(3, 1fr);
  max-width: 64rem;
  margin: 0 auto;

  ${({ theme }) => theme.media.belowMobile} {
    grid-template-columns: 1fr;
  }
`

export const StepItem = styled.div`
  position: relative;
`

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const StepIconWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space.md};
  display: flex;
  height: 4rem;
  width: 4rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: color-mix(
    in oklch,
    ${({ theme }) => theme.colors.accent} 10%,
    transparent
  );
  border: 1px solid
    color-mix(in oklch, ${({ theme }) => theme.colors.accent} 20%, transparent);
  color: ${({ theme }) => theme.colors.accent};

  svg {
    width: 2rem;
    height: 2rem;
  }
`

export const StepLabel = styled.div`
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent};
`

export const StepTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spaceCalc(3)};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-wrap: balance;
`

export const StepDescription = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  text-wrap: balance;
  line-height: 1.625;
`

export const Connector = styled.div`
  display: block;
  position: absolute;
  top: 2rem;
  left: calc(50% + 2rem);
  width: calc(100% - 4rem);
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.belowMobile} {
    display: none;
  }
`
