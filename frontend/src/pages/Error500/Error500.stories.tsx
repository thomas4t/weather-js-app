import { Story, Meta } from '@storybook/react/types-6-0'
import { faker } from '@faker-js/faker'
import Error500 from './Error500'

export default {
  title: 'pages/Error500',
  component: Error500,
} as Meta

const Template: Story = (args) => <Error500 {...args} />

export const BasicPage = Template.bind({})
BasicPage.args = {
  error: {
    message: faker.lorem.word(),
  },
}
