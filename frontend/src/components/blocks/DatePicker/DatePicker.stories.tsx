import React, { useCallback, useState } from 'react'
import { DayModifiers } from 'react-day-picker'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import DatePicker from './DatePicker'
import { DatePickerUtils, DateRange } from '.'

export default {
  title: 'Blocks/DatePicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>

const SimpleTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const onDayClick = useCallback(
    (day: Date, mods: DayModifiers) => {
      if (mods.disabled) return
      // Selected means that user has selected same date
      if (mods.selected) setDate(undefined)
      else setDate(day)
    },
    [setDate],
  )

  return <DatePicker {...args} onDayClick={onDayClick} selectedDays={date} />
}

export const Basic = SimpleTemplate.bind({})

Basic.args = {
  placeholder: '',
  format: 'D.M.YYYY',
  hideOnDayClick: true,
}

const WithRangeTemplate: ComponentStory<typeof DatePicker> = (args) => {
  let to = new Date()
  to = new Date(to.setDate(to.getDate() + 4))
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to,
  })
  const onDayClick = useCallback(
    (day: Date, mods: DayModifiers) => {
      if (mods.disabled) return
      setDateRange(DatePickerUtils.updateDateRange(dateRange, day))
    },
    [dateRange],
  )

  return <DatePicker {...args} onDayClick={onDayClick} selectedDays={dateRange} />
}

export const WithRange = WithRangeTemplate.bind({})

WithRange.args = {
  placeholder: '',
  format: 'D.M.YYYY',
  hideOnDayClick: false,
}
