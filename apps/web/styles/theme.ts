/**
 * Typed mapping layer from CSS variable tokens to styled-components theme.
 * All values reference CSS vars — no hardcoded literals.
 *
 * Token sources:
 *   globals.css :root         — semantic design tokens (colors, radius, sidebar…)
 *   globals.css @theme inline — typography scale, font weights, shadow scale,
 *                               spacing, and Tailwind color/radius namespace aliases
 *
 * Spacing helpers:
 *   theme.space.*      named aliases for common steps
 *   theme.spaceCalc(n) calc(var(--spacing) * n) — any scale step
 */

/** Semantic color tokens from `globals.css :root` (Tailwind v4-compatible). */
const colors = {
  /** `#f3faff` */
  background: 'var(--background)',
  /** `#010515` */
  foreground: 'var(--foreground)',
  /** `#ffffff` */
  card: 'var(--card)',
  /** `#010515` */
  cardForeground: 'var(--card-foreground)',
  /** `#ffffff` */
  popover: 'var(--popover)',
  /** `#010515` */
  popoverForeground: 'var(--popover-foreground)',
  /** `#0766ee` */
  primary: 'var(--primary)',
  /** `#f8f8f8` */
  primaryForeground: 'var(--primary-foreground)',
  /** `#eef2f9` */
  secondary: 'var(--secondary)',
  /** `#082047` */
  secondaryForeground: 'var(--secondary-foreground)',
  /** `#eef2f9` */
  muted: 'var(--muted)',
  /** `#56647a` */
  mutedForeground: 'var(--muted-foreground)',
  /** `#f84331` */
  accent: 'var(--accent)',
  /** `#f8f8f8` */
  accentForeground: 'var(--accent-foreground)',
  /** `#e7000b` */
  destructive: 'var(--destructive)',
  /** `#fafafa` */
  destructiveForeground: 'var(--destructive-foreground)',
  /** `#e1e5eb` */
  border: 'var(--border)',
  /** `#e1e5eb` */
  input: 'var(--input)',
  /** `#0766ee` */
  ring: 'var(--ring)',
  sidebar: {
    /** `#f8f8f8` */
    DEFAULT: 'var(--sidebar)',
    /** `#0b0b0b` */
    foreground: 'var(--sidebar-foreground)',
    /** `#3c68d9` */
    primary: 'var(--sidebar-primary)',
    /** `#fcfcfc` */
    primaryForeground: 'var(--sidebar-primary-foreground)',
    /** `#e8ebf2` */
    accent: 'var(--sidebar-accent)',
    /** `#0b0b0b` */
    accentForeground: 'var(--sidebar-accent-foreground)',
    /** `#dbdee5` */
    border: 'var(--sidebar-border)',
    /** `#3c68d9` */
    ring: 'var(--sidebar-ring)',
  },
  status: {
    success: {
      /** `#15803d` */
      fg: 'var(--status-success-fg)',
      /** `#22c55e26` */
      bg: 'var(--status-success-bg)',
      /** `#bbf7d0` */
      border: 'var(--status-success-border)',
    },
    warning: {
      /** `#a16207` */
      fg: 'var(--status-warning-fg)',
      /** `#eab30826` */
      bg: 'var(--status-warning-bg)',
      /** `#fde68a` */
      border: 'var(--status-warning-border)',
    },
    info: {
      /** `#1d4ed8` */
      fg: 'var(--status-info-fg)',
      /** `#3b82f626` */
      bg: 'var(--status-info-bg)',
      /** `#bfdbfe` */
      border: 'var(--status-info-border)',
    },
    progress: {
      /** `#4338ca` */
      fg: 'var(--status-progress-fg)',
      /** `#6366f126` */
      bg: 'var(--status-progress-bg)',
      /** `#c7d2fe` */
      border: 'var(--status-progress-border)',
    },
    attention: {
      /** `#c2410c` */
      fg: 'var(--status-attention-fg)',
      /** `#f9731626` */
      bg: 'var(--status-attention-bg)',
      /** `#fed7aa` */
      border: 'var(--status-attention-border)',
    },
    danger: {
      /** `#b91c1c` */
      fg: 'var(--status-danger-fg)',
      /** `#ef444426` */
      bg: 'var(--status-danger-bg)',
      /** `#fecaca` */
      border: 'var(--status-danger-border)',
    },
  },
} as const

