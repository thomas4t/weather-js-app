import { useState, useCallback } from 'react'
import { ControlProps } from './Modal'

export const useModal = (initialState = false): ControlProps => {
  const [isOpen, setIsOpen] = useState(initialState)
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen])
  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen])
  return { isOpen, onClose, onOpen }
}
