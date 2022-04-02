import { takeEvery, call, put, fork, delay } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import debug from 'debug'
import { t } from '@lingui/macro'
import { actions as notificationsActions } from '@store/notifications'
import { FetchAction, actions as keepActions } from '@inventi/keep'
import routes from '@pages/index'
import { isActionFetchRequestedFor, isActionMutationRequestedFor, isActionMutationSucceededFor } from '../utils'
import fetch from '../fetch'
import mutate from '../mutate'
import { actionTypes, actions } from './index'

const userDebug = debug('app:user')

function* fetchMe(action: FetchAction): Generator {
  yield fetch(action)
}

function* mutateLogin(action: FetchAction): Generator {
  yield mutate(action)
}

function* mutateLoginSuccess(action: FetchAction): Generator {
  yield put(actions.setLogin({ token: action?.payload?.token, exp: action?.payload?.exp }))

  yield put(notificationsActions.push(t({ id: 'notification.login.success', message: 'You have been succesfully logged in.' })))
  userDebug('Login successful', action?.payload)
  yield put(keepActions.fetchStart('user', ['me']))
  yield put(push(routes.Homepage.route.toUrl()))
}

function* onLoginSet(action: FetchAction): Generator {
  userDebug('onLoginSet', action?.payload)
  yield call([window.sessionStorage, window.sessionStorage.setItem], 'userToken', action?.payload?.token)
  yield call([window.sessionStorage, window.sessionStorage.setItem], 'userTokenRaw', JSON.stringify(action?.payload))
}

function* onLogout(action: FetchAction): Generator {
  yield call([window.sessionStorage, window.sessionStorage.removeItem], 'userToken')
  yield call([window.sessionStorage, window.sessionStorage.removeItem], 'userTokenRaw')
  userDebug('onLogout', action)
  yield put(push(routes.Login.route.toUrl()))
}

function* onAppLoad(): Generator {
  const userToken: any = yield call([window.sessionStorage, window.sessionStorage.getItem], 'userTokenRaw')
  const { token, exp } = JSON.parse(userToken) || {}
  yield delay(1)
  if (token) {
    userDebug('Initializing token from local storage', { token, exp })
    yield put(actions.setLogin({ token, exp }))
    yield put(keepActions.fetchStart('user', ['me']))
  }
}

export default function* watch(): Generator {
  if (typeof window !== 'undefined') yield fork(onAppLoad) // this saga is called one time on init
  yield takeEvery(actionTypes.setLogin, onLoginSet)
  yield takeEvery(actionTypes.logout, onLogout)
  yield takeEvery(isActionFetchRequestedFor('me'), fetchMe)
  yield takeEvery(isActionMutationRequestedFor('user:login'), mutateLogin)
  yield takeEvery(isActionMutationSucceededFor('user:login'), mutateLoginSuccess)
}
