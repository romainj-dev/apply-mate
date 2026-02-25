'use client'

/**
 * Styled-components theme provider with global styles.
 * Injects design tokens and CSS reset into the application.
 */

import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { GlobalStyles } from '@/styles/GlobalStyles'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  )
}
