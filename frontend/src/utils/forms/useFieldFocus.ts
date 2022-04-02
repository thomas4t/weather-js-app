/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import React from 'react'

type useFieldFocusProps = {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

type useFieldFocusReturn = {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  isFocused: boolean
  focusedValue?: string
}

const useFieldFocus = ({ onFocus, onBlur }: useFieldFocusProps): useFieldFocusReturn => {
  const [focusedValue, setFocusedValue] = React.useState(undefined)
  const onFocusEnhanced = React.useCallback(
    (e) => {
      setFocusedValue(e?.target?.value)
      onFocus?.(e)
    },
    [onFocus],
  )
  const onBlurEnhanced = React.useCallback(
    (e) => {
      setTimeout(() => setFocusedValue(undefined), 300)
      onBlur?.(e)
    },
    [onBlur],
  )

  return { onFocus: onFocusEnhanced, onBlur: onBlurEnhanced, isFocused: typeof focusedValue !== 'undefined', focusedValue }
}

export default useFieldFocus
