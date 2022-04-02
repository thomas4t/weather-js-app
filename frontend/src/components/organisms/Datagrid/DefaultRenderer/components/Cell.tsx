import React from 'react'
import styled from '@xstyled/styled-components'

const StyledCell = styled.div``

type Props = {
  children: React.ReactNode
  className?: string
}
const Cell = ({ children, className }: Props): JSX.Element => <StyledCell className={className}>{children}</StyledCell>

export default Cell
