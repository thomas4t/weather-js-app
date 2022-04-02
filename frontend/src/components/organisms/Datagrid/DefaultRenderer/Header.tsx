import React, { useCallback, useContext } from 'react'
import styled from '@xstyled/styled-components'
import Button, { ButtonSize, ButtonVariant } from '@components/elements/Button/Button'
import Icon from '@components/elements/Icon'
import DatagridContext from '../DatagridContext'
import actions from '../actions'
import HeaderCell from './components/Header/HeaderCell'
import HeaderRow from './components/Header/HeaderRow'

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1;
  height: fit-content;
  position: relative;
  top: -0.55em;
`

const Header = (): JSX.Element => {
  const { columns, state, stateChange, headerButtons } = useContext(DatagridContext)
  const isFilteringVisible = state?.uxState?.isFilteringVisible
  const toggleFilters = useCallback(() => stateChange(actions.toggleFilters(!isFilteringVisible)), [stateChange, isFilteringVisible])
  const buttonsColumnsCount = columns?.filter((column) => column.buttons)?.length || 0
  if (buttonsColumnsCount > 1) {
    console.warn(`Column with buttons is expected only once. You have ${buttonsColumnsCount} of them, that can cause rendering discrepancies.`)
  }

  return (
    <HeaderRow>
      {columns
        ?.filter((column) => !column.buttons)
        .map((column) => (
          <HeaderCell key={column.name} column={column} />
        ))}
      <ButtonsWrapper>
        {headerButtons?.map((ButtonComponent, i) => (
          <ButtonComponent
            // eslint-disable-next-line react/no-array-index-key
            key={`header-${ButtonComponent.name}-${i}`}
            state={state}
            stateChange={stateChange}
          />
        ))}
        <Button variant={isFilteringVisible ? ButtonVariant.primary : ButtonVariant.secondary} size={ButtonSize.small} onClick={toggleFilters}>
          <Icon icon="funnel" fill={isFilteringVisible ? 'background1' : 'primary1'} />
        </Button>
      </ButtonsWrapper>
    </HeaderRow>
  )
}

export default Header
