import React, { useMemo, useState, useCallback } from 'react'
import ReactSelect from 'react-select'
import ReactSelectAsync from 'react-select/async'
import { useTheme, x } from '@xstyled/styled-components'
import { SelectProps, SelectOption } from './types'
import DropdownIndicator from './DropdownIndicator'
import createOverrideStyles from './styles'

const useFormatValues = <Value,>({
  options,
  isMulti,
  defaultValue,
  value,
}: Pick<SelectProps<Value>, 'options' | 'isMulti' | 'defaultValue' | 'value'>): {
  defaultValue?: SelectOption<Value>
  value?: SelectOption<Value> | (SelectOption<Value> | undefined)[]
} => {
  const hasDefaultValue = !!defaultValue
  const defaultOption = useMemo(() => {
    if (!hasDefaultValue) return undefined
    return options?.find((option) => option.value === defaultValue)
  }, [hasDefaultValue, options, defaultValue])
  const selectedOption = useMemo(() => {
    if (!value || !options?.length) return undefined
    if (isMulti && Array.isArray(value)) {
      return value.map((selectedOption: Value) => options?.find((option) => option.value === selectedOption))
    }
    return options?.find((option) => option.value === value)
  }, [value, options, isMulti])
  const valueProps = useMemo(() => {
    if (hasDefaultValue) return { defaultValue: defaultOption }
    return { value: selectedOption || ([] as SelectOption<Value>[]) }
  }, [hasDefaultValue, selectedOption, defaultOption])
  return valueProps
}

// eslint-disable-next-line react/function-component-definition
function Select<Value>({
  onChange,
  value,
  defaultValue,
  name,
  options,
  isMulti,
  isClearable,
  isSearchable,
  closeMenuOnSelect,
  hideSelectedOptions,
  loadOptions,
  placeholder,
  disabled,
  components,
  ...props
}: SelectProps<Value>): JSX.Element {
  const [innerValue, setInnerValue] = useState<SelectProps<Value>['value']>(value || defaultValue)
  const { defaultValue: defaultValueFormatted, value: valueFormatted } = useFormatValues<Value>({
    options,
    isMulti,
    value: innerValue,
    defaultValue,
  })
  const onChangeEnhanced = useCallback(
    (option: SelectOption<Value>) => {
      setInnerValue(option?.value)
      onChange?.(option)
    },
    [setInnerValue, onChange],
  )

  const theme = useTheme()
  const isAsync = !!loadOptions
  const RenderComponent = (isAsync ? ReactSelectAsync : ReactSelect) as React.ElementType
  const componentsMemoized = useMemo(() => ({ DropdownIndicator, ...components }), [DropdownIndicator, components])

  return (
    <x.div>
      <RenderComponent
        styles={createOverrideStyles(theme)}
        components={componentsMemoized}
        options={options}
        defaultOptions={options}
        name={name}
        defaultValue={defaultValueFormatted}
        value={valueFormatted}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={loadOptions || isSearchable}
        onChange={onChangeEnhanced}
        closeMenuOnSelect={closeMenuOnSelect}
        hideSelectedOptions={hideSelectedOptions}
        loadOptions={loadOptions}
        placeholder={placeholder}
        isDisabled={disabled}
        {...props}
      />
    </x.div>
  )
}

export default Select
