/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import styled, { css, x } from '@xstyled/styled-components'
import Icon from '../Icon'

export enum Variant {
  error = 'error',
  warning = 'warning',
}

export type Props = {
  message?: string
  variant?: Variant
}

const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: 3;
  font-size: sm;
  ${({ variant }: Props) => {
    if (variant === Variant.warning) {
      return css`
        background-color: secondary1;
        color: black;
      `
    }
    return css`
      background-color: gray2;
      color: white;
    `
  }}
`
const Notification = ({ message, variant }: Props): JSX.Element => (
  <Wrapper variant={variant}>
    <Icon height="1.7rem" width="1.7rem" icon="error" />
    <x.span pl="5">{message}</x.span>
  </Wrapper>
)

export default Notification
