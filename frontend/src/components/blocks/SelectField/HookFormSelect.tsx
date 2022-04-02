import React, { useCallback } from 'react'
import { useFormContext, useController, RegisterOptions } from 'react-hook-form'

type Props = {
  name: string
  component: React.ComponentType<any>
  rules: RegisterOptions
} & any

const HookFormSelect = ({ name, component: Component, rules, ...props }: Props) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules,
  })
  const onChangeForSelect = useCallback((option) => onChange(option.value), [onChange])

  return <Component name={name} value={value} onChange={onChangeForSelect} {...props} />
}

export default React.memo(HookFormSelect)
