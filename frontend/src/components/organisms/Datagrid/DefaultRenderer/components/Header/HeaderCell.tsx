import { useContext } from 'react'
import styled from '@xstyled/styled-components'
import Icon from '@components/elements/Icon'
import DatagridContext from '../../../DatagridContext'
import { ColumnDefinition } from '../../../types'
import Cell from '../Cell'
import FilterCell from './FilterCell'

type Props = {
  column: ColumnDefinition
}

const StyledHeaderCell = styled(Cell)`
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
`

const IconWrapper = styled.div`
  position: relative;
  top: 0.1em;
  margin-left: 2;
  opacity: 0;
  transition: simpleShort;
`

const HeaderTitleStyled = styled.div`
  display: flex;
  color: primary1;
  cursor: pointer;
  &:hover {
    ${IconWrapper} {
      opacity: 1;
    }
  }
`

const HeaderCell = ({ column }: Props): JSX.Element => {
  const { state } = useContext(DatagridContext)
  const isFilteringVisible = state?.uxState?.isFilteringVisible

  return (
    <StyledHeaderCell>
      <HeaderTitleStyled>
        {column.title}
        <IconWrapper>
          <Icon icon="Funnel" fill="primary1" width="0.9em" height="0.9em" />
        </IconWrapper>
      </HeaderTitleStyled>
      {column.isFilteringEnabled !== false && isFilteringVisible && <FilterCell column={column} />}
    </StyledHeaderCell>
  )
}

export default HeaderCell
