import React, { useState } from 'react'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button, { ButtonSize, ButtonVariant } from '@components/elements/Button'
import Icon from '@components/elements/Icon'
import filterRows from '@utils/datagrid/filterRows'
import { ContentCheckboxCell } from './DefaultRenderer'
import Datagrid, {
  // store
  useLocalStateStore,
  defaultReducer,
  // ContentRowButtons
  defaultRenderer,
  // types
  Action,
  ActionTypes,
  ColumnDefinition,
  FilteringType,
  HeaderButton,
  RowData,
  State,
} from '.'

const { ContentRowButtonDelete, ContentRowButtonDeleteConfirm, ContentRowButtonEdit, ContentRowButtonSave } = defaultRenderer

type RandomRow = RowData & {
  id: string
  textColumn: string
  numberColumn: number
  dateColumn: string
  boolColumn: boolean
  customFormatColumn: boolean
  longTextColumn: string
}

const columns: ColumnDefinition<RandomRow>[] = [
  {
    name: 'checkboxColumn',
    isSortingEnabled: false,
    isFilteringEnabled: false,
    contentCellComponent: ContentCheckboxCell,
  },
  {
    name: 'textColumn',
    dataPath: 'textColumn',
    title: 'My column foo',
    isSortingEnabled: true,
    isFilteringEnabled: true,
    filteringSettings: {
      type: FilteringType.text,
    },
  },
  {
    name: 'avatarColumn',
    dataPath: 'avatarColumn',
    title: 'Avatar',
    width: 60,
    contentCellComponent: ({ cellComponent: CellComponent }) => (
      <CellComponent width={60}>
        <span role="img" aria-label="">
          😺
        </span>
      </CellComponent>
    ),
  },
  {
    name: 'selectColumn',
    title: 'My select',
    width: 80,
    isSortingEnabled: true,
    isFilteringEnabled: true,
    filteringSettings: {
      type: FilteringType.select,
      options: [
        {
          value: 'one ',
          label: 'One',
        },
        {
          value: 'two',
          label: 'Two',
        },
        {
          value: 'three',
          label: 'Three',
        },
      ],
    },
  },
  {
    name: 'numberColumn',
    dataPath: 'numberColumn',
    title: 'My column number',
    isSortingEnabled: true,
    isFilteringEnabled: true,
    filteringSettings: {
      type: FilteringType.numeric,
    },
  },
  {
    name: 'dateColumn',
    title: 'My column baz',
    isSortingEnabled: true,
    isFilteringEnabled: true,
    formatRowValue: (row) => dayjs(row.dateColumn as string).format('DD/MM/YYYY'),
    filteringSettings: {
      type: FilteringType.date,
    },
  },
  {
    name: 'boolColumn',
    dataPath: 'boolColumn',
    title: 'My column x',
    isSortingEnabled: true,
    isFilteringEnabled: true,
    filteringSettings: {
      type: FilteringType.text,
    },
  },
  {
    name: 'customFormatColumn',
    title: 'My column check',
    isSortingEnabled: false,
    isFilteringEnabled: false,
    formatRowValue: (row) => {
      if (row.customFormatColumn === true) return <Icon icon="cross" />
      return <Icon icon="CheckTick" />
    },
  },
  {
    name: 'longTextColumn',
    dataPath: 'longTextColumn',
    title: 'Long text column',
    isSortingEnabled: false,
    isFilteringEnabled: false,
  },
  {
    name: 'buttons',
    title: 'Buttons',
    width: 200,
    buttons: [(props) => <ContentRowButtonEdit {...props} variant="bold" />, ContentRowButtonSave, ContentRowButtonDelete, ContentRowButtonDeleteConfirm],
  },
]

const initialState: State = {
  uxState: {
    isRowAddingVisible: true,
    isFilteringVisible: false,
  },
}

const createRandomRows = (count: number): RandomRow[] =>
  new Array(count).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    textColumn: faker.random.word(),
    numberColumn: faker.datatype.number(),
    dateColumn: faker.date.recent().toISOString(),
    boolColumn: faker.datatype.boolean(),
    customFormatColumn: faker.datatype.boolean(),
    longTextColumn: faker.lorem.words(5),
  }))

export default {
  title: 'Organisms/Datagrid',
  component: Datagrid,
  argTypes: {
    error: {
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof Datagrid>

const headerButtons: HeaderButton[] = [
  () => (
    <Button variant={ButtonVariant.secondary} size={ButtonSize.small} onClick={React.useCallback(() => console.log('I am foo'), [])} mr={1}>
      <Icon icon="Retry" />
    </Button>
  ),
]

const Template: ComponentStory<typeof Datagrid> = (args) => {
  // rows to state, just to be able to modify them
  const [rowsData, setRowsData] = useState<RowData[]>(args.rowsData || [])

  // subscription in order to get event action when occurs
  const subscriber = (action: Action, state: State): void => {
    console.log('action', action, state)
    if (action.type === ActionTypes.rowAdd) {
      // simple immutable adding of row
      setRowsData([...rowsData, { id: faker.datatype.uuid(), ...action.row }])
    }
    if (action.type === ActionTypes.rowChangeMode && action.mode === 'deleteDone') {
      // simple immutable deleting of local data
      const indexToDelete = rowsData.findIndex(({ id }) => id === action.id)
      const rowsDataModified = [...rowsData.slice(0, indexToDelete), ...rowsData.slice(indexToDelete + 1)]
      setRowsData(rowsDataModified)
    }
  }

  // create store with state
  const [state, stateChange] = useLocalStateStore(defaultReducer, args.state, subscriber)

  // do filtering (this is usually made on backend side)
  const filteredRowsData = filterRows(state, rowsData)

  // render grid
  return <Datagrid {...args} rowsData={filteredRowsData} state={state} stateChange={stateChange} headerButtons={headerButtons} />
}

export const Basic = Template.bind({})

Basic.args = {
  columns,
  state: initialState,
  rowsData: createRandomRows(20),
  isLoading: false,
  error: undefined,
}
