module.exports = {
  extends: ['@inventi/node'],
  plugins: ['@inventi/doc'],
  rules: {
    // Documentation file requirement
    '@inventi/doc/require-doc': [
      'error',
      {
        directories: ['src/App'],
        ignore: '**/acl',
        templateFile: 'src/MODULE_README_TEMPLATE.md',
      },
    ],
  },
}
