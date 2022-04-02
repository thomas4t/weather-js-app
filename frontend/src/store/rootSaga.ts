import { all, takeEvery } from 'redux-saga/effects'
import fetch from './fetch'
import mutate from './mutate'
import { isActionFetchRequestedFor, isActionMutationRequestedFor } from './utils'
import products from './products/sagas'
import notifications from './notifications/sagas'
import user from './user/sagas'
/* PLOP_INJECT_NEXT_IMPORT */

function* fetchSaga(key: string): Generator {
  yield takeEvery(isActionFetchRequestedFor(key), fetch)
}

function* mutateSaga(key: string): Generator {
  yield takeEvery(isActionMutationRequestedFor(key), mutate)
}

export default function* rootSaga(): Generator {
  yield all([
    fetchSaga('product'), // basic fetch
    mutateSaga('order:place'), // basic mutation
    products(), // own saga
    notifications(),
    user(),
    /* PLOP_INJECT_NEXT_SAGA */
  ])
}
