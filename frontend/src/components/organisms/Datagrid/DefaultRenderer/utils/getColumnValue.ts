import get from 'lodash/fp/get'
import { ColumnDefinition, RowData } from '../../types'

const getColumnValue = <T extends RowData>(column: ColumnDefinition<T>, rowData: T): string | number | JSX.Element | null => {
  if (column.formatRowValue) {
    const value = column.formatRowValue(rowData)
    return value || null
  }

  return get(column.dataPath || column.name)(rowData)
}

export default getColumnValue
