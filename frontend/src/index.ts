/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable import/no-import-module-exports */
import express from 'express'

let app = require('./server').default // eslint-disable-line @typescript-eslint/no-var-requires

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      app = require('./server').default // eslint-disable-line @typescript-eslint/no-var-requires
    } catch (error) {
      console.error(error)
    }
  })
  console.info('✅  Server-side HMR Enabled!')
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

export default express()
  .use((req, res) => app.handle(req, res))
  // @ts-ignore
  .listen(port, (err: Error) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`> App started http://localhost:${port}`)
  })
