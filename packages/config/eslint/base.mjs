import js from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export const baseConfig = tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      'packages/shared/**/*.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierPlugin,
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info', 'debug'],
        },
      ],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  }
)
