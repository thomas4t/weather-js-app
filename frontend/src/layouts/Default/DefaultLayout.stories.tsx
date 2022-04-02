import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import withRouter from '@utils/storybook/withRouter'
import DefaultLayout from './DefaultLayout'

export default {
  title: 'layouts/DefaultLayout',
  component: DefaultLayout,
  decorators: [withRouter],
  argTypes: {
    user: {
      control: {
        type: 'string', // to disable control
      },
    },
    pushNotification: {
      action: true,
    },
  },
} as ComponentMeta<typeof DefaultLayout>

const Template: ComponentStory<typeof DefaultLayout> = (args, { user }) => <DefaultLayout {...args} user={user} />

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
