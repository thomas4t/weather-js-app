import { useCallback } from 'react'
import { Route } from 'react-router-dom'

type Props = {
  statusCode?: number
  children: React.ReactNode
}

const RouteStatus = ({ statusCode, children }: Props): JSX.Element => {
  const render = useCallback(
    ({ staticContext }) => {
      if (staticContext) {
        // eslint-disable-next-line no-param-reassign
        staticContext.statusCode = statusCode
      }
      return children
    },
    [statusCode, children],
  )
  return <Route render={render} />
}

export default RouteStatus
