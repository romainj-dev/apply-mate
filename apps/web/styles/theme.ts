/**
 * Design system tokens for the application.
 * All colors, typography, spacing, and breakpoints are defined here.
 *
 * @see style-guide.md for design specifications
 */

export const theme = {
  colors: {
    primary: {
      blue: 'hsl(246, 80%, 60%)',
    },
    activity: {
      work: 'hsl(15, 100%, 70%)',
      play: 'hsl(195, 74%, 62%)',
      study: 'hsl(348, 100%, 68%)',
      exercise: 'hsl(145, 58%, 55%)',
      social: 'hsl(264, 64%, 52%)',
      selfCare: 'hsl(43, 84%, 65%)',
    },
    neutral: {
      veryDarkBlue: 'hsl(226, 43%, 10%)',
      darkBlue: 'hsl(235, 46%, 20%)',
      desaturatedBlue: 'hsl(235, 45%, 61%)',
      paleBlue: 'hsl(236, 100%, 87%)',
    },
  },
  typography: {
    fontFamily: "var(--font-rubik), 'Rubik', sans-serif",
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      cardTitle: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3.5rem',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
  },
  radii: {
    sm: '8px',
    md: '15px',
    lg: '20px',
    full: '50%',
  },
  breakpoints: {
    mobile: '375px',
    desktop: '1440px',
  },
  media: {
    mobile: '@media (max-width: 375px)',
    tablet: '@media (min-width: 376px) and (max-width: 1023px)',
    desktop: '@media (min-width: 1024px)',
  },
} as const

export type Theme = typeof theme