/** Typography tokens from `globals.css @theme inline` (Tailwind v4 scale). */
const typography = {
  fontFamily: {
    /** `var(--font-geist), sans-serif` */
    sans: 'var(--font-sans)',
    /** `'Geist Mono', 'Geist Mono Fallback'` */
    mono: 'var(--font-mono)',
  },
  fontSize: {
    /** `0.75rem` (`12px`) */
    xs: 'var(--text-xs)',
    /** `0.875rem` (`14px`) */
    sm: 'var(--text-sm)',
    /** `1rem` (`16px`) */
    base: 'var(--text-base)',
    /** `1.125rem` (`18px`) */
    lg: 'var(--text-lg)',
    /** `1.25rem` (`20px`) */
    xl: 'var(--text-xl)',
    /** `1.5rem` (`24px`) */
    '2xl': 'var(--text-2xl)',
    /** `1.875rem` (`30px`) */
    '3xl': 'var(--text-3xl)',
    /** `2.25rem` (`36px`) */
    '4xl': 'var(--text-4xl)',
    /** `3rem` (`48px`) */
    '5xl': 'var(--text-5xl)',
    /** `3.75rem` (`60px`) */
    '6xl': 'var(--text-6xl)',
    /** `4.5rem` (`72px`) */
    '7xl': 'var(--text-7xl)',
    /** `6rem` (`96px`) */
    '8xl': 'var(--text-8xl)',
    /** `8rem` (`128px`) */
    '9xl': 'var(--text-9xl)',
  },
  lineHeight: {
    /** `calc(1 / 0.75)` (~`1.333`) */
    xs: 'var(--text-xs--line-height)',
    /** `calc(1.25 / 0.875)` (~`1.429`) */
    sm: 'var(--text-sm--line-height)',
    /** `calc(1.5 / 1)` (`1.5`) */
    base: 'var(--text-base--line-height)',
    /** `calc(1.75 / 1.125)` (~`1.556`) */
    lg: 'var(--text-lg--line-height)',
    /** `calc(1.75 / 1.25)` (`1.4`) */
    xl: 'var(--text-xl--line-height)',
    /** `calc(2 / 1.5)` (~`1.333`) */
    '2xl': 'var(--text-2xl--line-height)',
    /** `calc(2.25 / 1.875)` (`1.2`) */
    '3xl': 'var(--text-3xl--line-height)',
    /** `calc(2.5 / 2.25)` (~`1.111`) */
    '4xl': 'var(--text-4xl--line-height)',
    /** `1` */
    '5xl': 'var(--text-5xl--line-height)',
    /** `1` */
    '6xl': 'var(--text-6xl--line-height)',
    /** `1` */
    '7xl': 'var(--text-7xl--line-height)',
    /** `1` */
    '8xl': 'var(--text-8xl--line-height)',
    /** `1` */
    '9xl': 'var(--text-9xl--line-height)',
  },
  fontWeight: {
    /** `300` */
    light: 'var(--font-weight-light)',
    /** `400` */
    normal: 'var(--font-weight-normal)',
    /** `500` */
    medium: 'var(--font-weight-medium)',
    /** `600` */
    semibold: 'var(--font-weight-semibold)',
    /** `700` */
    bold: 'var(--font-weight-bold)',
  },
} as const

