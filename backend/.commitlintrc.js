module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'perf', 'BREAKING CHANGE', 'ci', 'docs', 'chore', 'refactor', 'revert', 'test']],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
  },
}
