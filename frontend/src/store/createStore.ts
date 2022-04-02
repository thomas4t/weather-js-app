import { createStore, applyMiddleware, compose, Store, Middleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import getRuntimeConfig from '@utils/getRuntimeConfig'
import { History } from 'history'
import createReducers from './createReducers'
import rootSaga from './rootSaga'

const isProduction = getRuntimeConfig('isProduction')
const createMiddlewares = (history: History): Middleware[] => [routerMiddleware(history)]

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = typeof window !== 'undefined' ? (!isProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose : compose

// eslint-disable-next-line @typescript-eslint/ban-types
export default (initialState: object, history: History): Store => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewaresToApply = [sagaMiddleware, ...createMiddlewares(history)]
  const enhancers = [applyMiddleware(...middlewaresToApply)]
  const store = createStore(createReducers(history), initialState, composeEnhancers(...enhancers))
  sagaMiddleware.run(rootSaga)
  return store
}
