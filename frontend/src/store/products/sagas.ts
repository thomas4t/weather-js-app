import { takeEvery, put } from 'redux-saga/effects'
import { t } from '@lingui/macro'
import { FetchAction } from '@inventi/keep'
import { toProductRow } from '@typings/entities/ProductRow'
import { isActionFetchRequestedFor, getFirstObjectProperty, weatherApiKey, weatherApiEndpoint } from '../utils'
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
  const url = `${weatherApiEndpoint}/data/2.5/forecast?q=London,us&mode=json&appid=${weatherApiKey}`
  yield fetch(action, { args: ['GET', url] })
}

export default function* watch(): Generator {
  yield takeEvery(isActionFetchRequestedFor('products'), fetchProducts)
  yield takeEvery(isActionFetchRequestedFor('productsOverridden'), fetchProductsOverridden)
}
