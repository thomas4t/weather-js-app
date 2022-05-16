import { takeEvery, select } from 'redux-saga/effects'
import { FetchAction } from '@inventi/keep'
import { selectors } from '@store/ui'
import { isActionFetchRequestedFor, weatherApiKey, weatherApiEndpoint } from '../utils'
import fetch from '../fetch'

function* fetchWeatherSearch(action: FetchAction): Generator {
  const appLang = (yield select(selectors.getLanguage)) as string
  const payload = action.args.at(-1)?.query
  const payloadLang =
    {
      cs: 'cz',
      en: 'en',
    }[appLang] ?? 'en'
  const url = `${weatherApiEndpoint}/data/2.5/forecast?q=${payload}&lang=${payloadLang}&mode=json&units=metric&appid=${weatherApiKey}`
  yield fetch(action, { args: ['GET', url] })
}

export default function* watch(): Generator {
  yield takeEvery(isActionFetchRequestedFor('weather:search'), fetchWeatherSearch)
}
