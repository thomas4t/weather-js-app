import flow from 'lodash/flow'
import { put, call } from 'redux-saga/effects'
import { actions, promiseControlSymbol, FetchAction } from '@inventi/keep'
import { defaultTransform, makeAxiosRequest } from './utils'

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

function* restFetch(fetchAction: FetchAction, { transform, ...overriddenActionProps }: Options = {}): Generator {
  const promiseControl = fetchAction[promiseControlSymbol]
  const { key: keyFromAction, args: argsFromAction } = fetchAction
  const key = overriddenActionProps?.key || keyFromAction
  const args = overriddenActionProps?.args ? mergeByRewriting(argsFromAction, overriddenActionProps?.args) : argsFromAction

  console.log('restFetch args: ', args)
  const [method, url, payload] = args
  try {
    const responseData: any = yield call(() => makeAxiosRequest(method, url, payload))
    const data = transform ? composableTransform(transform)(responseData) : responseData
    yield put(actions.fetchSuccess(key, args, data, promiseControl))
  } catch (e) {
    // ... add formatApiError(e)
    yield put(actions.fetchError(key, args, String(e), promiseControl))
  }
}

export default restFetch
