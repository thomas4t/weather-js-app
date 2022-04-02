import axios, { Method } from 'axios'
import get from 'lodash/get'
import { Action } from 'redux'
import { actionTypes } from '@inventi/keep'
import getRuntimeConfig from '../utils/getRuntimeConfig'

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

// auth token not needed atm, simple fetch
export const makeAxiosRequest = async (method: Method, url: string, variables?: { [key: string]: any }): Promise<any> => {
  const { data } = await axios({
    method,
    url,
    data: variables,
  })
  return data
}
