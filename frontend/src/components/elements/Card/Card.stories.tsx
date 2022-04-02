import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { faker } from '@faker-js/faker'
import Card, { CardVariant } from '.'

export default {
  title: 'Elements/Card',
  component: Card,
} as ComponentMeta<typeof Card>

const children = <div>{faker.lorem.paragraph()}</div>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}>{children}</Card>

export const Basic = Template.bind({})

Basic.args = {
  variant: CardVariant.default,
}
