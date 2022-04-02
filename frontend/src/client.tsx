/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-import-module-exports */
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import * as Sentry from '@sentry/browser'
import history from '@utils/history'
import createStore from '@store/createStore'
import getRuntimeConfig from '@utils/getRuntimeConfig'
import App from './App/App.web'

if (getRuntimeConfig('isProduction')) {
  const dsn = getRuntimeConfig('FRONTEND__SENTRY_DSN')
  if (!dsn) console.warn('Sentry credentials are missing in production mode! Please set FRONTEND__SENTRY_DSN.')
  Sentry.init({
    dsn,
    environment: getRuntimeConfig('APP_ENV'),
    release: getRuntimeConfig('APP_VERSION'),
    maxBreadcrumbs: 25,
    ignoreErrors: ['ResizeObserver loop limit exceeded'],
  })
} else if (!window.localStorage.debug) {
  window.localStorage.setItem('debug', getRuntimeConfig('DEBUG'))
}

const preloadedState = window.__PRELOADED_STATE__
const store = createStore(preloadedState, history)

loadableReady().then(() => {
  hydrate(<App store={store} history={history} />, document.getElementById('root'))
})

if (module.hot) {
  module.hot.accept()
}
