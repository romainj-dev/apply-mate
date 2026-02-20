import js from '@eslint/js'
import json from '@eslint/json'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

const codeFiles = ['**/*.{ts,tsx,js,jsx,mjs,cjs}']

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
  {
    ...js.configs.recommended,
    files: codeFiles,
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: codeFiles,
  })),
  prettierPlugin,
  {
    files: ['**/*.json'],
    plugins: {
      json,
    },
    language: 'json/json',
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  {
    files: codeFiles,
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
