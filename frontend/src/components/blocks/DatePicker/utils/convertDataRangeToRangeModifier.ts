import { RangeModifier } from 'react-day-picker'
import { DateRange } from '../types'

const convertDataRangeToRangeModifier = (range?: DateRange): RangeModifier => ({
  from: range?.from,
  to: range?.to,
})

export default convertDataRangeToRangeModifier
