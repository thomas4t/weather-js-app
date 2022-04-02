import { ComponentStory, ComponentMeta } from '@storybook/react'
import LoginForm from './LoginForm'

export default {
  title: 'Pages/Login/LoginForm',
  component: LoginForm,
  argTypes: {
    onSubmit: {
      action: true,
      control: {
        type: 'string', // to disable control
      },
    },
  },
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

export const Basic = Template.bind({})

Basic.args = {
  defaultValues: {
    email: '',
    password: '',
  },
}
