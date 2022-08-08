module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off'
  }
};
