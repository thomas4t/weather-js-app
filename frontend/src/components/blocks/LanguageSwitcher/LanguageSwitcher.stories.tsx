import { ComponentStory, ComponentMeta } from '@storybook/react'
import LanguageSwitcher from './LanguageSwitcher'

export default {
  title: 'Blocks/LanguageSwitcher',
  component: LanguageSwitcher,
  argTypes: {
    changeLanguage: { action: true },
  },
} as ComponentMeta<typeof LanguageSwitcher>

const Template: ComponentStory<typeof LanguageSwitcher> = (args) => <LanguageSwitcher {...args} />

export const Basic = Template.bind({})

Basic.args = {
  language: 'cs',
}
