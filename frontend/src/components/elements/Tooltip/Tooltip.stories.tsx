import React from 'react'
import { faker } from '@faker-js/faker'
import { x } from '@xstyled/styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Icon from '../Icon'
import Button from '../Button/Button'
import BareTooltip from './BareTooltip'
import Tooltip from './Tooltip'

export default {
  title: 'Elements/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const ExampleTooltip = (
  <>
    {faker.lorem.sentence(10)} <Icon icon="checkTick" stroke="primary1" />
  </>
)

const BareTemplate: ComponentStory<typeof Tooltip> = (args) => (
  <x.div w="10em">
    <BareTooltip {...args} />
  </x.div>
)

export const Bare = BareTemplate.bind({})

Bare.args = {
  children: ExampleTooltip,
}

const TooltipOnComponentTemplate: ComponentStory<typeof Tooltip> = (args) => (
  <x.div m="10em">
    <Tooltip {...args} />
  </x.div>
)

export const TooltipOnComponent = TooltipOnComponentTemplate.bind({})

TooltipOnComponent.args = {
  children: <Button>{faker.lorem.words(2)}</Button>,
  tooltip: ExampleTooltip,
  isDeactivated: false,
}
