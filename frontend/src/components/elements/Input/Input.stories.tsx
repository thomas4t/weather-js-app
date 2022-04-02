import React from 'react'
import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Icon from '../Icon'
import Input, { InputType } from '.'

export default {
  title: 'Elements/Input',
  component: Input,
  argTypes: {
    onFocus: { action: 'onFocus' },
    onChange: {
      table: {
        type: {},
      },
    },
    onChangeText: { action: 'onChangeText' },
    onEnter: { action: 'onEnter' },
    defaultValue: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const TextUncontrolled = Template.bind({})

TextUncontrolled.args = {
  type: InputType.text,
  name: 'text',
  placeholder: faker.lorem.words(3),
  value: undefined,
  defaultValue: undefined,
  readOnly: false,
  disabled: false,
}

export const Text = Template.bind({})

Text.args = {
  ...TextUncontrolled.args,
  value: faker.lorem.words(3),
}

export const VariantEditWithIcons = Template.bind({})

VariantEditWithIcons.args = {
  ...Text.args,
  icons: [<Icon key="back" icon="back" fillHovered="gray1" />, <Icon key="checkTick" icon="checkTick" stroke="secondary4" strokeHovered="gray1" />],
}
