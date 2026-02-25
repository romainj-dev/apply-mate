import 'styled-components'
import type { Theme } from '@/styles/theme'

/**
 * Augments styled-components DefaultTheme with the app theme type.
 * Shape: { colors, typography, radii, breakpoints, media, space,
 *          spaceCalc(n), spaceCalcNeg(n) }
 * All color/typography/radius values are var(--token) CSS variable strings.
 */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
