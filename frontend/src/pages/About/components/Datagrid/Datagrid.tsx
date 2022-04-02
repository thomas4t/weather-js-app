import { useMemo } from 'react'
import Datagrid, { ColumnDefinition, defaultRenderer, FilteringType, HeaderButton, State, StateChange } from '@components/organisms/Datagrid'
import Button, { ButtonSize, ButtonVariant } from '@components/elements/Button'
import Icon from '@components/elements/Icon'

const { ContentRowButtonDelete, ContentRowButtonDeleteConfirm, ContentRowButtonEdit, ContentRowButtonSave, ContentCheckboxCell } = defaultRenderer

const columns: ColumnDefinition<IProduct>[] = [
  {
    name: 'check',
    width: 60,
    isSortingEnabled: false,
    isFilteringEnabled: false,
    contentCellComponent: ContentCheckboxCell,
  },
  {
    name: 'id',
    title: 'Id',
    isSortingEnabled: true,
    isFilteringEnabled: true,
    filteringSettings: {
      type: FilteringType.text,
    },
  },
  {
    name: 'name',
    title: 'Name',
    isSortingEnabled: true,
    isFilteringEnabled: true,
    filteringSettings: {
      type: FilteringType.text,
    },
  },
  {
    name: 'tags',
    title: 'Tags',
    width: 80,
    formatRowValue: (row) => row.productTags.map((tag) => tag.name).join(', '),
  },
  {
    name: 'buttons',
    title: 'Buttons',
    width: 200,
    buttons: [(props) => <ContentRowButtonEdit {...props} variant="bold" />, ContentRowButtonSave, ContentRowButtonDelete, ContentRowButtonDeleteConfirm],
  },
]

export type Props = {
  rows?: IProduct[]
  isLoading?: boolean
  error?: string
  state: State
  stateChange: StateChange
  reload?: () => void
}

const MyDatagrid = ({ rows, isLoading, error, reload, state, stateChange }: Props): JSX.Element => {
  const headerButtons = useMemo<HeaderButton[]>(
    () => [
      () => (
        <Button variant={ButtonVariant.secondary} size={ButtonSize.small} mr={1} onClick={reload}>
          <Icon icon="chevronRight" fill="primary1" />
        </Button>
      ),
    ],
    [reload],
  )

  return (
    <Datagrid isLoading={isLoading} error={error} rowsData={rows} columns={columns} state={state} stateChange={stateChange} headerButtons={headerButtons} />
  )
}

export default MyDatagrid
