'use client'

import { type ReactNode } from 'react'

import { Wrapper, Inner, Title, Subtitle } from './Header.styles'

export function DashboardHeader({
  title,
  subtitle,
}: {
  title: string | ReactNode
  subtitle: string
}) {
  return (
    <Wrapper>
      <Inner>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Inner>
    </Wrapper>
  )
}
