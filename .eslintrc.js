module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'space-before-blocks': 0,
    'keyword-spacing': 0,
    'space-infix-ops': 0,
    'no-trailing-spaces': 0,
    'padded-blocks': 0,
    'semi': 0,
    'arrow-spacing': 0,
    'key-spacing': 0,
    'no-undef': 0,
    'object-property-newline': 0,
    'indent': 0,
    'object-curly-spacing': 0,
    'handle-callback-err':0
  }
}
