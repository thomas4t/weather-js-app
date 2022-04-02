import get from 'lodash/get'
import { Action } from 'redux'
import { actionTypes } from '@inventi/keep'
import { GraphQLClient, ClientError } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import queries from '../queries'
import getRuntimeConfig from '../utils/getRuntimeConfig'

export const isActionFetchRequestedFor =
  (key: string) =>
  (action: Action): boolean =>
    action.type === actionTypes.fetchStart && get(action, 'args[0]') === key

export const isActionFetchSucceededFor =
  (key: string) =>
  (action: Action): boolean =>
    action.type === actionTypes.fetchSuccess && get(action, 'args[0]') === key

export const isActionMutationRequestedFor =
  (key: string) =>
  (action: Action): boolean =>
    action.type === actionTypes.mutateStart && get(action, 'args[0]') === key

export const isActionMutationSucceededFor =
  (key: string) =>
  (action: Action): boolean =>
    action.type === actionTypes.mutateSuccess && get(action, 'args[0]') === key

export const isActionMutationFailedFor =
  (key: string) =>
  (action: Action): boolean =>
    action.type === actionTypes.mutateError && get(action, 'args[0]') === key

const graphqlApiEndpoint =
  typeof window !== 'undefined' ? getRuntimeConfig('FRONTEND__GRAPHQL_ENDPOINT_URL') : process.env.FRONTEND__GRAPHQL_ENDPOINT_URL_SERVER

export const getQuery = (queryName: string, ...args: any[]): any => {
  const query: (args: any[]) => string | undefined = queries[queryName]
  if (!query) throw new Error(`Cannot found query ${queryName}.`)
  return query(args)
}

export const makeRequest = async (document: RequestDocument, variables?: { [key: string]: any }, token?: string | null): Promise<any> => {
  const shouldNotUseToken = typeof document === 'string' && document.includes('mutation login')
  const client = new GraphQLClient(graphqlApiEndpoint) // TODO: memoize
  if (token && !shouldNotUseToken) client.setHeader('Authorization', `Bearer ${token}`)
  // @ts-ignore
  const { data, extensions /* , errors, headers, status */ } = await client.rawRequest(document, variables)
  Object.values(extensions?.warnings || []).map((warning: any) => console.warn(`makeRequest: ${warning?.message} -> (${JSON.stringify(warning?.path)})`))
  return data
}

export const formatApiError = (e: ClientError | Error | any): string =>
  e?.response?.errors ? JSON.parse(JSON.stringify(e?.response?.errors))[0]?.message : JSON.stringify(e?.message)

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
