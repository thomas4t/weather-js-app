module.exports = {
  platform: 'gitlab',
  endpoint: 'https://git.inventi.cz/api/v4/',
  assignees: ['adam.bisek'],
  baseBranches: ['develop'],
  gitAuthor: "RenovateBot <chucknorris@inventi.cz>",
  labels: ['renovate'],
  extends: ['config:base'],
  autodiscover: true,
  branchPrefix: 'renovate-', // overrides default "renovate/", it caused problems in our gitlab like this: cannot lock ref 'refs/remotes/origin/renovate/abc': 'refs/remotes/origin/renovate' exists;
  logFile: "renovate.log.json",
}
