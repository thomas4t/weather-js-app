import Icon from '@components/elements/Icon'
import styled, { x } from '@xstyled/styled-components'
import React, { useCallback } from 'react'
import { NavbarElementProps } from 'react-day-picker'
import upperFirst from 'lodash/upperFirst'

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  margin: 4;
  margin-bottom: 0;
  margin-left: 6;
`

const Navbar = ({ onNextClick, onPreviousClick, month, showNextButton, showPreviousButton }: NavbarElementProps): JSX.Element => {
  const onPreviousClickMem = useCallback(() => onPreviousClick(), [onPreviousClick])
  const onNextClickMem = useCallback(() => onNextClick(), [onNextClick])
  return (
    <StyledNavbar>
      {showPreviousButton && (
        <Icon icon="ChevronLeft" cursor="pointer" onClick={onPreviousClickMem} fill="primary1" height="0.7em" />
      )}

      <x.span mx={2}>{upperFirst(month.toLocaleString('cs', { month: 'long', year: 'numeric' }))}</x.span>

      {showNextButton && <Icon icon="ChevronRight" cursor="pointer" onClick={onNextClickMem} fill="primary1" height="0.7em" />}
    </StyledNavbar>
  )
}

export default Navbar
