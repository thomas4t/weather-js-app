import { DateUtils } from 'react-day-picker'
import { DateRange } from '../types'
import convertDataRangeToRangeModifier from './convertDataRangeToRangeModifier'
import convertRangeModifierToDateRange from './convertRangeModifierToDateRange'

const updateDateRange = (range: DateRange, day: Date): DateRange =>
  convertRangeModifierToDateRange(DateUtils.addDayToRange(day, convertDataRangeToRangeModifier(range)))

export default updateDateRange
