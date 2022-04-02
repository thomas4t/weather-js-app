import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { reducer as keepReducer } from '@inventi/keep'
import ui from '@store/ui'
import notificationsReducer from './notifications'
/* PLOP_INJECT_NEXT_IMPORT */

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    keep: keepReducer,
    notifications: notificationsReducer,
    ui,
    /* PLOP_INJECT_NEXT_REDUCER */
  })
