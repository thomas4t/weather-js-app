export interface CityWeather {
  cod: string
  message: number
  cnt: number
  list: List[]
  city: City
}

interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

interface Coord {
  lat: number
  lon: number
}

interface List {
  dt: number
  main: MainClass
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  dt_txt: Date
}

interface Clouds {
  all: number
}

interface MainClass {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

export interface Weather {
  id: number
  main: MainEnum
  description: string
  icon: string
}

export enum MainEnum {
  clear = 'Clear',
  clouds = 'Clouds',
  rain = 'Rain',
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}
