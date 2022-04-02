import loadable from '@loadable/component'
import { createReactRoute } from '@inventi/create-route'
import Loading from './Loading'

const LoadingPage = <Loading />
const Homepage = loadable(() => import('./Homepage'), {
  fallback: LoadingPage,
})
const Example = loadable(() => import('./Example'), {
  fallback: LoadingPage,
})
const Forecast = loadable(() => import('./Forecast'), {
  fallback: LoadingPage,
})
const DatagridPage = loadable(() => import('./DatagridPage'), {
  fallback: LoadingPage,
})
const Login = loadable(() => import('./Login'), {
  fallback: LoadingPage,
})
/* PLOP_INJECT_NEXT_IMPORT */

const routes = {
  Homepage: createReactRoute('/', {}, Homepage, { exact: true }),
  Example: createReactRoute('/example', {}, Example, { exact: true }),
  Forecast: createReactRoute('/forecast', {}, Forecast, { exact: true }),
  DatagridPage: createReactRoute('/datagrid-page', {}, DatagridPage, { exact: true }),
  Login: createReactRoute('/login', {}, Login, { exact: true }),
  /* PLOP_INJECT_NEXT_ROUTE */
}

export default routes
