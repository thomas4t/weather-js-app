import React, { useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { x } from '@xstyled/styled-components'
import Input, { InputType } from '@components/blocks/InputField'
import Select, { HookFormSelect } from '@components/blocks/SelectField'
import Button, { ButtonVariant } from '@components/elements/Button'
import RadioButton from '@components/elements/RadioButton'
import CheckBox from '@components/elements/CheckBox'
import InputLabel, { InputVariant } from '@components/elements/InputLabel'
import Icon from '@components/elements/Icon'
import { FormSection, FormSectionTitle, FormRow, FormCol } from '@components/elements/Form'
import { fieldEnhancer } from '@utils/forms/field'

const countryOptions = [
  { value: 'cs', label: 'CZ' },
  { value: 'sk', label: 'SK' },
]
const genderOptions = [
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'mrs' },
]

export type Props = {
  onSubmit: (values: Record<string, any>, submittedBy?: string) => void
  defaultValues?: Record<string, any>
}

const Form = ({ onSubmit, defaultValues }: Props): JSX.Element => {
  const formMethods = useForm({ defaultValues })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formMethods
  const [submittedBy, setSubmittedBy] = React.useState<string | undefined>(undefined)
  const enhanceField = fieldEnhancer(errors, setValue)
  const setSubmittedBySave = React.useCallback(() => setSubmittedBy('save'), [setSubmittedBy])
  const setSubmittedByRegister = React.useCallback(() => setSubmittedBy('register'), [setSubmittedBy])
  const onSubmitDecorated = useCallback(
    (data: Record<string, any>) => {
      onSubmit?.(data, submittedBy)
    },
    [onSubmit, submittedBy],
  )
  console.log('errors', errors)
  return (
    <form onSubmit={handleSubmit(onSubmitDecorated)}>
      <FormProvider {...formMethods}>
        <FormSectionTitle title="Lorem ipsum" subtitle="sit amet dolor" icon="bell2" />
        {Object.keys(errors).length > 0 && (
          <InputLabel ml="4" mr="4" mt="3" variant={InputVariant.error} text="An error occured" icon={<Icon key="error" icon="error" fill="black" />} />
        )}
        <FormSection mt="2">
          <FormRow>
            <HookFormSelect name="country" label="Země sídla" options={countryOptions} rules={{ required: true }} component={Select} />
            <Input type={InputType.text} placeholder="Typ tenanta" {...register('tenantType', { disabled: true })} />
          </FormRow>
          <FormRow>
            <Input
              type={InputType.text}
              placeholder="Company name"
              {...enhanceField('companyName')}
              {...register('companyName', {
                required: true,
                minLength: { value: 50, message: 'Company name has to be very very long.' },
              })}
            />
            <Input type={InputType.text} placeholder="Company ICO" {...enhanceField('ico')} {...register('ico', { required: true, minLength: 8 })} />
          </FormRow>
          <FormRow size={4}>
            <FormCol width={35}>
              <Input type={InputType.text} placeholder="Street" {...enhanceField('street')} {...register('street', { required: true })} />
            </FormCol>
            <FormCol width={15}>
              <Input type={InputType.text} placeholder="st. number" {...enhanceField('streetNumber')} {...register('streetNumber', { required: true })} />
            </FormCol>
            <FormCol width={35}>
              <Input type={InputType.text} placeholder="Město" {...enhanceField('city')} {...register('city', { required: true })} />
            </FormCol>
            <FormCol width={15}>
              <Input type={InputType.text} placeholder="Postcode" {...enhanceField('postcode')} {...register('postcode', { required: true })} />
            </FormCol>
          </FormRow>
          <FormRow>
            <Input type={InputType.text} placeholder="Country" {...enhanceField('country')} {...register('country', { disabled: true })} />
            <Input type={InputType.text} placeholder="Province" {...enhanceField('province')} {...register('province', {})} />
          </FormRow>
          <FormRow>
            <CheckBox {...enhanceField('isInvoiceAddressSame')} {...register('isInvoiceAddressSame', {})} label="Invoice address is same as delivery" />
          </FormRow>
          <FormRow>
            <HookFormSelect name="gender" label="Země DIČ" options={genderOptions} rules={{ required: true }} component={Select} />
            <Input type={InputType.numeric} placeholder="DIC" {...enhanceField('dic')} {...register('dic', {})} />
          </FormRow>
        </FormSection>

        <FormSectionTitle title="Lorem ipsum" subtitle="lorem ipsum" icon="bell2" />
        <FormSection mt="2">
          <FormRow size={3}>
            <FormCol width={30}>
              <Input type={InputType.text} placeholder="Alias" {...enhanceField('alias')} {...register('alias', { required: true })} />
            </FormCol>
            <FormCol width={20}>
              <Input type={InputType.text} placeholder="Firstname" {...enhanceField('firstname')} {...register('firstname', { required: true })} />
            </FormCol>
            <FormCol width={50}>
              <Input type={InputType.text} placeholder="Lastname" {...enhanceField('lastname')} {...register('lastname', { required: true })} />
            </FormCol>
          </FormRow>
          <FormRow size={3}>
            <FormCol width={30}>
              <Input type={InputType.text} placeholder="Email" {...enhanceField('email')} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
            </FormCol>
            <FormCol width={20}>
              <Input type={InputType.text} placeholder="Phone" {...enhanceField('phone')} {...register('phone', { required: true })} />
            </FormCol>
          </FormRow>
          <FormRow size={null}>
            <FormCol>
              <x.div mt="3">
                <CheckBox {...enhanceField('agree1')} {...register('agree1', {})} label="Lorem ipsum 1" />
              </x.div>
              <x.div mt="3">
                <CheckBox {...enhanceField('agree2')} {...register('agree2', {})} label="Lorem ipsum 2" />
              </x.div>
              <x.div mt="3">
                <CheckBox {...enhanceField('agree3')} {...register('agree3', {})} label="Lorem ipsum 3" />
              </x.div>
              <x.div mt="3">
                <RadioButton {...enhanceField('radio1')} {...register('radio1', { required: false })} label="Lorem ipsum 1" value="Yes" />
              </x.div>
              <x.div mt="3">
                <RadioButton {...enhanceField('radio1')} {...register('radio1', { required: false })} label="Lorem ipsum 2" value="No" />
              </x.div>
            </FormCol>
          </FormRow>
          <FormRow size={null} justifyContent="right">
            <Button type="reset" variant={ButtonVariant.secondary}>
              Reset
            </Button>
            <Button type="submit" variant={ButtonVariant.secondary} onClick={setSubmittedBySave}>
              Submit save
            </Button>
            <Button type="submit" onClick={setSubmittedByRegister}>
              Submit register
            </Button>
          </FormRow>
        </FormSection>
      </FormProvider>
    </form>
  )
}

export default Form
