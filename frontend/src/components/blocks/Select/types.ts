/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import { SelectComponentsConfig, GroupBase, StylesConfig } from 'react-select'

export type SelectOption<Value> = {
  value: Value
  label: string | JSX.Element
}

type SelectComponents<TOption = unknown> = Partial<SelectComponentsConfig<TOption, boolean, GroupBase<TOption>>>

export type SelectProps<Value> = {
  value?: Value | Value[]
  defaultValue?: Value | Value[]
  onChange?: (value: SelectOption<Value>) => void
  options?: SelectOption<Value>[]
  name?: string
  isMulti?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  closeMenuOnSelect?: boolean
  hideSelectedOptions?: boolean
  loadOptions?: (text: string) => Promise<SelectOption<Value>[]>
  placeholder?: string | React.ReactElement
  disabled?: boolean
  defaultMenuIsOpen?: boolean
  components?: SelectComponents
  styles?: StylesConfig<any, any, any>
}

export type { StylesConfig }
