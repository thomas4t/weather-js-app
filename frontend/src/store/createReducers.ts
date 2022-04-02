import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { reducer as keepReducer } from '@inventi/keep'
import ui from '@store/ui'
/* PLOP_INJECT_NEXT_IMPORT */

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    keep: keepReducer,
    ui,
    /* PLOP_INJECT_NEXT_REDUCER */
  })
