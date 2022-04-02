import React from 'react'
import styled, { system, SystemProps } from '@xstyled/styled-components'

export type Props = SystemProps & {
  children?: JSX.Element
  text?: string
  className?: string
}

const StyledBadge = styled.div`
  position: absolute;
  z-index: 1;
  right: -1px;
  top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.4em;
  width: 1.4em;
  border-radius: 50%;
  background-color: primary1;
  font-size: xs;
  color: background1;
  pointer-events: none;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  svg {
    transition: 0.3s;
  }
  ${system};
`

const Badge = ({ children, text, className }: Props): JSX.Element => (
  <Wrapper className={className}>
    <StyledBadge>{text}</StyledBadge>
    {children}
  </Wrapper>
)

export default Badge
