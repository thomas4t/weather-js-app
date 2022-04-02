import React, { useCallback } from 'react'
import { State, RowData, StateChange } from '../../../types'
import actions from '../../../actions'
import ContentCell from './ContentCell'

type ContentCellCheckboxProps = {
  uxState: State['uxState']
  rowData: RowData
  stateChange: StateChange
}
const ContentCellCheckbox = ({ uxState, rowData, stateChange }: ContentCellCheckboxProps): JSX.Element => {
  const onChange = useCallback(() => {
    stateChange(actions.toggleRowSelected(rowData.id))
  }, [stateChange, rowData.id])
  const isChecked: boolean = uxState?.affectedRows ? uxState.affectedRows[rowData.id] : false
  return (
    <ContentCell>
      <input type="checkbox" checked={isChecked || false} onChange={onChange} />
    </ContentCell>
  )
}

export default ContentCellCheckbox
