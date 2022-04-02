import { Story, Meta } from '@storybook/react/types-6-0'
import Loading from './LoadingPage'

export default {
  title: 'pages/Loading',
  component: Loading,
} as Meta

const Template: Story = (args) => <Loading {...args} />

export const BasicPage = Template.bind({})
