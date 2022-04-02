import { Modifiers } from 'react-day-picker'
import { DateRange } from '../types'

const getStartAndEndDay = (range?: DateRange): Partial<Modifiers> => ({
  start: range?.from,
  end: range?.to,
})

export default getStartAndEndDay
