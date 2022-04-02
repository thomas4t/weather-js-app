import { useState, useCallback } from 'react'

type Values = any
type OnSubmit = (values: Values) => void | { promise: Promise<Values> }

type ReturnType<T> = [string | undefined, T]

const useOnSubmitMutate = (onSubmit: OnSubmit): ReturnType<OnSubmit> => {
  const [error, setError] = useState<string>()
  const onSubmitEnhanced = useCallback(
    (values: Values) => {
      setError(undefined)
      const onSubmitReturn = onSubmit(values)
      const promise = onSubmitReturn?.promise
      if (!promise) return
      promise.catch((error: string) => setError(error))
    },
    [onSubmit, setError],
  )
  return [error, onSubmitEnhanced]
}

export default useOnSubmitMutate
