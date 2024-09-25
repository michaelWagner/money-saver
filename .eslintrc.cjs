module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // Add TypeScript linting rules
  ],
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable linting for JSX files
    },
  },
  settings: {
    react: { version: '18.2' },
  },
  plugins: ['react-refresh', '@typescript-eslint'], // Include TypeScript plugin
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    // React-specific rules
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // TypeScript-specific rules
    '@typescript-eslint/no-unused-vars': 'warn', // Warn for unused variables
    '@typescript-eslint/explicit-function-return-type': 'off', // Disable enforcing return types
    '@typescript-eslint/ban-ts-comment': 'warn', // Warn on @ts-ignore usage
    '@typescript-eslint/no-explicit-any': 'warn', // Warn when using the 'any' type
  },
}
