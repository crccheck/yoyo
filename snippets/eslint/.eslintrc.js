module.exports = {
  extends: 'standard',
  env: {
    mocha: true
  },
  rules: {
    // Lets you manipulate lines easier and have cleaner diffs
    'comma-dangle': ['error', 'always-multiline'],
    // Two blank lines allow for more legibile demarcation (PEP8)
    'no-multiple-empty-lines': ['error', {max: 2}],
    // This is often done in dev, and minification will clean it for prod anyways
    'no-unreachable': 'warn',
    // Allow underlines and Flow comment syntax
    'spaced-comment': ['error', 'always', {exceptions: ['/'], markers: [':', '::']}]
  }
}
