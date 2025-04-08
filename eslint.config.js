import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    unocss: true,
    react: true,
    jsx: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
      overrides: {
        'style/comma-dangle': ['error', 'always-multiline'],
        'style/array-bracket-newline': ['error', { multiline: true, minItems: 3 }],
        'style/function-call-argument-newline': ['error', 'consistent'],
        'style/brace-style': [
          'error',
          '1tbs',
          { allowSingleLine: true },
        ],
        'style/max-statements-per-line': ['error', { max: 2 }],
        'style/jsx-self-closing-comp': ['error', { component: true, html: true }],
        'style/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
        'style/wrap-regex': 'error',
        'style/member-delimiter-style': 'error',
      },
    },
    typescript: {
      overrides: {
        'ts/no-redeclare': 'off',
        'ts/no-namespace': 'off',
        'ts/array-type': ['error', { default: 'array' }],
      },
    },
    lessOpinionated: true,
    rules: {
      'antfu/no-top-level-await': 'off',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      'jsdoc/check-param-names': 'off',

      'import/no-cycle': ['error', { maxDepth: '∞' }],

      'node/handle-callback-err': ['error', '^(err|error)$'],

      'unicorn/throw-new-error': 'off',
      'unicorn/no-await-expression-member': 'error',
    },
  },
  {
    files: ['.generated/**/*'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
  {
    files: ['index.html', 'README.md'],
    rules: {
      'format/prettier': 'off',
    },
  },
)
