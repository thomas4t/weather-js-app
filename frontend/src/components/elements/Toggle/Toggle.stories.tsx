import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Toggle from '.'

export default {
  title: 'Elements/Toggle',
  component: Toggle,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof Toggle>

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />

export const Basic = Template.bind({})

Basic.args = {
  checked: false,
  disabled: false,
}