/** Radius tokens from `globals.css @theme inline` (Tailwind v4 scale). */
const radii = {
  /** `0` */
  none: '0',
  /** `0.125rem` (`2px`) */
  xs: 'var(--radius-xs)',
  /** `0.25rem` (`4px`) */
  sm: 'var(--radius-sm)',
  /** `0.375rem` (`6px`) */
  md: 'var(--radius-md)',
  /** `0.5rem` (`8px`) */
  lg: 'var(--radius-lg)',
  /** `0.75rem` (`12px`) */
  xl: 'var(--radius-xl)',
  /** `1rem` (`16px`) */
  '2xl': 'var(--radius-2xl)',
  /** `1.5rem` (`24px`) */
  '3xl': 'var(--radius-3xl)',
  /** `2rem` (`32px`) */
  '4xl': 'var(--radius-4xl)',
  /** `9999px` */
  full: '9999px',
} as const

/** Desktop-first breakpoints used by styled-components media helpers. */
const breakpoints = {
  /** `1023px` */
  tablet: '1023px',
  /** `767px` */
  mobile: '767px',
} as const

/** Media query helpers derived from `breakpoints` (max-width strategy). */
const media = {
  /** `@media (max-width: 1023px)` */
  belowTablet: `@media (max-width: ${breakpoints.tablet})`,
  /** `@media (max-width: 767px)` */
  belowMobile: `@media (max-width: ${breakpoints.mobile})`,
} as const

/** Named spacing aliases based on `--spacing` from `globals.css @theme inline`. */
const space = {
  /** `0` */
  none: '0',
  /** `1px` */
  px: '1px',
  /** `4px` */
  xs: 'calc(var(--spacing) * 1)',
  /** `8px` */
  sm: 'calc(var(--spacing) * 2)',
  /** `16px` */
  md: 'calc(var(--spacing) * 4)',
  /** `24px` */
  lg: 'calc(var(--spacing) * 6)',
  /** `32px` */
  xl: 'calc(var(--spacing) * 8)',
  /** `48px` */
  '2xl': 'calc(var(--spacing) * 12)',
  /** `64px` */
  '3xl': 'calc(var(--spacing) * 16)',
  /** `96px` */
  '4xl': 'calc(var(--spacing) * 24)',
} as const

/** Shadow tokens aligned with Tailwind v4 named shadow variables. */
const shadows = {
  /** `none` */
  none: 'none',
  /** `0 1px rgb(0 0 0 / 0.05)` */
  '2xs': 'var(--shadow-2xs)',
  /** `0 1px 2px 0 rgb(0 0 0 / 0.05)` */
  xs: 'var(--shadow-xs)',
  /** `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` */
  sm: 'var(--shadow-sm)',
  /** `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` */
  md: 'var(--shadow-md)',
  /** `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` */
  lg: 'var(--shadow-lg)',
  /** `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` */
  xl: 'var(--shadow-xl)',
  /** `0 25px 50px -12px rgb(0 0 0 / 0.25)` */
  '2xl': 'var(--shadow-2xl)',
  inner: {
    /** `inset 0 1px rgb(0 0 0 / 0.05)` */
    '2xs': 'var(--inset-shadow-2xs)',
    /** `inset 0 1px 1px rgb(0 0 0 / 0.05)` */
    xs: 'var(--inset-shadow-xs)',
    /** `inset 0 2px 4px rgb(0 0 0 / 0.05)` */
    sm: 'var(--inset-shadow-sm)',
  },
} as const

/** Computes spacing for any positive step using `calc(var(--spacing) * n)`. */
function spaceCalc(n: number): string {
  return `calc(var(--spacing) * ${n})`
}

/** Computes negative spacing for any step using `calc(var(--spacing) * n * -1)`. */
function spaceCalcNeg(n: number): string {
  return `calc(var(--spacing) * ${n} * -1)`
}

/** Final app theme exposed to styled-components and consumers. */
export const theme = {
  colors,
  typography,
  radii,
  shadows,
  breakpoints,
  media,
  space,
  spaceCalc,
  spaceCalcNeg,
} as const

export type Theme = typeof theme
