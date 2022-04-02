import React from 'react'
import styled from '@xstyled/styled-components'

export type Props = {
  children: React.ReactNode
  opacity?: number
}

const BareTooltip = styled.div<Props>`
  display: inline-flex;
  flex-direction: column;
  padding: 3;
  border-radius: lg;
  background-color: background3;
  color: gray1;
  font-size: xs;
  box-shadow: lg;
  line-height: 130%;
  opacity: ${(props) => props.opacity || 0.8};
`

export default BareTooltip
