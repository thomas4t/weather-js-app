/* eslint-disable @inventi/reinhard/components-staff-culture */
import styled from '@xstyled/styled-components'

const FormCol = styled.div<{ width?: number }>`
  width: ${(props) => (props.width ? `${props.width}%` : undefined)};
  > * {
    width: 100%;
  }
`

export default FormCol
