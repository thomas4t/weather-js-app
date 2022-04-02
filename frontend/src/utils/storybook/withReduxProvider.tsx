import { Provider } from 'react-redux'
import createStore from '@store/createStore'
import history from '@utils/history'

// eslint-disable-next-line react/display-name
export const withProvider =
  (initialState: Record<string, any> = {}) =>
  (Story: React.ComponentType): JSX.Element => {
    const store = createStore(initialState, history)
    return (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  }

export default withProvider
