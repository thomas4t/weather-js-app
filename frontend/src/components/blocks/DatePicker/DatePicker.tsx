import { SystemProps } from '@xstyled/styled-components'
import React, { useMemo } from 'react'
import { DayModifiers, DayPickerProps, Modifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import Input from '@components/elements/Input'
import dayjs from 'dayjs'
import { Navbar, Wrapper } from './components'
import { convertDataRangeToRangeModifier, formatDateRange, getStartAndEndDay } from './utils'
import { DateRange } from './types'

export type Props = SystemProps & {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  onDayClick?: ((day: Date, modifiers: DayModifiers) => void) | undefined
  selectedDays?: Date | DateRange
  format?: string
  placeholder?: string
  modifiers?: Partial<Modifiers>
  hideOnDayClick?: boolean
}

const DatePicker = ({
  onDayClick,
  selectedDays,
  modifiers,
  format = 'D.M.YYYY',
  placeholder = 'Datum',
  hideOnDayClick = selectedDays instanceof Date,
  ...props
}: Props): JSX.Element => {
  // This is used to add start and end class do dates in calendar
  const startEndModifier = useMemo<Partial<Modifiers>>(() => {
    if (selectedDays instanceof Date) return { start: selectedDays }
    return getStartAndEndDay(selectedDays)
  }, [selectedDays])

  // Props for overlay component
  const overlayProps = useMemo<DayPickerProps>(
    () => ({
      firstDayOfWeek: 1, // 1 = Monday
      navbarElement: Navbar,
      selectedDays: selectedDays instanceof Date ? selectedDays : convertDataRangeToRangeModifier(selectedDays),
      modifiers: { ...startEndModifier, ...modifiers },
    }),
    [selectedDays, modifiers, startEndModifier],
  )

  // Value inside input
  const value = useMemo<string>(() => {
    if (selectedDays instanceof Date) return dayjs(selectedDays).format(format)

    return formatDateRange(format, selectedDays)
  }, [selectedDays, format])

  return (
    <Wrapper>
      <DayPickerInput
        onDayChange={onDayClick}
        dayPickerProps={overlayProps}
        component={Input}
        inputProps={props}
        format={format}
        placeholder={placeholder}
        hideOnDayClick={hideOnDayClick}
        value={value}
      />
    </Wrapper>
  )
}

export default DatePicker
