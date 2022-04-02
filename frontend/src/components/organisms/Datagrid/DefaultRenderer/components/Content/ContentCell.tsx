import React from 'react'
// @ts-ignore
import styled, { flexboxes, FlexboxesProps } from '@xstyled/styled-components'
import Cell from '../Cell'

type Props = FlexboxesProps & {
  children: React.ReactNode
  className?: string
}

const StyledContentCell = styled(Cell)`
  height: 3em;
  display: flex;
  align-items: center;
  margin: 3 0;
  color: gray1;
  ${flexboxes}
`

const ContentCell = ({ children, className, ...props }: Props): JSX.Element => (
  <StyledContentCell className={className} {...props}>
    {children}
  </StyledContentCell>
)

export default ContentCell
