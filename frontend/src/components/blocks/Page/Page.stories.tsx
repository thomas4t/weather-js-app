import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Page from './Page'

export default {
  title: 'Blocks/Page',
  component: Page,
  argTypes: {
    permisionsNeeded: {
      options: ['', 'article:edit'],
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = (args) => (
  <Page {...args}>
    <div>{faker.lorem.paragraph()}</div>
  </Page>
)

export const Basic = Template.bind({})

Basic.args = {
  isLoading: false,
  error: '',
  permisionsNeeded: undefined,
}
