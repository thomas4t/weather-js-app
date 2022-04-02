import React from 'react'
import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { x } from '@xstyled/styled-components'
import Icon from '../../elements/Icon'
import Select from './Select'

const options = [
  {
    value: 'one ',
    label: 'One',
  },
  {
    value: 'two',
    label: 'Two',
  },
  {
    value: 'bar',
    label: (
      <>
        With icon <Icon icon="time" ml="2" />
      </>
    ),
  },
]

export default {
  title: 'Blocks/Select',
  component: Select,
  argTypes: {
    onChange: { action: true },
    value: {
      options: ['', ...options.map((v) => v.value)],
      control: {
        type: 'select',
      },
    },
    defaultValue: {
      options: ['', ...options.map((v) => v.value)],
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => (
  <x.div pb="200px">
    <Select {...args} />
  </x.div>
)

export const Basic = Template.bind({})

Basic.args = {
  isClearable: false,
  isMulti: false,
  isSearchable: false,
  disabled: false,
  hideSelectedOptions: false,
  closeMenuOnSelect: true,
  defaultMenuIsOpen: false,
  name: faker.lorem.word(),
  placeholder: faker.lorem.words(3),
  value: '',
  defaultValue: '',
  options,
}
