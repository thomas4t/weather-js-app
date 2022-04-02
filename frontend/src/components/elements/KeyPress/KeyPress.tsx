import { useEffect, useCallback } from 'react'

export interface OnKeyPressProps {
  action: () => void
  keyCode: number
}

const OnKeyPress = ({ action, keyCode }: OnKeyPressProps): null => {
  const testKeyCode = useCallback(
    (event) => {
      if (event.keyCode === keyCode) {
        action()
      }
    },
    [keyCode, action],
  )

  useEffect(() => {
    document.addEventListener('keydown', testKeyCode, false)
    return () => {
      document.removeEventListener('keydown', testKeyCode, false)
    }
  }, [testKeyCode])

  return null
}

export default OnKeyPress
