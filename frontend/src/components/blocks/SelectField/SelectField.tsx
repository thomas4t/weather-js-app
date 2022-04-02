import React, { forwardRef } from 'react'
import { x } from '@xstyled/styled-components'
import InputLabel, { InputVariant } from '@components/elements/InputLabel'
import Icon from '@components/elements/Icon'
import Select, { SelectProps } from '../../blocks/Select'

export type Props<Value> = SelectProps<Value> & {
  error?: string
  message?: string
}

// eslint-disable-next-line react/function-component-definition, @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
function SelectField<Value>({ error, message, ...props }: Props<Value>, _ref: React.Ref<any>): JSX.Element {
  // ignore ref, Select itself do not use it
  return (
    <x.div position="relative">
      <x.div position="absolute" w="100%" top="-55%">
        {message && <InputLabel icon={<Icon icon="checkTick" />} variant={InputVariant.success} text={message} />}
        {error && <InputLabel icon={<Icon icon="error" />} variant={InputVariant.error} text={error} />}
      </x.div>
      <Select {...props} />
    </x.div>
  )
}

export default forwardRef(SelectField)
