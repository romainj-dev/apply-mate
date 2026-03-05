'use client'

import type { ReactNode } from 'react'

import {
  ExternalLinkIcon,
  GhostLinkButton,
  TipBody,
  TipCard,
  TipIconBox,
  TipInner,
  TipText,
  TipTitle,
  TipTitleRow,
} from './ResumeTipCard.styles'

export interface ResumeTipCardProps {
  brand: 'linkedin' | 'indeed'
  icon: ReactNode
  title: ReactNode
  linkHref: string
  linkLabel: string
  instruction: ReactNode
}

export function ResumeTipCard({
  brand,
  icon,
  title,
  linkHref,
  linkLabel,
  instruction,
}: ResumeTipCardProps) {
  return (
    <TipCard>
      <TipInner>
        <TipIconBox $brand={brand}>{icon}</TipIconBox>
        <TipBody>
          <TipTitleRow>
            <TipTitle>{title}</TipTitle>
            <GhostLinkButton variant="ghost" size="sm" asChild>
              <a href={linkHref} target="_blank" rel="noopener noreferrer">
                {linkLabel} <ExternalLinkIcon />
              </a>
            </GhostLinkButton>
          </TipTitleRow>
          <TipText>{instruction}</TipText>
        </TipBody>
      </TipInner>
    </TipCard>
  )
}
