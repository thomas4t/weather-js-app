import { ActionTypes, ColumnDefinition, FilteringComparators } from './types'

const actions = {
  [ActionTypes.toggleFilters]: (show: boolean) => ({ type: ActionTypes.toggleFilters, show }),
  [ActionTypes.rowChangeMode]: (mode: string | null, id: string) => ({ type: ActionTypes.rowChangeMode, mode, id }),
  [ActionTypes.rowAdd]: (row: Record<string, any>) => ({ type: ActionTypes.rowAdd, row }),
  [ActionTypes.setFilter]: (column: ColumnDefinition, value: any, comparator: FilteringComparators = FilteringComparators.contains) => ({
    type: ActionTypes.setFilter,
    columnName: column.name,
    value,
    comparator,
    dataPath: column.dataPath,
  }),
  [ActionTypes.toggleRowSelected]: (id: string) => ({ type: ActionTypes.toggleRowSelected, id }),
}

export default actions
