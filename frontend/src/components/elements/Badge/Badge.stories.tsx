import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { theme } from '@utils/storybook/storyArgTypes'
import Icon from '../Icon'
import Badge from './Badge'

export default {
  title: 'Elements/Badge',
  component: Badge,
  argTypes: {
    theme,
  },
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args}>
    <Icon fill="gray2" fillHovered="primary1" stroke="gray2" strokeHovered="primary1" icon="bell2" width="2.4em" height="2.4em" />
  </Badge>
)

export const Basic = Template.bind({})

Basic.args = {
  text: '2',
}
