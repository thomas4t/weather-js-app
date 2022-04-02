import React from 'react'
import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Icon from '../Icon'
import List from './List'

const items = [
  {
    key: '1',
    label: faker.lorem.words(3),
  },
  {
    key: '2',
    label: faker.lorem.words(3),
  },
  {
    key: '3',
    label: faker.lorem.words(3),
  },
  {
    key: '4',
    label: faker.lorem.words(3),
  },
  {
    key: '5',
    label: (
      <>
        with icon <Icon icon="bell" ml="2" />
      </>
    ),
  },
]

export default {
  title: 'Elements/List',
  component: List,
} as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = (args) => <List {...args} />

export const Basic = Template.bind({})

Basic.args = {
  items,
}
