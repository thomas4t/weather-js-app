// @ts-ignore
import styled, { th } from '@xstyled/styled-components'
import React, { useCallback } from 'react'

type Props = {
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
}

const Circle = styled.div`
  width: 1.5em;
  height: 1.5em;
  border-radius: 100%;
`

const ToggleWrapper = styled.div<{ disabled?: boolean; checked: boolean }>`
  background: gray4;
  width: 3.5em;
  border-radius: 100px;
  display: flex;
  padding: 2px; // intentionally in px, we wanna exact space
  justify-content: ${({ checked }) => (checked ? 'flex-end' : 'flex-start')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: default;

  > div {
    background-color: ${({ checked }) => th.color(checked ? 'primary1' : 'gray2')};
  }
`

const Toggle = ({ checked, onChange, disabled }: Props): JSX.Element => {
  const handleClick = useCallback(() => onChange?.(!!checked), [checked, onChange])
  return (
    <ToggleWrapper onClick={handleClick} disabled={disabled} checked={checked}>
      <Circle />
    </ToggleWrapper>
  )
}

export default Toggle
