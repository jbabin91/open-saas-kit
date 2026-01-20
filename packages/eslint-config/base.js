//  @ts-check

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import configPrettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
// @ts-ignore -- types are missing
import sortKeysPlus from 'eslint-plugin-sort-keys-plus';
import turboPlugin from 'eslint-plugin-turbo';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores([
    // Dependencies
    '**/node_modules',

    // Build outputs
    '**/build',
    '**/dist',
    '**/out',

    // Framework - TanStack/Vinxi/Nitro
    '**/.nitro',
    '**/.output',
    '**/.tanstack',
    '**/.vinxi',
    '**/.wrangler',

    // Framework - Turbo
    '**/.turbo',

    // Testing
    '**/coverage',
    '**/playwright-report',
    '**/test-results',

    // Storybook
    '**/storybook-static',

    // Generated files
    '**/*.gen.ts',
  ]),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
  },
  turboPlugin.configs['flat/recommended'],
  {
    extends: [js.configs.recommended, unicorn.configs.recommended],
    plugins: {
      // @ts-expect-error -- types are missing
      'import-x': importX,
      'simple-import-sort': simpleImportSort,
      'sort-keys-plus': sortKeysPlus,
    },
    rules: {
      eqeqeq: 'error',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/no-relative-parent-imports': 'error',
      'no-console': 'warn',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys-plus/sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: false,
          minKeys: 3,
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: false,
            kebabCase: true,
            pascalCase: false,
          },
          ignore: [String.raw`^\$.*\.tsx?$`], // Allow parameter files starting with $
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/prefer-class-fields': 'error',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    files: [
      '**/env.ts',
      '**/logger.ts',
      '**/seed/**/*',
      '**/*.stories.*',
      '**/*.test.*',
      '**/*.spec.*',
      'e2e/**/*',
    ],
    rules: {
      'no-console': 'off',
    },
  },
  configPrettier,
);
