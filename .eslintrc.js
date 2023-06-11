module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'warn',
    'no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/require-default-props': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
  }
}
