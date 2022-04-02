import { ComponentStory, ComponentMeta, Story } from '@storybook/react'
import { x } from '@xstyled/styled-components'
import sortBy from 'lodash/sortBy'
import Icon from './Icon'
import * as icons from './icons'

const iconsList: string[] = Object.keys(icons)

export default {
  title: 'Elements/Icon',
  component: Icon,
  argTypes: {
    onClick: {
      action: true,
      control: {
        type: 'string', // to disable control
      },
    },
    width: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    height: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    m: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    fill: {
      control: {
        type: 'color',
      },
    },
    fillHovered: {
      control: {
        type: 'color',
      },
    },
    stroke: {
      control: {
        type: 'color',
      },
    },
    strokeHovered: {
      control: {
        type: 'color',
      },
    },
    icon: {
      options: iconsList,
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} width={`${args.width}em`} height={`${args.height}em`} />

export const Basic = Template.bind({})

Basic.args = {
  icon: iconsList[0],
  width: 2,
  height: 2,
  m: 2,
}

export const NonExisting = Template.bind({})

NonExisting.args = {
  icon: 'nonExisting',
}

const TemplateAll: Story = () => (
  <x.div display="flex" flexWrap="wrap">
    {sortBy(iconsList, (icon) => icon).map((icon) => (
      <x.div key={icon} w="10em" h="10em" textAlign="center" pb="2em">
        <x.div pb="1em">{icon}</x.div>
        <Icon icon={icon} width="5em" height="5em" />
      </x.div>
    ))}
  </x.div>
)

export const All = TemplateAll.bind({})
