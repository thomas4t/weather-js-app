import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { Store } from 'redux'
import BareApp from './BareApp'

interface Props {
  url: string
  routerContext: object // eslint-disable-line @typescript-eslint/ban-types
  store: Store
}

const AppSsr = ({ store, routerContext, url }: Props): JSX.Element | null => {
  if (process.env.SSR_DISABLED) return null
  // if you need to completely omit compilation of server code, delete rest of the code of this function, return null
  // and then delete unused import statements
  return (
    <ReduxProvider store={store}>
      <StaticRouter context={routerContext} location={url}>
        <BareApp />
      </StaticRouter>
    </ReduxProvider>
  )
}

export default AppSsr
