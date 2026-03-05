import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.space.md};
`

export const SectionHeader = styled.div`
  margin: 0 auto;
  max-width: 42rem;
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
