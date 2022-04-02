import { MutableRefObject, useMemo, useRef } from 'react'
import { useFetch } from '@inventi/keep'
import { RowData, State } from '@components/organisms/Datagrid'

type UseDatagridFetchResult<T extends RowData> = {
  isLoading?: boolean
  error?: string
  rows?: T[]
  reload: () => void
}

export type UseDatagridFetchControllerRefObject = MutableRefObject<UseDatagridFetchResult<any>>

type UseDatagridFetchOptions = {
  args?: Record<string, any>
  fetchOptions?: Record<string, string>
  controllerRef?: UseDatagridFetchControllerRefObject
  state?: State
}

type UseDatagridFetchControllerReturn = UseDatagridFetchResult<any> & {
  ref: UseDatagridFetchControllerRefObject
}

export const useDatagridFetchController = (): UseDatagridFetchControllerReturn => {
  const ref = useRef<UseDatagridFetchResult<any>>({ reload: () => null })
  return {
    ref,
    reload: () => ref?.current?.reload?.(),
  }
}

const useDatagridFetch = <T extends RowData>(
  key: string,
  query: string,
  options?: UseDatagridFetchOptions,
  dependencies?: any[],
): UseDatagridFetchResult<T> => {
  const { args, fetchOptions, state } = options || {}
  // here's room for create filter query to filter on backend
  // eslint-disable-next-line @inventi/reinhard/no-data-hooks-in-basic-components-dirs
  const fetchResult = useFetch<T[]>(key, query, { ...args, state }, dependencies, fetchOptions, dependencies)
  const datagridResult = useMemo(() => ({ ...fetchResult, rows: fetchResult.data }), [fetchResult])
  if (options?.controllerRef) {
    // eslint-disable-next-line no-param-reassign
    options.controllerRef.current = datagridResult
  }
  return datagridResult
}

export default useDatagridFetch
