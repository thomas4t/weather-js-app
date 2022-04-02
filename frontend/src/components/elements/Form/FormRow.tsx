import React from 'react'
import styled, { system, SystemProps } from '@xstyled/styled-components'
import FormCol from './FormCol'

const StyledRow = styled.div<RowProps & any>`
  ${system};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  > * {
    padding: 4;
  }
  > *:not(${FormCol}) {
    width: ${(props) => {
      if (typeof props.size === 'undefined') return '50%'
      if (props.size === null) return undefined
      return `${100 / props.size}%`
    }};
  }
`

type RowProps = { size?: number | null; children: React.ReactNode } & SystemProps

const FormRow = (props: RowProps) => (
  // wrap all row children to a div
  <StyledRow {...props}>
    {React.Children.map(props.children, (child) => {
      // @ts-ignore
      const isCol = React.isValidElement(child) && child?.type?.displayName === 'FormCol'
      // if children component is not Col, wrap it into div
      return isCol ? child : <div className="colAuto">{child}</div>
    })}
  </StyledRow>
)

export default FormRow
