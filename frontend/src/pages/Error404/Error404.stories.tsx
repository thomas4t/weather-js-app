import { Story, Meta } from '@storybook/react/types-6-0'
import { faker } from '@faker-js/faker'
import Error404 from './Error404'

export default {
  title: 'pages/Error404',
  component: Error404,
} as Meta

const Template: Story = (args) => <Error404 {...args} />

export const BasicPage = Template.bind({})
BasicPage.args = {
  error: faker.lorem.word(),
}
