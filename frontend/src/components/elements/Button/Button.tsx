import React from 'react'
import styled, { system, SystemProps, css, th } from '@xstyled/styled-components'

export enum ButtonVariant {
  bare = 'bare',
  primary = 'primary',
  secondary = 'secondary',
}
export enum ButtonSize {
  normal = 'normal',
  small = 'small',
}

export type ButtonProps = Omit<SystemProps, 'color'> & {
  children: React.ReactNode
  disabled?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void)
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
}

const StyledButtonWrapper = styled.div<ButtonProps>`
  position: relative;
  width: fit-content;
  width: -moz-fit-content;
  ${system};
`

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${(props) => (props.size === ButtonSize.small ? th.space('14') : th.space('28'))};
  padding: 2;
  border-style: solid;
  border-width: 1;
  border-color: primary1;
  background-color: primary1;
  color: background1;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: background1;
    color: primary1;
  }

  ${({ variant, size, disabled }: ButtonProps) => {
    if (disabled) {
      return css({
        borderColor: 'gray4',
        backgroundColor: 'gray4',
        color: 'primary1',
        pointerEvents: 'none',
      })
    }
    if (variant === ButtonVariant.bare) {
      return css`
        color: primary1;
        background-color: transparent;
        border: none;
        margin: 0;
        padding: 0;
        min-width: 0;
        &:hover {
          border: none;
          background-color: transparent;
        }
      `
    }
    if (variant === ButtonVariant.secondary) {
      return css`
        background-color: background1;
        color: primary1;
        &:hover {
          background-color: primary1;
          color: background1;
        }
        ${() => {
          /* secondary and small */
          if (size === ButtonSize.small) {
            return css`
              border: 1px solid transparent;
              background: none;
            `
          }
          return null
        }}
      `
    }
    return null
  }}
  ${system};
`
const Button = ({ children, disabled, onClick, variant, size = ButtonSize.normal, className, ...props }: ButtonProps): JSX.Element => (
  <StyledButtonWrapper className={className} {...props}>
    <StyledButton onClick={onClick} disabled={disabled} variant={variant} size={size}>
      {children}
    </StyledButton>
  </StyledButtonWrapper>
)

export default Button
