import { all, takeEvery } from 'redux-saga/effects'
import fetch from './fetch'
import { isActionFetchRequestedFor } from './utils'
import weather from './weather/sagas'
/* PLOP_INJECT_NEXT_IMPORT */

function* fetchSaga(key: string): Generator {
  yield takeEvery(isActionFetchRequestedFor(key), fetch)
}

export default function* rootSaga(): Generator {
  yield all([
    //fetchSaga('product'), // basic fetch
    weather(), // own saga
    /* PLOP_INJECT_NEXT_SAGA */
  ])
}
