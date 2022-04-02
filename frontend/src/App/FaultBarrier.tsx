import React, { ErrorInfo } from 'react'
import debug from 'debug'
import * as Sentry from '@sentry/browser'
import Error500 from '@pages/Error500'
import RouteStatus from '@utils/components/RouteStatus'

const appDebug = debug('app')

type Props = {
  children: React.ReactNode
}

type State = {
  error?: Error
}

export default class FaultBarier extends React.Component<Props, State> {
  public static getDerivedStateFromError(error: Error): { error: Error } {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    appDebug('App did catch', error, errorInfo)
    Sentry.captureException(error instanceof Error ? error : new Error(JSON.stringify(error)))
    this.setState({ error })
  }

  render(): JSX.Element {
    if (this.state.error) {
      return (
        <RouteStatus statusCode={500}>
          <Error500 error={this.state.error} />
        </RouteStatus>
      )
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{this.props.children}</>
  }
}
