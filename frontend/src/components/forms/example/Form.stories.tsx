/* eslint-disable react-perf/jsx-no-new-array-as-prop, react/no-array-index-key */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Form from './Form'

export default {
  title: 'Forms/@Example',
  component: Form,
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />

export const Basic = Template.bind({})

Basic.args = {
  onSubmit: (data: Record<string, any>, submittedBy?: string) => {
    console.log('data', data)
    console.log('submittedBy', submittedBy)
  },
}

export const Defaults = Template.bind({})

Defaults.args = {
  onSubmit: Basic.args.onSubmit,
  defaultValues: {
    agree1: true,
    agree2: true,
    agree3: true,
    alias: 'Irure eos officia ne',
    check: true,
    city: 'Perferendis ex in no',
    companyName: 'Humphrey Perez LLC',
    country: 'sk',
    countryDic: 12345,
    dic: '98',
    email: 'kycizawu@mailinator.com',
    firstName: 'Name',
    firstname: 'Faith',
    gender: 'mrs',
    ico: 'Voluptate veniam qu',
    isInvoiceAddressSame: true,
    lastName: 'Vorname',
    lastname: 'Gilliam',
    phone: '+1 (249) 812-3304',
    postcode: 'Odit nulla id natus',
    province: 'Distinctio Et numqu',
    radio1: 'Yes',
    street: 'Perferendis similiqu',
    streetNumber: '783',
    tenantType: 'Qui non occaecat ess',
  },
}
