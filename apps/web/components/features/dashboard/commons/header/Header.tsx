'use client'

import { type ReactNode } from 'react'

import { Container, Title, Subtitle } from './Header.styles'

export function DashboardHeader({
  title,
  subtitle,
}: {
  title: string | ReactNode
  subtitle: string
}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}
