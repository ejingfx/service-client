module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'arrow-parens': [2, 'as-needed']
  }
}
