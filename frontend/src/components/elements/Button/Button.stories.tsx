import React from 'react'
import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { theme, as } from '@utils/storybook/storyArgTypes'
import Icon from '../Icon'
import Button, { ButtonSize, ButtonVariant } from './Button'

export default {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'click' },
    theme,
    as,
  },
} as ComponentMeta<typeof Button>

const buttonText = faker.lorem.word()

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Basic = Template.bind({})

Basic.args = {
  variant: ButtonVariant.primary,
  size: ButtonSize.normal,
  children: buttonText,
  disabled: false,
}

export const PrimaryIcon = Template.bind({})

PrimaryIcon.args = {
  variant: ButtonVariant.primary,
  size: ButtonSize.small,
  children: <Icon icon="funnel" fill="background1" />,
}

export const SecondaryIcon = Template.bind({})

SecondaryIcon.args = {
  variant: ButtonVariant.secondary,
  size: ButtonSize.small,
  children: <Icon icon="funnel" fill="primary1" />,
}
