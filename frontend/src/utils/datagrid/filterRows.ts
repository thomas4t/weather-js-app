import { FilteringComparators, RowData, State } from '@components/organisms/Datagrid'
import toLower from 'lodash/toLower'
import get from 'lodash/fp/get'

const getColumnValueDefault = <T extends RowData>(columnName: string, dataPath: string | undefined, rowData: T): string => get(dataPath || columnName)(rowData)

const filterRows = <T extends RowData>(state: State, rows?: T[], getColumnValue: typeof getColumnValueDefault = getColumnValueDefault): T[] | undefined => {
  let filteredRows = rows
  if (state.filter) {
    Object.entries(state.filter).forEach(([columnName, { value, comparator, dataPath }]) => {
      if (String(value) !== '' && comparator === FilteringComparators.contains) {
        filteredRows = filteredRows?.filter((row) => {
          const columnValue = getColumnValue(columnName, dataPath, row)
          return `${toLower(String(columnValue))}`.includes(toLower(String(value)))
        })
      }
    })
  }
  return filteredRows
}

export default filterRows
