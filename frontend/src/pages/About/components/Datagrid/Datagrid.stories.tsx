import { defaultReducer, useLocalStateStore } from '@components/organisms/Datagrid'
import faker from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import withTheme from '@utils/storybook/withTheme'
import Datagrid from './Datagrid'

export default {
  title: 'Pages/DatagridPage/Datagrid',
  component: Datagrid,
  decorators: [withTheme],
} as ComponentMeta<typeof Datagrid>

const Template: ComponentStory<typeof Datagrid> = (args) => {
  const [state, stateChange] = useLocalStateStore(defaultReducer, args.state)
  return <Datagrid {...args} state={state} stateChange={stateChange} />
}

export const Basic = Template.bind({})

const createRandomRows = (count: number): IProduct[] =>
  new Array(count).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    productTags: [
      { id: faker.datatype.uuid(), name: faker.random.word() },
      { id: faker.datatype.uuid(), name: faker.random.word() },
    ],
    categories: [],
  }))

Basic.args = {
  rows: createRandomRows(10),
  isLoading: false,
  state: {},
}
