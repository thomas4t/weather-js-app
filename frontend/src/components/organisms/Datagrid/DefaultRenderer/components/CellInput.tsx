import React, { forwardRef } from 'react'
import { ColumnDefinition } from '../../types'
import { getInputPlaceholder, getInputType } from '../utils/inputPropsUtils'
import BaseInput from './BaseInput'

type Props = {
  column: ColumnDefinition
  icons?: JSX.Element[] | JSX.Element
  className?: string
}
const CellInput = ({ column, icons, className }: Props, ref?: React.Ref<unknown>): JSX.Element => {
  const type = column.filteringSettings?.type

  return <BaseInput ref={ref} type={getInputType(type)} placeholder={getInputPlaceholder(type)} icons={icons} className={className} />
}
export default forwardRef(CellInput)
