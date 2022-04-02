import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelectors as createKeepSelectors } from '@inventi/keep'
import DefaultLayout from './DefaultLayout'

export default connect(
  (state) => ({
    user: createKeepSelectors<IUser>('user')(state)?.data,
  }),
  (dispatch) => bindActionCreators({}, dispatch),
)(DefaultLayout)
