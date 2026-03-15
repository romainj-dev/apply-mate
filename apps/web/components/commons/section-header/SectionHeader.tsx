'use client'

import type { ReactNode } from 'react'
import {
  Wrapper,
  TextGroup,
  TitleRow,
  TitleIcon,
  Title,
  Subtitle,
} from './SectionHeader.styles'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
}

export function SectionHeader({
  title,
  subtitle,
  icon,
  action,
}: SectionHeaderProps) {
  return (
    <Wrapper>
      <TextGroup>
        <TitleRow>
          {icon && <TitleIcon>{icon}</TitleIcon>}
          <Title>{title}</Title>
        </TitleRow>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TextGroup>
      {action}
    </Wrapper>
  )
}
