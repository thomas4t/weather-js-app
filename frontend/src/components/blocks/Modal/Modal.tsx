import React, { useCallback } from 'react'
import { x, SystemProps } from '@xstyled/styled-components'
import Icon from '@components/elements/Icon'
import Button, { ButtonVariant } from '@components/elements/Button'
import KeyPress from '@components/elements/KeyPress/KeyPress'
import { ModalStyles } from './styles'

export type ControlProps = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export type ModalProps = ControlProps &
  Omit<SystemProps, 'color'> & {
    children: React.ReactNode
    headingIcon?: string
    heading: React.ReactNode
    cancelText?: React.ReactNode
    confirmText?: React.ReactNode
    onConfirm?: () => void
    shouldCloseOnBackdrop?: boolean
  }

const Modal = ({
  isOpen,
  headingIcon,
  heading,
  children,
  onClose,
  onConfirm,
  cancelText,
  confirmText,
  shouldCloseOnBackdrop = true,
  ...props
}: ModalProps): JSX.Element | null => {
  const closeOnBackdrop = useCallback(() => {
    if (shouldCloseOnBackdrop) onClose()
  }, [shouldCloseOnBackdrop, onClose])
  if (!isOpen) return null
  return (
    <>
      <ModalStyles.Background onClick={closeOnBackdrop} />
      <ModalStyles.Wrapper {...props}>
        <KeyPress action={onClose} keyCode={27} />
        <x.div display="flex" flexDirection="column" justifyContent="space-between" flex="1">
          <x.div>
            <ModalStyles.Header>
              <ModalStyles.Heading>
                {headingIcon && (
                  <x.div w="3em" mr="1">
                    <Icon icon={headingIcon} stroke="primary1" width="2em" height="2em" />
                  </x.div>
                )}
                {heading}
              </ModalStyles.Heading>
              <Icon icon="cross" width="1em" height="1em" stroke="gray3" strokeHovered="primary1" onClick={onClose} />
            </ModalStyles.Header>
            <ModalStyles.Content>{children}</ModalStyles.Content>
          </x.div>

          {(cancelText || confirmText) && (
            <ModalStyles.Buttons>
              {cancelText && (
                <Button variant={ButtonVariant.secondary} onClick={onClose}>
                  {cancelText}
                </Button>
              )}
              {confirmText && (
                <Button variant={ButtonVariant.primary} onClick={onConfirm}>
                  {confirmText}
                </Button>
              )}
            </ModalStyles.Buttons>
          )}
        </x.div>
      </ModalStyles.Wrapper>
    </>
  )
}

export default Modal
