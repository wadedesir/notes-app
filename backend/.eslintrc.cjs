module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: 'standard',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'cypress*', '*.test.js', 'coverage'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}
