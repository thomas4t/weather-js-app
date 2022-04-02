import React, { forwardRef } from 'react'
import Input, { InputType } from '@components/elements/Input'
import styled from '@xstyled/styled-components'

const StyledInput = styled.div`
  width: 100%;
  & input {
    width: 100%;
    padding: 3 3 3 6;
    border: 1px solid;
    border-color: gray2;
    border-radius: lg;
    color: primary1;
    font-size: xxs;
    &::placeholder {
      color: gray2;
    }
    &:focus {
      outline: none;
    }
  }
  // icon wrapper
  & input + div {
    top: -0.1em;
    left: 0.5em;
    right: unset;
  }
`
type Props = {
  icons?: JSX.Element[] | JSX.Element
  type?: InputType
  placeholder?: string
  className?: string
  onChange?: React.ChangeEventHandler<unknown>
}
const BaseInput = ({ icons, type, placeholder, className, onChange }: Props, ref?: React.Ref<unknown>): JSX.Element => (
  <StyledInput>
    <Input icons={icons} type={type} placeholder={placeholder} onChange={onChange} ref={ref} className={className} />
  </StyledInput>
)

export default forwardRef(BaseInput)
