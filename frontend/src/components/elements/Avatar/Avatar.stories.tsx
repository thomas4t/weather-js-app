import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import Icon from '../Icon'
import Avatar from './Avatar'

export default {
  title: 'Elements/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args, { user }) => <Avatar {...args} src={user?.avatarUrl || args.src} />

export const Basic = Template.bind({})
Basic.args = {
  src: 'https://cataas.com/cat/cute',
  alt: 'Avatar',
  w: '3em',
  h: '3em',
}

export const FallbackUrl = Template.bind({})

FallbackUrl.args = {
  ...Basic.args,
  src: 'invalid url',
  fallbackUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
}

export const FallbackElement = Template.bind({})

FallbackElement.args = {
  ...Basic.args,
  src: 'invalid url',
  fallbackUrl: 'second invalid url',
  fallbackElement: <Icon icon="error" />,
}
