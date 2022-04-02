import { createRef, RefObject, useState } from 'react'
import { ColumnDefinition, RowValues } from '../../types'

type Refs = { [key: string]: RefObject<HTMLInputElement> }

type UseFormRefsReturn = [Refs, () => RowValues]

const useFormRefs = (columns?: ColumnDefinition[]): UseFormRefsReturn => {
  const [refs] = useState<Refs>({})
  columns?.forEach((column) => {
    refs[column.name] = createRef<HTMLInputElement>()
  })
  const getValues = () => {
    const values: RowValues = {}
    columns?.forEach((column) => {
      values[column.name] = refs[column.name].current?.value
    })
    return values
  }
  return [refs, getValues]
}

export default useFormRefs
