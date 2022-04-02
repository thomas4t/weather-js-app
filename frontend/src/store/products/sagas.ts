import { takeEvery, put } from 'redux-saga/effects'
import { t } from '@lingui/macro'
import { FetchAction } from '@inventi/keep'
import { toProductRow } from '@typings/entities/ProductRow'
import { actions as notificationsAction } from '@store/notifications'
import { isActionFetchRequestedFor, getFirstObjectProperty } from '../utils'
import fetch from '../fetch'

function* fetchProducts(action: FetchAction): Generator {
  yield fetch(action, { transform: [getFirstObjectProperty, toProductRow] })
  if (typeof window !== 'undefined') {
    yield put(notificationsAction.push(t({ id: 'transSagaExample', message: 'Translated test notification from saga on fetch' })))
  }
}

function* fetchProductsOverridden(action: FetchAction): Generator {
  // Note here, how you can override action key or args
  yield fetch(action, { args: ['products'], transform: [getFirstObjectProperty, toProductRow] })
}

export default function* watch(): Generator {
  yield takeEvery(isActionFetchRequestedFor('products'), fetchProducts)
  yield takeEvery(isActionFetchRequestedFor('productsOverridden'), fetchProductsOverridden)
}
