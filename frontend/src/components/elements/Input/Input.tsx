/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import React, { forwardRef, useCallback } from 'react'
// @ts-ignore
import styled, { th, x } from '@xstyled/styled-components'

export enum InputType {
  text = 'text',
  password = 'password',
  numeric = 'number',
  phone = 'tel',
}

const StyledInput = styled.input<InputProps>`
  box-sizing: border-box;
  border: solid;
  border-width: 1;
  border-color: gray3;
  padding: 3 10 3 3;
  width: 100%;
  background: ${(props) => (props.readOnly || props.disabled) && th.color('gray4')};
  color: gray1;
  :hover {
    border-color: ${(props) => !props.readOnly && !props.disabled && th.color('primary1')};
  }
  // type=number = remove arrows/spinners
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  // Firefox
  &[type='number'] {
    -moz-appearance: textfield;
  }
`

const StyledIconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 20;
  margin: auto;
  cursor: pointer;
  transition: 0.3s;
  & svg:nth-child(2) {
    margin-left: 3;
  }
`

export type InputProps = {
  value?: string
  defaultValue?: string
  type?: InputType
  name?: string
  placeholder?: string
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: React.ChangeEventHandler<any>
  onChangeText?: (text: string) => void
  onEnter?: () => void
  readOnly?: boolean
  disabled?: boolean
  icons?: JSX.Element[] | JSX.Element
  className?: string
}

const Input = (
  {
    value,
    defaultValue,
    name,
    placeholder,
    onChange,
    onChangeText,
    onEnter,
    type = InputType.text,
    onFocus,
    onBlur,
    readOnly,
    disabled,
    icons,
    className,
  }: InputProps,
  ref?: React.Ref<any>,
): JSX.Element => {
  const handleOnChange = useCallback(
    (event) => {
      onChange?.(event)
      onChangeText?.(event?.target?.value)
    },
    [onChange, onChangeText],
  )
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') onEnter?.()
    },
    [onEnter],
  )

  return (
    <x.div>
      <x.div position="relative">
        <StyledInput
          readOnly={readOnly}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleOnChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          ref={ref}
          className={className}
        />
        <StyledIconWrapper>{icons}</StyledIconWrapper>
      </x.div>
    </x.div>
  )
}

export default forwardRef(Input)
