module.exports = {
  env: {
    node: true,
    browser: false,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
  },
  plugins: ['mocha', '@typescript-eslint'],
  rules: {
    // override to not flag .js imports as errors
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'mocha/no-skipped-tests': 'error',
    'mocha/no-exclusive-tests': 'error',
  },
  settings: {
    'mocha/additionalCustomNames': [
      { name: 'describeModule', type: 'suite', interfaces: ['BDD'] },
      { name: 'testModule', type: 'testCase', interfaces: ['TDD'] },
    ],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json']
      },
    }
  },
};
