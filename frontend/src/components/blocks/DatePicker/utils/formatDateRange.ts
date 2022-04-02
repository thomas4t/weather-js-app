import dayjs from 'dayjs'
import { DateRange } from '../types'

const getFormattedDateRange = (format: string, range?: DateRange): string => {
  if (!range || (!range.from && !range.to)) return ''
  const from = range.from ? dayjs(range.from).format(format) : ''
  const to = range.to ? dayjs(range.to).format(format) : ''

  return `${from} - ${to}`
}

export default getFormattedDateRange
