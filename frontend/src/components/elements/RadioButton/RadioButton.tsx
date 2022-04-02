import React, { forwardRef } from 'react'
import styled, { system } from '@xstyled/styled-components'

export type Props = {
  id?: string
  label?: string
  value?: string
  name?: string
  checked?: boolean
  onChange?: React.ChangeEventHandler<any>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  height: 1.2em;
  color: gray1;
  cursor: pointer;
`

const LabelText = styled.span``

const Input = styled.input<Props>`
  margin: 0 3 0 0;
  opacity: 0;
  & + ${LabelText} {
    &:before,
    &:after {
      content: '';
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      height: 1.3em;
      width: 1.3em;
      border-radius: 3em;
      background-color: background3;
    }
  }
  & + ${LabelText}:before {
    border: 1px solid;
    border-color: gray1;
  }
  & + ${LabelText}:after {
    transition: all 150ms ease-out;
    transform: scale3d(0, 0, 1);
    height: 11px;
    width: 11px;
    margin-left: 3px;
    margin-top: 3px;
    opacity: 0;
  }
  &:checked + ${LabelText}:after, &:hover + ${LabelText}:after {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
  &:checked + ${LabelText}:after {
    background-color: primary1;
  }
  &:hover + ${LabelText}:after {
    background-color: gray2;
  }
  ${system};
`

const RadioButton = forwardRef(
  ({ label, checked, onChange, value, name }: Props, ref: React.Ref<any>): JSX.Element => (
    <Wrapper>
      <Label>
        <Input name={name} type="radio" value={value} checked={checked} onChange={onChange} ref={ref} />
        <LabelText>
          <span>{label}</span>
        </LabelText>
      </Label>
    </Wrapper>
  ),
)

export default RadioButton
