import React from 'react'
import { faker } from '@faker-js/faker'
import { x } from '@xstyled/styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Text as InputTextStory } from '../../elements/Input/Input.stories'
import InputField from './InputField'

export default {
  title: 'Blocks/InputField',
  component: InputField,
} as ComponentMeta<typeof InputField>

const Template: ComponentStory<typeof InputField> = (args) => (
  <x.div p={3}>
    <InputField {...args} />
  </x.div>
)

export const Basic = Template.bind({})

Basic.args = {
  ...InputTextStory.args,
  error: faker.lorem.sentence(),
}
