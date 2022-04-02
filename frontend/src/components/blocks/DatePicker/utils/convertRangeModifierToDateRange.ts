import { RangeModifier } from 'react-day-picker'
import { DateRange } from '../types'

const convertRangeModifierToDateRange = (modifier: RangeModifier): DateRange => ({
  from: modifier.from || undefined,
  to: modifier.to || undefined,
})
export default convertRangeModifierToDateRange
