import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelectors, actions, useQueryFetch } from '@inventi/keep'
import { CityWeather } from '@typings/entities/Weather'
import Forecast from './Forecast'

const reduxKey = 'weather#search'
const sagaKey = 'weather:search'

const searchSelectors = createSelectors<CityWeather>(reduxKey)

const ForecastContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const { data: searchResults, isLoading: isSearchLoading, error: searchError } = useSelector(searchSelectors)

  const onSearch = useQueryFetch(reduxKey, sagaKey)
  const handleSearchSubmit = useCallback(() => onSearch({ query: search }), [onSearch, search])
  const handleClear = useCallback(() => dispatch(actions.fetchClear(reduxKey)), [useDispatch])

  return (
    <Forecast
      isLoading={isSearchLoading}
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
