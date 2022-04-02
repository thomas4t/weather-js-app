import { all, takeEvery } from 'redux-saga/effects'
import fetch from './fetch'
import { isActionFetchRequestedFor } from './utils'
import products from './products/sagas'
import user from './user/sagas'
/* PLOP_INJECT_NEXT_IMPORT */

function* fetchSaga(key: string): Generator {
  yield takeEvery(isActionFetchRequestedFor(key), fetch)
}

export default function* rootSaga(): Generator {
  yield all([
    //! TODO
    //weather()
    fetchSaga('product'), // basic fetch
    products(), // own saga
    user(),
    /* PLOP_INJECT_NEXT_SAGA */
  ])
}
