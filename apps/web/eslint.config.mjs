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
  /*
   * React components return JSX which TypeScript infers correctly as
   * React.JSX.Element. Annotating it adds noise with no safety benefit.
   * Hooks, utils, services, and API handlers in .ts files keep the rule.
   */
  {
    files: ['**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
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
  /*
   * RLS boundary guardrail.
   *
   * App code must NOT import the shared db client directly; user-scoped access
   * must enter through withRlsDb() and pass an RlsTransaction downward.
   *
   * The only global exceptions are the DB infrastructure files themselves:
   *   - lib/db/client.ts → defines the shared client
   *   - lib/db/rls.ts    → wraps the shared client with RLS context
   *
   * One-off privileged or public call sites must use a local eslint disable so
   * the exception stays explicit at the point of use.
   */
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['lib/db/client.ts', 'lib/db/rls.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/lib/db/client',
              message:
                'Direct db imports bypass RLS. Accept an RlsTransaction ' +
                'parameter and use withRlsDb() at the entry point instead. ' +
                'See docs/auth-session-access.md.',
            },
          ],
        },
      ],
    },
  },
])
