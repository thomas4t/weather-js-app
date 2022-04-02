import { Route, Switch } from 'react-router-dom'
import Layout from '@layouts/Default'
import Error404 from '@pages/Error404'
import routes from '@pages'
import ScrollToTop from '@utils/components/ScrollToTop'
import RouteStatus from '@utils/components/RouteStatus'
import ThemeProvider from '@inventi/theme'
import { LinguiProviderRedux } from '@components/providers/LinguiProvider'
import { defaultTheme } from './settings/theme'
import FaultBarrier from './FaultBarrier'

const routesArray = Object.entries(routes)

// preload routes in dev mode and SSR
if (typeof window === 'undefined' && process.env.WEBPACK_DEV_SERVER) {
  routesArray.map(([, route]) => route.component.preload())
}

const App = (): JSX.Element => (
  <FaultBarrier>
    <LinguiProviderRedux>
      <ThemeProvider theme={defaultTheme}>
        <Layout>
          <ScrollToTop />
          <Switch>
            {routesArray.map(([key, route]) => (
              <Route key={key} {...route.extraProps} path={route.route.path} render={route.render} />
            ))}
            <RouteStatus statusCode={404}>
              <Route component={Error404} />
            </RouteStatus>
          </Switch>
        </Layout>
      </ThemeProvider>
    </LinguiProviderRedux>
  </FaultBarrier>
)

export default App
