/* eslint-disable no-multi-assign, prefer-destructuring */
import React from 'react'
// @ts-ignore
import styled, { x, FlexboxesProps } from '@xstyled/styled-components'

type ColWidths = {
  xs: string
  md: string
  lg: string
}

const maxCols = 12

const resolveColWidth = (size: number): string => {
  const width = (size / maxCols) * 100
  return `${Math.min(100, width)}%`
}

const calculateWidths = (size: number | undefined, gridSize: number | number[] | undefined): ColWidths => {
  let mobileGridSize
  let tabletGridSize
  let desktopGridSize
  mobileGridSize = tabletGridSize = desktopGridSize = gridSize
  if (Array.isArray(gridSize)) {
    mobileGridSize = gridSize[0]
    tabletGridSize = gridSize[1] || gridSize[0]
    desktopGridSize = gridSize[2] || gridSize[1] || gridSize[0]
  }
  let mobileSize
  let tabletSize
  let desktopSize
  mobileSize = tabletSize = desktopSize = size
  if (Array.isArray(size)) {
    mobileSize = size[0]
    tabletSize = size[1] || size[0]
    desktopSize = size[2] || size[1] || size[0]
  }
  return {
    xs: resolveColWidth(mobileSize || mobileGridSize),
    md: resolveColWidth(tabletSize || tabletGridSize),
    lg: resolveColWidth(desktopSize || desktopGridSize),
  }
}

type BaseColProps = {
  gridSize?: number | number[]
  size?: number
  gutter?: number
  verticalGutter?: number
  justifyContent?: FlexboxesProps['justifyContent']
  flexDirection?: FlexboxesProps['flexDirection']
  alignItems?: FlexboxesProps['alignItems']
  debug?: boolean
  children?: React.ReactNode
}

const BaseCol = ({ size, gridSize, gutter, verticalGutter, justifyContent, flexDirection = 'column', alignItems, ...props }: BaseColProps): JSX.Element => {
  const width = calculateWidths(size, gridSize) // TODO: memoize
  const isFlexNeeded = !!(justifyContent || alignItems)
  const display: 'flex' | 'block' = isFlexNeeded ? 'flex' : 'block'
  return (
    <x.div
      {...props}
      px={gutter}
      py={verticalGutter}
      display={display}
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      w={width}
    />
  )
}

export const Col = styled(BaseCol)`
  box-sizing: border-box;
  outline: ${(props: BaseColProps): string => (props.debug ? '1px dashed deeppink' : 'none')};
`

export default Col
