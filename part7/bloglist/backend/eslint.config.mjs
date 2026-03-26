import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      eqeqeq: 'error',
    },
  },
  eslintConfigPrettier,
]);
