/* eslint-disable @inventi/reinhard/components-staff-culture */
import React from 'react'

type Props = {
  children: React.ReactNode
  onErrorChildren: React.ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render(): React.ReactNode {
    if (this.state.hasError) return this.props.onErrorChildren
    return this.props.children
  }
}

export default ErrorBoundary
