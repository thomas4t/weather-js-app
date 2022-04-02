import loadable from '@loadable/component'
import { createReactRoute } from '@inventi/create-route'
import Loading from './Loading'

const LoadingPage = <Loading />
const Homepage = loadable(() => import('./Homepage'), {
  fallback: LoadingPage,
})
const Forecast = loadable(() => import('./Forecast'), {
  fallback: LoadingPage,
})
const About = loadable(() => import('./About'), {
  fallback: LoadingPage,
})
/* PLOP_INJECT_NEXT_IMPORT */

const routes = {
  Homepage: createReactRoute('/', {}, Homepage, { exact: true }),
  Forecast: createReactRoute('/forecast', {}, Forecast, { exact: true }),
  DatagridPage: createReactRoute('/about', {}, About, { exact: true }),
  /* PLOP_INJECT_NEXT_ROUTE */
}

export default routes
