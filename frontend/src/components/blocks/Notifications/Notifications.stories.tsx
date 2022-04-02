import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import withTheme from '@utils/storybook/withTheme'
import Notifications from './Notifications'

export default {
  title: 'Blocks/Notifications',
  component: Notifications,
  decorators: [withTheme],
} as ComponentMeta<typeof Notifications>

const Template: ComponentStory<typeof Notifications> = (args) => <Notifications {...args} />

export const Basic = Template.bind({})

Basic.args = {
  notifications: [
    {
      id: faker.datatype.uuid(),
      message: faker.lorem.sentence(),
    },
    {
      id: faker.datatype.uuid(),
      message: faker.lorem.sentence(),
    },
    {
      id: faker.datatype.uuid(),
      message: faker.lorem.sentence(),
    },
  ],
}
