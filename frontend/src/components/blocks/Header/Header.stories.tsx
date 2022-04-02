import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Header from './Header'

export default {
  title: 'Blocks/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args, { user }) => (
  <Header {...args} user={user}>
    <div>children</div>
  </Header>
)

export const Basic = Template.bind({})

Basic.args = {
  title: faker.lorem.word(),
  perex: faker.lorem.sentence(),
}
