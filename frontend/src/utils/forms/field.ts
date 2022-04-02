/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
import memoize from 'lodash/memoize'
import values from 'lodash/values'

const fieldErrorTypeToMessage = (type?: string): string | undefined => {
  if (type === 'required') return 'This field is required.'
  if (type === 'min') return 'Value has to be lower.'
  if (type === 'max') return 'Value has to be greater.'
  if (type === 'minLength') return 'This field is too short.'
  if (type === 'maxLength') return 'This field is too long.'
  if (type === 'pattern') return 'This field is not valid.'
  if (type === 'validate') return 'This field is not valid.'
  return type
}

const getFieldError = (errors: any, field: string): string | undefined => errors[field]?.message || fieldErrorTypeToMessage(errors[field]?.type)

const createSetValueNonMemoized =
  <Value = any>(setValue: Function, fieldName: string) =>
  (value: Value) =>
    setValue(fieldName, value)
const createSetValue = memoize(createSetValueNonMemoized, (...args) => values(args).join('_'))

export const fieldEnhancer = (errors: any, setValue: Function) => (fieldName: string) => ({
  error: getFieldError(errors, fieldName),
  setValue: createSetValue(setValue, fieldName),
})
