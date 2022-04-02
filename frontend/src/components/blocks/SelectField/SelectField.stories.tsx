import React from 'react'
import { faker } from '@faker-js/faker'
import { x } from '@xstyled/styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SelectStory from '../../blocks/Select/Select.stories'
import SelectField from './SelectField'

export default {
  title: 'Blocks/SelectField',
  component: SelectField,
} as ComponentMeta<typeof SelectField>

const Template: ComponentStory<typeof SelectField> = (args) => (
  <x.div p={3}>
    <SelectField {...args} />
  </x.div>
)

export const Basic = Template.bind({})

Basic.args = {
  ...SelectStory.args,
  error: faker.lorem.sentence(),
}
