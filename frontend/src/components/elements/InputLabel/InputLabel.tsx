/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import React from 'react'
// @ts-ignore
import styled, { space, SpaceProps, th, x } from '@xstyled/styled-components'

export enum InputVariant {
  error = 'error',
  success = 'success',
}

export type InputProps = SpaceProps & {
  text?: string
  icon?: React.ReactNode
  variant?: InputVariant
}

const Wrapper = styled.div<InputProps>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.variant === InputVariant.success ? th.color('secondary3') : th.color('secondary1'))};
  color: black;
  ${space};
`

const InputLabel = ({ text, icon, variant, ...props }: InputProps): JSX.Element => (
  <Wrapper p="1 2" {...props} variant={variant}>
    {icon}
    <x.span pl="3">{text}</x.span>
  </Wrapper>
)

export default InputLabel
