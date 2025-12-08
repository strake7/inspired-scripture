const nextConfig = require('eslint-config-next')
const prettier = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')

module.exports = [
  ...nextConfig,
  prettierConfig,
  {
    plugins: {
      prettier,
    },

    rules: {
      'prettier/prettier': 'error',
      'react/no-unescaped-entities': 0,
    },
  },
]
