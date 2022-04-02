import { put, call, select } from 'redux-saga/effects'
import { actions, promiseControlSymbol, FetchAction } from '@inventi/keep'
import getAuthorizationToken from '@store/user/getAuthorizationToken'
import { getQuery, defaultTransform, makeRequest, formatApiError } from './utils'

function* mutate(fetchAction: FetchAction, extraData?: Record<string | number | symbol, unknown>): Generator {
  const token = getAuthorizationToken(yield select())
  const promiseControl = fetchAction[promiseControlSymbol]
  const { key, args } = fetchAction
  const [endpoint, params, payload] = args
  try {
    const responseData: any = yield call(() => makeRequest(getQuery(endpoint, params, payload), fetchAction?.payload, token))
    const data = { ...defaultTransform(responseData), ...extraData }
    yield put(actions.mutateSuccess(key, args, data, promiseControl))
  } catch (e) {
    console.error(e)
    yield put(actions.mutateError(key, args, formatApiError(e), promiseControl))
  }
}

export default mutate
