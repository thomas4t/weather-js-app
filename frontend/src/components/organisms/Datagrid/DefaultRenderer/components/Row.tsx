import React, { useContext } from 'react'
import styled from '@xstyled/styled-components'
import { ColumnDefinition } from '../../types'
import DatagridContext from '../../DatagridContext'

const generateTemplate = (columns?: ColumnDefinition[]): string => {
  let template = ''
  if (!columns) return template

  columns.forEach((column) => {
    if (column.width) {
      if (typeof column.width === 'number') template += ` ${column.width}px `
      else template += ` ${column.width} `
    } else {
      const width = column.buttons ? 200 : 150
      template += ` minmax(${width}px, 1fr) `
    }
  })

  return template
}

const StyledRow = styled.div<{ columns?: ColumnDefinition[] }>`
  display: grid;
  grid-template-columns: ${({ columns }) => generateTemplate(columns)};
  column-gap: 2;
`

type Props = {
  children: React.ReactNode
  className?: string
}

const Row = ({ children, className }: Props): JSX.Element => {
  const { columns } = useContext(DatagridContext)
  return (
    <StyledRow columns={columns} className={className}>
      {children}
    </StyledRow>
  )
}

export default Row
