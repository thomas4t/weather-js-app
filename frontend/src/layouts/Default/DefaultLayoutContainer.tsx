import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelectors as createKeepSelectors } from '@inventi/keep'
import { selectors, actions } from '@store/notifications'
import DefaultLayout from './DefaultLayout'

export default connect(
  (state) => ({
    notifications: selectors.getAll(state),
    user: createKeepSelectors<IUser>('user')(state)?.data,
  }),
  (dispatch) => bindActionCreators({ pushNotification: actions.push }, dispatch),
)(DefaultLayout)
