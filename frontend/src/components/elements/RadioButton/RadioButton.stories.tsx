import React from 'react'
import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { theme } from '@utils/storybook/storyArgTypes'
import RadioButton from './RadioButton'

export default {
  title: 'Elements/RadioButton',
  component: RadioButton,
  argTypes: {
    onChange: { action: 'change' },
    theme,
  },
} as ComponentMeta<typeof RadioButton>

const labelText = faker.lorem.word()

const Template: ComponentStory<typeof RadioButton> = (args) => <RadioButton {...args} />

export const Basic = Template.bind({})

Basic.args = {
  name: 'address',
  label: labelText,
  checked: true,
  value: 'address',
}

const MultipleTemplate: ComponentStory<typeof RadioButton> = (args) => (
  <>
    <RadioButton {...args} label="Option 1" value="1" />
    <RadioButton {...args} label="Option 2" value="2" />
    <RadioButton {...args} label="Option 3" value="3" />
  </>
)

export const Multiple = MultipleTemplate.bind({})

Multiple.args = {
  name: 'address',
}
