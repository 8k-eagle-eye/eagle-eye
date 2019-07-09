module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  overrides: [
    {
      files: ['./frontend/next.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['react-hooks'],
  root: true,
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
