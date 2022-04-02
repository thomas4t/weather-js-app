import produce from 'immer'
import { Action, ActionTypes, State, StateReducer, FilteringComparators } from '../types'

const defaultReducer: StateReducer = (state: State, action: Action): State =>
  produce(state, (draft) => {
    if (!draft.uxState) draft.uxState = {}

    if (action.type === ActionTypes.toggleFilters) {
      draft.uxState.isFilteringVisible = action.show
    } else if (action.type === ActionTypes.rowChangeMode) {
      draft.uxState.rowMode = action.mode
      draft.uxState.affectedRowId = action.id
    } else if (action.type === ActionTypes.toggleRowSelected) {
      if (!draft.uxState.affectedRows) draft.uxState.affectedRows = {}
      draft.uxState.affectedRows[action.id] = draft.uxState.affectedRows[action.id] ? !draft.uxState.affectedRows[action.id] : true
    } else if (action.type === ActionTypes.setFilter) {
      if (!draft.filter) draft.filter = {}

      draft.filter[action.columnName] = {
        value: action.value,
        comparator: action.comparator || FilteringComparators.equals,
        dataPath: action.dataPath,
      }
    }
  })

export default defaultReducer
