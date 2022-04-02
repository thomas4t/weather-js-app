import React from 'react'
import { Trans } from '@lingui/react'
import { x } from '@xstyled/styled-components'
import Card from '@components/elements/Card'
import { CityWeather } from '@typings/entities/Weather'
import dayjs from 'dayjs'

type Props = {
  weather: CityWeather
}

const WeatherCard = ({ weather }: Props) => {
  const { city, list } = weather
  const listStartIdx = 0
  const listEndIdx = list.length - 1
  const dateFrom = dayjs(list[listStartIdx].dt_txt).format('DD/MM/YYYY')
  const dateTo = dayjs(list[listEndIdx].dt_txt).format('DD/MM/YYYY')
  return (
    <Card>
      <x.h2>
        {city.name}, {city.country}
      </x.h2>
      <x.h3>
        Lat/lng - {city.coord.lat}/{city.coord.lon}
      </x.h3>

      <x.span>
        <Trans
          id="weatherCard.dateFromTo"
          message="Weather from {from} to {to}."
          values={{ from: <strong>{dateFrom}</strong>, to: <strong>{dateTo}</strong> }}
        />
      </x.span>

      <x.div display="flex" overflowY="auto" mt={10}>
        {list.slice(listStartIdx, listEndIdx).map((entry) => {
          const date = dayjs(entry.dt_txt)
          return (
            <Card key={entry.dt} minWidth="250px" minHeight="400px" mr={5} mb={3}>
              <x.div mb={3}>
                <x.span fontSize="2rem">{date.format('HH:mm')}</x.span>
                <x.span> {date.format('DD/MM')}</x.span>
              </x.div>
              {entry.weather.map((w) => (
                <div key={w.id}>
                  {w.main}, {w.description}
                </div>
              ))}

              <div>
                <Trans id="weatherCard.temp" message="Temp {temp} °C" values={{ temp: entry.main.temp }} />
              </div>
              <div>
                <Trans id="weatherCard.tempFeelsLike" message="Temp feels like {temp} °C" values={{ temp: entry.main.feels_like }} />
              </div>
            </Card>
          )
        })}
      </x.div>
    </Card>
  )
}

export default WeatherCard
