import React, { ComponentType } from 'react'

export type Props = {
  error?: string
  isLoading?: boolean
  children: JSX.Element
  loadingComponent: ComponentType
  errorComponent: ComponentType<{ error?: Error }>
}

const LoadingBoundary = ({ error, isLoading, loadingComponent: LoadingComponent, errorComponent: ErrorComponent, children }: Props): JSX.Element => {
  if (isLoading) {
    return <LoadingComponent />
  }

  if (error) {
    return <ErrorComponent error={new Error(error)} />
  }

  return children
}

export default LoadingBoundary
