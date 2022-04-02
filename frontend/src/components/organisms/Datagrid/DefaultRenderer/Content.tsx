import React, { useCallback, useContext } from 'react'
import { x } from '@xstyled/styled-components'
import { DatagridProps } from '../types'
import DatagridContext from '../DatagridContext'
import actions from '../actions'
import useFormRefs from './utils/useFormRefs'
import ContentCell from './components/Content/ContentCell'
import ContentRow from './components/Content/ContentRow'
import ContentRowAdding from './components/Content/ContentRowAdding'
import ContentCellWithValue from './components/Content/ContentCellWithValue'

type ContentProps = {
  rowsData: DatagridProps['rowsData']
  isLoading?: boolean
  error?: string
}

const Content = ({ rowsData, isLoading, error }: ContentProps): JSX.Element => {
  const { columns, state, stateChange } = useContext(DatagridContext)
  const uxState = state?.uxState
  const [rowAddRefs, rowAddGetValues] = useFormRefs(columns)
  const [rowEditRefs, rowEditGetValues] = useFormRefs(columns)
  const addRow = useCallback(() => stateChange(actions.rowAdd(rowAddGetValues())), [rowAddGetValues, stateChange])

  if (isLoading) return <x.div>loading ...</x.div>
  if (error) return <x.div>An error occurred: {error}</x.div>

  return (
    <>
      {rowsData?.map((rowData) => (
        <ContentRow key={`contentRow-${rowData.id}`}>
          {columns
            ?.filter((column) => !column.buttons)
            .map((column) => (
              <ContentCellWithValue
                key={`${rowData.id}-${column.name}`}
                uxState={uxState}
                column={column}
                rowData={rowData}
                stateChange={stateChange}
                inputRefs={rowEditRefs}
              />
            ))}
          {columns
            ?.filter((column) => column.buttons)
            .map((column) => (
              <ContentCell key={`buttons-${rowData.id}`} justifyContent="flex-end">
                {column.buttons?.map((ButtonComponent, i) => (
                  <ButtonComponent
                    // eslint-disable-next-line react/no-array-index-key
                    key={`buttons-${rowData.id}-${ButtonComponent.name}-${i}`}
                    rowData={rowData}
                    state={state}
                    stateChange={stateChange}
                    getRowValues={rowEditGetValues}
                  />
                ))}
              </ContentCell>
            ))}
        </ContentRow>
      ))}
      {/* adding a new row */}
      {uxState?.isRowAddingVisible && <ContentRowAdding columns={columns} refs={rowAddRefs} onAddRow={addRow} />}
    </>
  )
}

export default Content
