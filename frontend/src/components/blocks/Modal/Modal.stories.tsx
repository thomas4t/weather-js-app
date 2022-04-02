import React from 'react'
import { faker } from '@faker-js/faker'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { x } from '@xstyled/styled-components'
import Button, { ButtonVariant } from '@components/elements/Button'
import Input, { InputType } from '@components/elements/Input'
import CheckBox from '@components/elements/CheckBox'
import { Modal, useModal } from '.'

export default {
  title: 'Blocks/Modal',
  component: Modal,
  argTypes: {
    onConfirm: { action: 'click' },
  },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
  const controls = useModal(args.isOpen)
  return (
    <>
      <Modal {...args} {...controls}>
        {faker.lorem.sentences(2)}
      </Modal>

      <button type="button" onClick={controls.isOpen ? controls.onClose : controls.onOpen}>
        {controls.isOpen ? 'Close modal' : 'Open modal'}
      </button>
    </>
  )
}

export const Basic = Template.bind({})

Basic.args = {
  isOpen: false,
  heading: <x.h1>Header of Modal</x.h1>,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  shouldCloseOnBackdrop: true,
}

const TemplateFormInside: ComponentStory<typeof Modal> = (args) => {
  const controls = useModal(args.isOpen)
  return (
    <>
      <Modal {...args} {...controls}>
        <>
          <x.div display="flex">
            <x.div mr="2" w="50%">
              <x.p mt="0" color="primary1" fontWeight="light">
                {faker.lorem.sentences(5)}
              </x.p>
            </x.div>
            <x.div w="50%">
              <x.div display="flex" justifyContent="flex-end">
                <x.div mr="6">
                  <Button variant={ButtonVariant.primary}>{faker.lorem.word()}</Button>
                </x.div>
                <x.div mr="6">
                  <Button variant={ButtonVariant.primary}>{faker.lorem.word()}</Button>
                </x.div>
                <x.div>
                  <Button variant={ButtonVariant.secondary}>{faker.lorem.word()}</Button>
                </x.div>
              </x.div>
            </x.div>
          </x.div>

          <x.div display="flex" mt="6">
            <x.div mr="2" w="50%">
              <x.div mt="2">
                <Input type={InputType.text} placeholder={faker.lorem.words(3)} />
              </x.div>
              <x.div mt="4">
                <CheckBox label={faker.lorem.words(3)} />
              </x.div>
            </x.div>
            <x.div ml="2" w="50%">
              <x.div mt="2">
                <Input type={InputType.text} placeholder={faker.lorem.words(3)} />
              </x.div>
              <x.div mt="4">
                <CheckBox label={faker.lorem.words(3)} />
              </x.div>
            </x.div>
          </x.div>
        </>
      </Modal>

      <button type="button" onClick={controls.isOpen ? controls.onClose : controls.onOpen}>
        {controls.isOpen ? 'Close modal' : 'Open modal'}
      </button>
    </>
  )
}

export const FormInside = TemplateFormInside.bind({})

FormInside.args = {
  isOpen: false,
  headingIcon: 'bell2',
  heading: <x.h1>Header of Modal</x.h1>,
  shouldCloseOnBackdrop: true,
}
