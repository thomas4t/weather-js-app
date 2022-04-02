import React, { forwardRef } from 'react'
import styled, { x, css } from '@xstyled/styled-components'
import Icon from '@components/elements/Icon'
import useFieldFocus from '@utils/forms/useFieldFocus'
import Input, { InputProps } from '../../elements/Input'
import InputLabel, { InputVariant } from '../../elements/InputLabel'

export type Props = InputProps & {
  error?: string
  message?: string
}

const Wrapper = styled.div<Props & { isFocused: boolean }>`
  position: relative;
  ${(props) => {
    if (props.readOnly || props.disabled) {
      return css`
        svg {
          display: none;
        }
      `
    }
    if (props.isFocused) {
      return css`
        svg:hover {
          fill: primary1;
        }
      `
    }
    return css`
      :hover {
        svg [class$='fill'] {
          fill: primary1;
        }
      }
    `
  }}}
`

const InputField = ({ error, message, ...props }: Props, ref: React.Ref<any>): JSX.Element => {
  const { onFocus, onBlur, isFocused } = useFieldFocus(props)
  const blurredIcons = React.useMemo(() => [<Icon key="edit" icon="edit" />], [])
  const focusedIcons = React.useMemo(() => [<Icon key="back" icon="back" />], [])

  return (
    <Wrapper {...props} isFocused={isFocused}>
      <x.div position="absolute" w="100%" top="-55%">
        {message && <InputLabel icon={<Icon icon="checkTick" />} variant={InputVariant.success} text={message} />}
        {error && <InputLabel icon={<Icon icon="error" />} variant={InputVariant.error} text={error} />}
      </x.div>
      <Input {...props} ref={ref} icons={isFocused ? focusedIcons : blurredIcons} onFocus={onFocus} onBlur={onBlur} />
    </Wrapper>
  )
}

export default forwardRef(InputField)
