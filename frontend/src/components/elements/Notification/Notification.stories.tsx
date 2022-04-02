import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { faker } from '@faker-js/faker'
import Notification, { Variant } from './Notification'

export default {
  title: 'Elements/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>

const Template: ComponentStory<typeof Notification> = (args) => <Notification {...args} />

export const Basic = Template.bind({})

Basic.args = {
  message: faker.lorem.sentence(),
  variant: Variant.error,
}
