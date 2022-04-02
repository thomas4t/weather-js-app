import { connect } from 'react-redux'
import { selectors } from '../store/connectedRouter'

export default connect(selectors.routerSelector)
