import React, { RefObject } from 'react'
import Icon from '@components/elements/Icon'
import getColumnValue from '../../utils/getColumnValue'
import { ColumnDefinition, RowData, State, StateChange } from '../../../types'
import CellInput from '../CellInput'
import ContentCell from './ContentCell'

type ContentCellEditProps = {
  column: ColumnDefinition
  inputRefs: { [key: string]: RefObject<HTMLInputElement> }
}

const ContentCellEdit = ({ column, inputRefs }: ContentCellEditProps): JSX.Element => (
  <ContentCell>
    <CellInput column={column} ref={inputRefs[column.name]} icons={<Icon icon="edit" fill="primary1" />} />
  </ContentCell>
)

type ContentCellWithValueProps = {
  uxState: State['uxState']
  column: ColumnDefinition
  rowData: RowData
  stateChange: StateChange
  inputRefs: { [key: string]: RefObject<HTMLInputElement> }
}

const ContentCellWithValue = ({ uxState, column, rowData, inputRefs, stateChange }: ContentCellWithValueProps): JSX.Element => {
  if (column.contentCellComponent) {
    const Component = column.contentCellComponent
    return <Component rowData={rowData} cellComponent={ContentCell} stateChange={stateChange} uxState={uxState} />
  }
  if (uxState?.rowMode === 'edit' && uxState?.affectedRowId === rowData.id) {
    return <ContentCellEdit column={column} inputRefs={inputRefs} />
  }
  const value = getColumnValue(column, rowData)
  return <ContentCell>{value}</ContentCell>
}

export default ContentCellWithValue
