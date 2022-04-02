import { PureComponent } from 'react'
import withConnectedRouter from '@HoC/withConnectedRouter'

interface Props {
  pathname: string
  search?: string
}

class ScrollToTop extends PureComponent<Props> {
  public componentDidUpdate(prevProps: Props): void {
    if (this.props.pathname !== prevProps.pathname || this.props.search !== prevProps.search) {
      console.log('Scrolling to top.')
      window.scrollTo(0, 0)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): null {
    return null
  }
}

export default withConnectedRouter(ScrollToTop)
