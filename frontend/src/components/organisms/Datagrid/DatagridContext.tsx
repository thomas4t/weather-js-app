import React, { createContext, useMemo } from 'react'
import actions from './actions'
import { Action, ColumnDefinition, Context, State } from './types'

const emptyState: State = {}
const DatagridContext = createContext<Context>({ stateChange: () => null, state: emptyState, setFilter: () => null })

type ProviderProps = Omit<Context, 'stateChange' | 'setFilter'> & {
  stateChange?: Context['stateChange']
  children: React.ReactNode
}

export const Provider = ({ state, stateChange, columns, headerButtons, children }: ProviderProps): JSX.Element => {
  const stateChangeEhanced = React.useCallback((action: Action) => stateChange?.(action), [stateChange])
  const setFilter = React.useCallback((column: ColumnDefinition, value: any) => stateChange?.(actions.setFilter(column, value)), [stateChange])
  const contextValue: Context = useMemo(
    () => ({ state, columns, stateChange: stateChangeEhanced, setFilter, headerButtons }),
    [state, columns, stateChangeEhanced, setFilter, headerButtons],
  )
  return <DatagridContext.Provider value={contextValue}>{children}</DatagridContext.Provider>
}

export const { Consumer } = DatagridContext

export default DatagridContext
