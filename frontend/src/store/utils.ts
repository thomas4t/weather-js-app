import get from 'lodash/get'
import { Action } from 'redux'
import { actionTypes } from '@inventi/keep'
import getRuntimeConfig from '../utils/getRuntimeConfig'
import axios, { Method } from 'axios'

export const isActionFetchRequestedFor =
  (key: string) =>
  (action: Action): boolean =>
    action.type === actionTypes.fetchStart && get(action, 'args[0]') === key

export const isActionFetchSucceededFor =
  (key: string) =>
  (action: Action): boolean =>
    action.type === actionTypes.fetchSuccess && get(action, 'args[0]') === key

export const isActionFetchFailedFor =
  (key: string) =>
  (action: Action): boolean =>
    action.type === actionTypes.fetchError && get(action, 'args[0]') === key

export const weatherApiEndpoint =
  typeof window !== 'undefined' ? getRuntimeConfig('FRONTEND__OPENWEATHERMAP_ENDPOINT_URL') : process.env.FRONTEND__OPENWEATHERMAP_ENDPOINT_URL

export const weatherApiKey = typeof window !== 'undefined' ? getRuntimeConfig('FRONTEND__OPENWEATHERMAP_APIKEY') : process.env.FRONTEND__OPENWEATHERMAP_APIKEY

// token not needed atm
export const makeAxiosRequest = async (method: Method, url: string, variables?: { [key: string]: any }): Promise<any> => {
  const { data } = await axios({
    method,
    url,
    data: variables,
  })
  return data
}

// export const formatApiError = (e: ClientError | Error | any): string =>
//   e?.response?.errors ? JSON.parse(JSON.stringify(e?.response?.errors))[0]?.message : JSON.stringify(e?.message)

export const getFirstObjectProperty = (obj: Record<string, any> = {}): any => {
  const keys = Object.keys(obj)
  if (keys.length !== 1) return obj
  return obj[keys[0]]
}

export const defaultTransform = (responseData?: Record<string | number | symbol, unknown>): any => {
  // try to unwrap = get first object prop if only one
  const first = getFirstObjectProperty(responseData)
  return first?.edges || first
}
