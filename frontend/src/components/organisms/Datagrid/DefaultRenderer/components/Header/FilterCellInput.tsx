import React, { useCallback, useContext, useMemo } from 'react'
import debounce from 'lodash/debounce'
import Icon from '@components/elements/Icon'
import { ColumnDefinition } from '../../../types'
import DatagridContext from '../../../DatagridContext'
import { getInputPlaceholder, getInputType } from '../../utils/inputPropsUtils'
import BaseInput from '../BaseInput'

type Props = {
  column: ColumnDefinition
}

const InputCell = ({ column }: Props): JSX.Element => {
  const type = column?.filteringSettings?.type
  const { setFilter } = useContext(DatagridContext)

  const handleOnChange = useCallback(
    (event): void => {
      setFilter(column, event?.target?.value)
    },
    [column, setFilter],
  )
  const handleOnChangeDebounced = useMemo(() => debounce(handleOnChange, 300, { trailing: true }), [handleOnChange])

  return (
    <BaseInput
      icons={<Icon icon="Funnel" fill="primary1" width="0.9em" height="0.9em" />}
      type={getInputType(type)}
      placeholder={getInputPlaceholder(type)}
      onChange={handleOnChangeDebounced}
    />
  )
}

export default InputCell
