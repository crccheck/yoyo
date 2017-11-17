if (process.env.SENTRY_DSN) {
  const Raven = require('raven')
  Raven.config(process.env.SENTRY_DSN, {
    captureUnhandledRejections: true,
  }).install()
}
