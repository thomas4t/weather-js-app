import React from 'react'
import styled, { css, system, SystemProps } from '@xstyled/styled-components'

export enum CardVariant {
  bare = 'bare',
  default = 'default',
}

export type CardProps = Omit<SystemProps, 'color'> & {
  children: React.ReactNode
  variant?: CardVariant
  className?: string
}

const Wrap = styled.div<CardProps>`
  padding: 20px;
  border-radius: xl;
  box-shadow: thinRight;
  ${({ variant }: CardProps) => {
    if (variant === CardVariant.default) {
      return css`
        border-width: 0.5px;
        border-style: solid;
        border-color: primary1;
      `
    }
    return null
  }}
  ${system};
`

const Card = ({ children, variant = CardVariant.default, className, ...props }: CardProps): JSX.Element => (
  <Wrap className={className} variant={variant} {...props}>
    {children}
  </Wrap>
)

export default Card
