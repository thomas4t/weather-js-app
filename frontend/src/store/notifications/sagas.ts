import { takeEvery, delay, put } from 'redux-saga/effects'
import { actions, NotificationAction } from '.'

export function* onPushSagaEffect(action: NotificationAction): Generator {
  if (!action?.payload?.delay) return
  yield delay(action?.payload?.delay)
  yield put(actions.remove(action?.payload?.id))
}

export default function* watchOnPushSaga(): Generator {
  yield takeEvery(actions.push, onPushSagaEffect)
}
