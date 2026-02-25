'use client'

import { createGlobalStyle } from 'styled-components'

/*
 * No universal (*) reset here — Tailwind v4 preflight (via @import 'tailwindcss')
 * already provides box-sizing, margin, and padding resets inside @layer base.
 * Duplicating them in styled-components would create unlayered rules that
 * override Tailwind utility classes (unlayered CSS always beats @layer).
 * border-color / outline-color defaults live in globals.css @layer base.
 */
export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    overflow-x: hidden;
    /*
     * Only applied when scroll-behavior is user-initiated (e.g. anchor links).
     * Overridden to "auto" in the reduced-motion block below.
     */
    scroll-behavior: smooth;
  }

  body {
    min-height: 100%;
    overflow-x: hidden;
    font-family: var(--font-sans);
    line-height: 1.5;
    background-color: var(--background);
    color: var(--foreground);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    /*
     * Aligns numeric characters in tables and metric displays.
     * Prevents layout shift when numbers update (e.g. counters, prices).
     */
    font-variant-numeric: tabular-nums;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    text-wrap: balance;
  }

  p {
    overflow-wrap: break-word;
    /* Avoids orphaned last words on the final line */
    text-wrap: pretty;
  }

  /* Browsers don't inherit font from body for form elements by default */
  button,
  input,
  optgroup,
  select,
  textarea {
    font: inherit;
    letter-spacing: inherit;
  }

  img,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`
