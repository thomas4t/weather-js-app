import { withRouter, match } from 'react-router'
import flowRight from 'lodash/flowRight'
import withPagePermission from '@HoC/withPagePermission'
import Homepage from './Homepage'

type Props = {
  match: match
}

const HomepageContainer = ({ match: { params } }: Props): JSX.Element => {
  // ... data loading
  return <Homepage isLoading={false} error={undefined} />
}

export default flowRight(withPagePermission('homepage:view'), withRouter)(HomepageContainer)
