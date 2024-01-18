/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    'import/order': [
      1,
      {
        groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/stores/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/**',
            group: 'internal',
          },
          {
            pattern: '@/components/ui/**',
            group: 'internal',
          },
          {
            pattern: '@/lib/**',
            group: 'internal',
          },
          {
            pattern: '@/constants/**',
            group: 'internal',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
};

module.exports = config;
