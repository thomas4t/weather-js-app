import React from 'react'
import { DatagridProps } from './types'
import DefaultRenderer from './DefaultRenderer/DefaultRenderer'
import { Provider } from './DatagridContext'

const Datagrid = (props: DatagridProps): JSX.Element => (
  <Provider {...props}>
    <DefaultRenderer {...props} />
  </Provider>
)

export default Datagrid
