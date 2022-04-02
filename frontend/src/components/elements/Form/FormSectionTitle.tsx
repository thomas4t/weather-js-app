import React from 'react'
import { x } from '@xstyled/styled-components'
import Icon from '@components/elements/Icon'

type SectionTitleProps = {
  title: string
  subtitle?: string
  icon: string
}

const FormSectionTitle = ({ title, icon, subtitle }: SectionTitleProps) => (
  <x.div pl="5">
    <x.div display="inline-flex" alignItems="center">
      <Icon icon={icon} stroke="primary1" width="2em" height="2em" mr="3" />
      <h2>{title}</h2>
    </x.div>
    {subtitle && (
      <x.div color="primary1" fontWeight="light">
        {subtitle}
      </x.div>
    )}
  </x.div>
)

export default FormSectionTitle
