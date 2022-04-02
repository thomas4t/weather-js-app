import React from 'react'
import get from 'lodash/fp/get'
import styled from '@xstyled/styled-components'

type GridProps = {
  children: React.ReactNode
  size?: number | number[]
  gutter?: number
  verticalGutter?: number
  reverse?: boolean
  justifyContent?: string
  verticalAlign?: string
  alignItems?: string
  debug?: boolean
}

const StyledGrid = styled.div`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props: GridProps): string => (props.reverse ? 'row-reverse' : 'row')};
  outline: ${(props: GridProps): string => (props.debug ? '1px dashed darkturquoise' : 'none')};
  justify-content: ${(props: GridProps): string | undefined => props.justifyContent};
  align-self: ${(props: GridProps): string | undefined => props.verticalAlign};
  align-items: ${(props: GridProps): string | undefined => props.alignItems};
`

const allowedChildTypes = ['Col', 'Styled(BaseCol)']
const checkChild = (child: unknown): JSX.Element => {
  if (allowedChildTypes.indexOf(get('type.displayName', child)) === -1) {
    throw new Error('Direct child of Grid must be <Col> component only.')
  }
  return child as JSX.Element
}

const Grid = (props: GridProps): JSX.Element => (
  <StyledGrid {...props}>
    {React.Children.map(props.children, (child) => {
      const childColumn = checkChild(child)
      return React.cloneElement(childColumn, {
        gridSize: props.size || 12 / React.Children.count(props.children),
        gutter: props.gutter || childColumn.props.gutter,
        verticalGutter: props.verticalGutter || childColumn.props.verticalGutter,
        debug: props.debug,
      })
    })}
  </StyledGrid>
)

export default Grid
