import styled from '@xstyled/styled-components'
import React from 'react'
import { DatagridProps } from '../types'
import Content from './Content'
import Header from './Header'

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  overflow-x: auto;
`

const DefaultRenderer = (props: DatagridProps): JSX.Element => (
  <StyledTable className={props.className}>
    <Header />
    <Content rowsData={props.rowsData} isLoading={props.isLoading} error={props.error} />
  </StyledTable>
)

export default DefaultRenderer
