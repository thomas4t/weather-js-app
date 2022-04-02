import { InputType } from '@components/elements/Input'
import { FilteringType } from '../../types'

export const getInputPlaceholder = (type?: FilteringType): string => {
  if (type === FilteringType.date) return 'Enter date'
  if (type === FilteringType.numeric) return 'Enter number'
  return 'Enter'
}

export const getInputType = (type?: FilteringType): InputType => {
  if (type === FilteringType.numeric) return InputType.numeric
  return InputType.text
}
