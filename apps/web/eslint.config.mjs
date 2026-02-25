import { defineConfig, globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { baseConfig } from '../../packages/config/eslint/base.mjs'

export default defineConfig([
  ...baseConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'graphql/generated/**',
    'graphql/schema.graphql',
  ]),
  /*
   * Styling guardrail (warning-level during migration — non-blocking).
   *
   * Tailwind class-composition utilities are restricted to components/ui and
   * styles/. All other app/feature code must use styled-components with theme
   * tokens (theme.colors.*, theme.space.*, etc.).
   *
   * Current enforcement: warn on cn() import outside the allowlist.
   *
   * POST-MIGRATION HARDENING (TODO after feature migration is complete):
   *   Elevate to 'error' and expand the import path list to cover all known
   *   Tailwind class-composition utilities:
   *     - '@/lib/utils'            (cn — already covered)
   *     - 'clsx'
   *     - 'class-variance-authority'
   *     - 'tailwind-merge'
   *   Also restrict className prop usage in styled-components feature code
   *   where practical, or enforce via a custom rule.
   *   Target: CI-blocking once the migration is complete so the boundary
   *   becomes a hard contract.
   */
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['components/ui/**', 'styles/**'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          paths: [
            {
              name: '@/lib/utils',
              importNames: ['cn'],
              message:
                'cn() is the Tailwind class composer and is restricted to ' +
                'components/ui and styles/. Use styled-components with theme ' +
                'tokens (theme.space.*, theme.colors.*, …) in app/feature code.',
            },
          ],
        },
      ],
    },
  },
])
