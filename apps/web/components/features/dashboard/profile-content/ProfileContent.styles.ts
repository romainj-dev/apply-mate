import styled from 'styled-components'
import Image from 'next/image'

export const Main = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Container = styled.div`
  width: 100%;
  max-width: 56rem;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.space.md};
  padding-block: ${({ theme }) => theme.space['3xl']};
`

export const PageTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  line-height: ${({ theme }) => theme.typography.lineHeight['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const Card = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space.lg};
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.cardForeground};
`

export const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const Avatar = styled(Image)`
  width: ${({ theme }) => theme.space['3xl']};
  height: ${({ theme }) => theme.space['3xl']};
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.full};
`

export const FieldLabel = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export const SignOutForm = styled.form`
  margin-top: ${({ theme }) => theme.space.md};
`
