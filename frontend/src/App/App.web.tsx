import { Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { Provider as ReduxProvider } from 'react-redux'
import { createClientProvider as createKeepClientProvider } from '@inventi/keep'
import { Store } from 'redux'
import BareApp from './BareApp'

interface Props {
  store: Store
  history: History
}

const KeepClientProvider = createKeepClientProvider()

const AppWeb = ({ store, history }: Props): JSX.Element => (
  <KeepClientProvider>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <Router history={history}>
          <BareApp />
        </Router>
      </ConnectedRouter>
    </ReduxProvider>
  </KeepClientProvider>
)

export default AppWeb
