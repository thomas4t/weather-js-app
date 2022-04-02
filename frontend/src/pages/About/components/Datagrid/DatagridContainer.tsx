import useDatagridFetch from '@utils/datagrid/useDatagridFetch'
import useDatagridState from '@utils/datagrid/useDatagridState'
import filterRows from '@utils/datagrid/filterRows'
import useDataGridSubscriber from '@utils/datagrid/useDataGridSubscriber'
import AccountsList from './Datagrid'

const AccountsListTableContainer = (): JSX.Element => {
  // grid action handlers
  const subscriber = useDataGridSubscriber({
    rowChangeMode: {
      openEditModal: (id: string) => console.log('id', id),
    },
  })
  // grid inner state
  const [state, stateChange] = useDatagridState({ subscriber })
  // grid data loading
  const { rows, error, isLoading, reload } = useDatagridFetch<IProduct>(
    'productsTable',
    'products',
    {
      args: {},
      state,
    },
    [],
  )
  const filteredRows = filterRows(state, rows)

  return <AccountsList rows={filteredRows} reload={reload} state={state} stateChange={stateChange} isLoading={isLoading} error={error} />
}

export default AccountsListTableContainer
