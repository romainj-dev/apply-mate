'use client'

import type { ComponentProps } from 'react'

import { StyledTableMenuContent } from './TableMenuContent.styles'

type TableMenuContentProps = ComponentProps<typeof StyledTableMenuContent>

export function TableMenuContent(props: TableMenuContentProps) {
  return <StyledTableMenuContent {...props} />
}
