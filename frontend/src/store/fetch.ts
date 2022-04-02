import flow from 'lodash/flow'
import { put, call, select } from 'redux-saga/effects'
import { actions, promiseControlSymbol, FetchAction } from '@inventi/keep'
import getAuthorizationToken from '@store/user/getAuthorizationToken'
import { getQuery, defaultTransform, makeRequest, formatApiError } from './utils'

type Transform = (data: any) => any

type Options = {
  transform?: Transform | Transform[]
  key?: FetchAction['key']
  args?: FetchAction['args']
}

const mergeByRewriting = (arrayOne: any[], arrayTwo: any[]) => {
  const merged = arrayOne.map((item, index) => (typeof arrayTwo[index] !== 'undefined' ? arrayTwo[index] : item))
  return [...merged, ...arrayTwo.slice(arrayOne.length)]
}

const composableTransform = (transform: Transform | Transform[]) => (data: any) => {
  if (Array.isArray(transform)) {
    return flow(transform)(data) // reverse - because flow runs from the end
  }
  return transform(data)
}

function* fetch(fetchAction: FetchAction, { transform, ...overriddenActionProps }: Options = {}): Generator {
  const token = getAuthorizationToken(yield select())
  const promiseControl = fetchAction[promiseControlSymbol]
  const { key: keyFromAction, args: argsFromAction } = fetchAction
  const key = overriddenActionProps?.key || keyFromAction
  const args = overriddenActionProps?.args ? mergeByRewriting(argsFromAction, overriddenActionProps?.args) : argsFromAction
  const [endpoint, variables, ...otherArgs] = args
  try {
    const responseData: any = yield call(() => makeRequest(getQuery(endpoint, ...otherArgs), variables, token))
    const data = transform ? composableTransform(transform)(responseData) : defaultTransform(responseData)
    yield put(actions.fetchSuccess(key, args, data, promiseControl))
  } catch (e) {
    yield put(actions.fetchError(key, args, formatApiError(e), promiseControl))
  }
}

export default fetch
