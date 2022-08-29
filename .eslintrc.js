module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'comma-dangle': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'no-nested-ternary': 'off',
    'no-use-before-define': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'prefer-const': 'off',
    'max-len': 'off',
    'linebreak-style': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
