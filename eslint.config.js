import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
      },
    },
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },
  },
  {
    files: ['webpack.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  configPrettier,
];
