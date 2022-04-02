import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Icon from '../Icon'
import InputLabel, { InputVariant } from './InputLabel'

export default {
  title: 'Elements/InputLabel',
  component: InputLabel,
} as ComponentMeta<typeof InputLabel>

const Template: ComponentStory<typeof InputLabel> = (args) => <InputLabel {...args} />

export const Success = Template.bind({})

Success.args = {
  text: 'Success message',
  icon: [<Icon key="check" icon="checkTick" stroke="black" />],
  variant: InputVariant.success,
}

export const Error = Template.bind({})

Error.args = {
  text: 'Error message',
  icon: [<Icon key="error" icon="error" fill="black" />],
  variant: InputVariant.error,
}
