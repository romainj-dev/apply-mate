'use client'

import { Pattern } from './BackgroundPattern.styles'

interface BackgroundPatternProps {
  position?: 'absolute' | 'fixed'
  zIndex?: number
}

export function BackgroundPattern({
  position,
  zIndex,
}: BackgroundPatternProps) {
  return <Pattern $position={position} $zIndex={zIndex} />
}
