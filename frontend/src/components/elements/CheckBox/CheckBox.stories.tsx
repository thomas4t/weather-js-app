import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { theme } from '@utils/storybook/storyArgTypes'
import CheckBox from './CheckBox'

export default {
  title: 'Elements/CheckBox',
  component: CheckBox,
  argTypes: {
    onChange: { action: 'change' },
    theme,
  },
} as ComponentMeta<typeof CheckBox>

const labelText = faker.lorem.word()

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />

export const Basic = Template.bind({})

Basic.args = {
  name: 'address',
  label: labelText,
  checked: true,
  value: 'address',
}

const MultipleTemplate: ComponentStory<typeof CheckBox> = (args) => (
  <>
    <CheckBox {...args} label="Option 1" value="1" />
    <CheckBox {...args} label="Option 2" value="2" />
    <CheckBox {...args} label="Option 3" value="3" />
  </>
)

export const Multiple = MultipleTemplate.bind({})

Multiple.args = {
  name: 'address',
  checked: true,
}
