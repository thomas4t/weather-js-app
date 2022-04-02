import React from 'react'
import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LoadingBoundary from './LoadingBoundary'

export default {
  title: 'Elements/LoadingBoundary',
  component: LoadingBoundary,
  argTypes: {
    loadingComponent: {
      control: {
        type: 'string', // to have it disabled
      },
    },
    errorComponent: {
      control: {
        type: 'string', // to have it disabled
      },
    },
  },
} as ComponentMeta<typeof LoadingBoundary>

const Template: ComponentStory<typeof LoadingBoundary> = (args) => (
  <LoadingBoundary {...args}>
    <div>{faker.lorem.paragraph()}</div>
  </LoadingBoundary>
)

export const Basic = Template.bind({})

Basic.args = {
  isLoading: true,
  loadingComponent: () => <div>loadingComponent</div>,
  errorComponent: ({ error }) => <div>errorComponent: {error?.message}</div>,
}
