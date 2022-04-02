import React from 'react'
import styled from '@xstyled/styled-components'
import Row from '../Row'

type Props = {
  children: React.ReactNode
}

const StyledRow = styled(Row)`
  margin-bottom: 0;
  padding: 4 2;
  border-radius: lg;
  box-shadow: thinRight;
  background-color: white;
`

const HeaderRow = ({ children }: Props): JSX.Element => <StyledRow>{children}</StyledRow>

export default HeaderRow
