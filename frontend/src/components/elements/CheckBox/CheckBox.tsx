import React, { forwardRef } from 'react'
import styled, { system } from '@xstyled/styled-components'
import Icon from '../Icon'

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
    &:before {
      content: '';
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      height: 1.2em;
      width: 1.2em;
      border-radius: 0;
      background-color: gray4;
    }
  }
  & + ${LabelText}:before {
    border: 1px solid;
    border-color: gray2;
  }

  & + span svg {
    position: absolute;
    left: 3px;
    top: 2.5px;
    height: 0.8em;
    width: 0.8em;
    transition: all 150ms ease-out;
    transform: scale3d(0, 0, 1);
    opacity: 0;
  }
  &:checked + span svg,
  &:hover + span svg {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
  &:checked {
    & + ${LabelText}:before {
      border-color: primary1;
      background-color: primary1;
    }
    & + span svg {
      path {
        stroke: white;
      }
    }
  }
  &:not(:checked):hover {
    & + ${LabelText}:before {
      border-color: gray2;
      background-color: gray4;
    }
    & + span svg {
      path {
        stroke: gray2;
      }
    }
  }
  ${system};
`

const CheckBox = ({ label, checked, onChange, value, name }: Props, ref: React.Ref<any>): JSX.Element => (
  <Wrapper>
    <Label>
      <Input name={name} type="checkbox" value={value} checked={checked} onChange={onChange} ref={ref} />
      <LabelText>
        <span>{label}</span>
        <Icon icon="checkTick" />
      </LabelText>
    </Label>
  </Wrapper>
)

export default forwardRef(CheckBox)
