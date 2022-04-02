import React from 'react'
import styled from '@xstyled/styled-components'
import { ColumnDefinition } from '../../../types'
import SelectCell from './FilterCellSelect'
import InputCell from './FilterCellInput'

type Props = {
  column: ColumnDefinition
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2;
`

const FilterCell = ({ column }: Props): JSX.Element => {
  const type = column?.filteringSettings?.type

  if (type === 'select') {
    return (
      <Wrapper>
        <SelectCell column={column} />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <InputCell column={column} />
    </Wrapper>
  )
}

export default FilterCell
