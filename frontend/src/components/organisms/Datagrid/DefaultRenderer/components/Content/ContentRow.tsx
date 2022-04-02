import React from 'react'
import styled from '@xstyled/styled-components'
import Row from '../Row'

const StyledRow = styled(Row)`
  border-bottom: 1px solid;
  border-color: gray3;
  color: gray3;
  background-color: white;
  padding: 0 2;

  &:hover {
    background-color: background5;
    .triangle_svg {
      path {
        fill: background5;
      }
    }
  }
`

type Props = {
  children: React.ReactNode
}

const ContentRow = ({ children }: Props): JSX.Element => <StyledRow>{children}</StyledRow>

export default ContentRow
