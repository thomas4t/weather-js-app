import 'regenerator-runtime/runtime'
import path from 'path'
import express from 'express'
import { renderToString } from 'react-dom/server'
import * as Sentry from '@sentry/node'
import pickBy from 'lodash/pickBy'
import startsWith from 'lodash/startsWith'
import serialize from 'serialize-javascript' // Safer stringify, prevents XSS attacks
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { createServerHistory } from '@utils/history'
import createStore from '@store/createStore'
import { serverRender } from '@inventi/keep'
import App from './App/App.ssr' // eslint-disable-line import/newline-after-import
const config = require('dotenv').config() // eslint-disable-line @typescript-eslint/no-var-requires

const isProduction = process.env.NODE_ENV === 'production'
const envConfig: { [key: string]: any } = {
  DEBUG: process.env.DEBUG,
  APP_ENV: process.env.APP_ENV,
  APP_VERSION: process.env.APP_VERSION,
  isProduction,
  ...config.parsed, // directly from .env file in frontend folder
  ...pickBy(process.env, (value, key) => startsWith(key, 'FRONTEND__')),
}

if (isProduction) {
  Sentry.init({
    dsn: envConfig.FRONTEND__SENTRY_DSN,
    environment: envConfig.APP_ENV,
    release: envConfig.APP_VERSION,
  })
}

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || '') // eslint-disable-line
// We create an extractor from the statsFile
const extractor = new ChunkExtractor({
  statsFile: path.resolve('build/loadable-stats.json'),
  // razzle client bundle entrypoint is client.js
  entrypoints: ['client'],
})

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', async (req: express.Request, res: express.Response) => {
    const context = {}
    const history = createServerHistory(req.url)
    const store = createStore({}, history)
    const sheet = new ServerStyleSheet() // styled components SSR

    const FinalSSRApp = (): JSX.Element => (
      <ChunkExtractorManager extractor={extractor}>
        <App store={store} routerContext={context} url={req.url} />
      </ChunkExtractorManager>
    )
    let html = ''
    let serverDataHtml = ''
    try {
      const result = await serverRender(FinalSSRApp, (app: React.ReactElement) => renderToString(sheet.collectStyles(app)))
      html = result[0] // eslint-disable-line prefer-destructuring
      serverDataHtml = result[1] || ''
    } catch (e) {
      if (process.env.NODE_ENV !== 'test') console.error(`Server render on URL ${req.url}`, 'caught an error', e) // to have it on stderr
      Sentry.setExtra('url', req.url)
      Sentry.captureException(e)
    }
    const preloadedState = store.getState() // Grab the initial state from our Redux store
    res.send(
      `<!doctype html>
      <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet='utf-8' />
            <title>Weather js app</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${extractor.getLinkTags()}
            ${extractor.getStyleTags()}
            ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
            ${sheet.getStyleTags()}
            <!-- sse -->
            ${serverDataHtml}
            <script>
              window.env = ${serialize(envConfig)};
              window.__PRELOADED_STATE__ = ${serialize(preloadedState)};
            </script>
            ${extractor.getScriptTags()}
        </head>
        <body>
            <div id="root">${html}</div>
        </body>
      </html>`,
    )
  })

export default server
