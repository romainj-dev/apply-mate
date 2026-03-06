'use client'

import type { ComponentProps } from 'react'

import { StyledTableMenuSeparator } from './TableMenuSeparator.styles'

type TableMenuSeparatorProps = ComponentProps<typeof StyledTableMenuSeparator>

export function TableMenuSeparator(props: TableMenuSeparatorProps) {
  return <StyledTableMenuSeparator {...props} />
}
