import React from 'react'
import Button, { ButtonSize, ButtonVariant } from '@components/elements/Button'
import Icon from '@components/elements/Icon'
import styled from '@xstyled/styled-components'
import actions from '../../actions'
import { RowButton, RowButtonProps } from '../../types'

const ButtonWrapper = styled.div`
  margin-right: 1rem;
`

export const ContentRowButtonEdit: RowButton = ({ rowData, stateChange }: RowButtonProps): JSX.Element => (
  <ButtonWrapper>
    <Button
      variant={ButtonVariant.secondary}
      size={ButtonSize.small}
      onClick={React.useCallback(() => stateChange(actions.rowChangeMode('edit', rowData?.id)), [rowData.id, stateChange])}
    >
      <Icon icon="Edit" fill="primary1" />
    </Button>
  </ButtonWrapper>
)

export const ContentRowButtonSave: RowButton = ({ getRowValues, state }: RowButtonProps): JSX.Element | null => {
  const onClick = React.useCallback(() => console.log('saving', getRowValues()), [getRowValues])
  if (state.uxState?.rowMode !== 'edit') return null
  return (
    <ButtonWrapper>
      <Button variant={ButtonVariant.secondary} size={ButtonSize.small} onClick={onClick}>
        <Icon icon="CheckTick" stroke="primary1" mr={1} /> Save
      </Button>
    </ButtonWrapper>
  )
}

export const ContentRowButtonDelete: RowButton = ({ rowData, stateChange }: RowButtonProps): JSX.Element => (
  <ButtonWrapper>
    <Button
      variant={ButtonVariant.secondary}
      size={ButtonSize.small}
      onClick={React.useCallback(() => stateChange(actions.rowChangeMode('delete', rowData?.id)), [rowData.id, stateChange])}
    >
      <Icon icon="Cross" stroke="primary1" />
    </Button>
  </ButtonWrapper>
)

export const ContentRowButtonDeleteConfirm: RowButton = ({ rowData, state, stateChange }: RowButtonProps): JSX.Element | null => {
  const onClick = React.useCallback(() => stateChange(actions.rowChangeMode('deleteDone', rowData.id)), [rowData.id, stateChange])
  if (!(state.uxState?.rowMode === 'delete' && state.uxState?.affectedRowId === rowData.id)) return null
  return (
    <ButtonWrapper>
      <Button variant={ButtonVariant.secondary} size={ButtonSize.small} onClick={onClick}>
        Confirm
      </Button>
    </ButtonWrapper>
  )
}
