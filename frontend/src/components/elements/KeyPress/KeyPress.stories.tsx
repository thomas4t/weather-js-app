import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import KeyPress from './KeyPress'

export default {
  title: 'Elements/KeyPress',
  component: KeyPress,
  argTypes: {
    action: { action: 'action' },
  },
} as ComponentMeta<typeof KeyPress>

const Template: ComponentStory<typeof KeyPress> = (args) => (
  <div>
    <KeyPress {...args} />
    Press ESC
  </div>
)

export const Basic = Template.bind({})

Basic.args = {
  keyCode: 27,
}
