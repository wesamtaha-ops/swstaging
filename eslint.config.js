import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] }, // Ensure to ignore `node_modules` for faster linting
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'], // Target TypeScript files
    languageOptions: {
      ecmaVersion: 2020, // Set ECMAScript version for parsing
      globals: globals.browser, // Include browser globals
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Enforce React hooks best practices
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'warn', // Downgrade no-unused-vars to a warning
      '@typescript-eslint/no-unused-vars': ['warn'], // Handle unused vars for TypeScript
      'react/react-in-jsx-scope': 'off', // Suppress React import warnings for JSX
      '@typescript-eslint/no-empty-function': 'off', // Ignore empty functions for flexibility
      '@typescript-eslint/explicit-function-return-type': 'off', // Optional function return types
    },
  },
);
