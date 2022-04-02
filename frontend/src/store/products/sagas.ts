import { takeEvery, put } from 'redux-saga/effects'
import { t } from '@lingui/macro'
import { FetchAction } from '@inventi/keep'
import { toProductRow } from '@typings/entities/ProductRow'
import { isActionFetchRequestedFor, getFirstObjectProperty } from '../utils'
import fetch from '../fetch'

function* fetchProducts(action: FetchAction): Generator {
  yield fetch(action, { transform: [getFirstObjectProperty, toProductRow] })
  if (typeof window !== 'undefined') {
    yield alert(t({ id: 'transSagaExample', message: 'fetchProducts saga' }))
  }
}

function* fetchProductsOverridden(action: FetchAction): Generator {
  // Note here, how you can override action key or args
  // [method, url, payload]
  console.log('fetchProductsOverridden action', action)
  const url = 'https://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid=c10ab5db48ccf1a469e7c97fa0acd156'
  yield fetch(action, { args: ['GET', url] })
}

export default function* watch(): Generator {
  yield takeEvery(isActionFetchRequestedFor('products'), fetchProducts)
  yield takeEvery(isActionFetchRequestedFor('productsOverridden'), fetchProductsOverridden)
}
