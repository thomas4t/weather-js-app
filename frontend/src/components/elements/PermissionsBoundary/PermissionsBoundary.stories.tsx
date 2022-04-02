import React from 'react'
import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PermissionsBoundary from './PermissionsBoundary'

export default {
  title: 'Elements/PermissionsBoundary',
  component: PermissionsBoundary,
  argTypes: {
    errorComponent: {
      control: {
        type: 'string', // to have it disabled
      },
    },
  },
} as ComponentMeta<typeof PermissionsBoundary>

const Template: ComponentStory<typeof PermissionsBoundary> = (args) => (
  <PermissionsBoundary {...args}>
    <div>You can see this: {faker.lorem.paragraph()}</div>
  </PermissionsBoundary>
)

export const NoPermission = Template.bind({})

NoPermission.args = {
  resource: 'resource',
  operation: 'delete',
  errorComponent: ({ error }) => <div>errorComponent: {error?.message}</div>,
}

export const WithPermission = Template.bind({})

WithPermission.args = {
  resource: 'article',
  operation: 'view',
  errorComponent: ({ error }) => <div>errorComponent: {error?.message}</div>,
}
