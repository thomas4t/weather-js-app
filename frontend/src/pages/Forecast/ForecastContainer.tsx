import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelectors, actions, useQueryFetch } from '@inventi/keep'
import Forecast from './Forecast'
import { CityWeather } from '@typings/entities/Weather'

const reduxKey = 'weather#search'
const sagaKey = 'weather:search'

const productSelectors = createSelectors<CityWeather>(reduxKey)

const ForecastContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  // TODO Move me to redux
  const [search, setSearch] = useState('')
  const { data: searchResults, isLoading: searchLoading, error: searchError } = useSelector(productSelectors)

  const onSearch = useQueryFetch(reduxKey, sagaKey)
  const handleSearchSubmit = useCallback(() => onSearch({ query: search }), [onSearch, search])
  const handleClear = useCallback(() => dispatch(actions.fetchClear(reduxKey)), [useDispatch])

  return (
    <Forecast
      isLoading={searchLoading}
      error={searchError}
      search={search}
      searchResults={searchResults}
      onSearchChange={setSearch}
      onSearchSubmit={handleSearchSubmit}
      onSearchClear={handleClear}
    />
  )
}

export default ForecastContainer
