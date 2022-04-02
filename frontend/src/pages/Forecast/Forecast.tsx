import { x } from '@xstyled/styled-components'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import Page from '@components/blocks/Page'
import Card from '@components/elements/Card'
import Input from '@components/elements/Input'
import Icon from '@components/elements/Icon'
import Button, { ButtonVariant } from '@components/elements/Button'
import { CityWeather } from '@typings/entities/Weather'
import WeatherCard from './components/WeatherCard'

type Props = {
  isLoading?: boolean
  error?: string
  search: string
  searchResults?: CityWeather
  onSearchChange: (value: string) => void
  onSearchSubmit: () => void
  onSearchClear: () => void
}

const inputSearchIcons = <Icon key="checkTick" icon="checkTick" stroke="secondary4" strokeHovered="gray1" />

const Forecast = ({ isLoading, error, search, searchResults, onSearchChange, onSearchSubmit, onSearchClear }: Props): JSX.Element => {
  const isSearchValid = search?.length > 3
  return (
    <Page isLoading={isLoading}>
      <x.h2 mb="2">
        <Trans id="forecast.heading" message="Lookup by city" />
      </x.h2>

      <Input
        value={search}
        onChangeText={onSearchChange}
        onEnter={onSearchSubmit}
        placeholder={t({ id: 'forecast.searchInput.placeholder', message: 'Type to search ...' })}
        icons={isSearchValid ? inputSearchIcons : undefined}
      />

      <Button type="button" onClick={onSearchSubmit} variant={isSearchValid ? ButtonVariant.primary : ButtonVariant.bare} disabled={!isSearchValid} my={4}>
        {isSearchValid ? (
          <Trans id="forecast.search.submit" message="Try your luck" />
        ) : (
          <>
            <Icon icon="error" />
            <Trans id="forecast.search.invalidSearch" message="Enter at least 3 characters" />
          </>
        )}
      </Button>

      {error ? <Card mt="6">'error occured:(</Card> : null}
      {searchResults ? (
        <>
          <WeatherCard weather={searchResults} />
          <Button type="button" onClick={onSearchClear} variant={ButtonVariant.secondary} mt={4}>
            <Trans id="forecast.search.clear" message="Clear" />
          </Button>
        </>
      ) : (
        <Trans id="forecast.search.noResults" message="Looks like we haven't found anything yet." />
      )}
    </Page>
  )
}

export default Forecast
