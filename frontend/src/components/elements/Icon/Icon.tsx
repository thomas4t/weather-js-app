import React, { Suspense, SVGProps } from 'react'
// @ts-ignore
import styled, { space, SpaceProps, transform, TransformProps } from '@xstyled/styled-components'
// @ts-ignore
import { CSSScalar, th } from '@xstyled/system'
import omit from 'lodash/fp/omit'
import * as icons from './icons'

const formatName = (s: string): string => {
  if (typeof s !== 'string') {
    return ''
  }
  return `${s.charAt(0).toUpperCase()}${s.slice(1)}`
}

// this simply passes down xstyled spacing props
const IconWithSpaceProps = styled(({ icon: Icon, ...props }: any) => {
  const omittedProps = omit(['fill', 'stroke', 'fillHovered', 'strokeHovered'], props)
  return <Icon {...omittedProps} />
})`
  ${space};
  ${transform};
  transition: all 0.3s;

  fill: ${({ fill }) => (fill ? th.color(fill) : undefined)};
  > *[class$='__fill'] {
    fill: ${({ fill }) => (fill ? th.color(fill) : undefined)};
  }
  &:hover {
    fill: ${({ fillHovered }) => (fillHovered ? th.color(`${fillHovered}`) : undefined)};
    /* fill for children */
    > *[class$='__fill'] {
      fill: ${({ fillHovered }) => (fillHovered ? th.color(`${fillHovered}`) : undefined)};
    }
  }

  stroke: ${({ stroke }) => (stroke ? th.color(stroke) : undefined)};
  > *[class$='__stroke'] {
    stroke: ${({ stroke }) => (stroke ? th.color(stroke) : undefined)};
  }
  &:hover {
    stroke: ${({ strokeHovered }) => (strokeHovered ? th.color(`${strokeHovered}`) : undefined)};
    /* stroke for children */
    > *[class$='__stroke'] {
      stroke: ${({ strokeHovered }) => (strokeHovered ? th.color(`${strokeHovered}`) : undefined)};
    }
  }
`

export type IconProps = SVGProps<SVGSVGElement> &
  SpaceProps &
  TransformProps & {
    width?: number | string
    height?: number | string
    onClick?: React.MouseEvent | (() => void)
    fill?: CSSScalar
    fillHovered?: CSSScalar
    stroke?: CSSScalar
    strokeHovered?: CSSScalar
  }

export type Props = IconProps & {
  icon: string
  className?: string
}

const Icon = ({ icon, ...props }: Props): JSX.Element => {
  const iconName = formatName(icon)
  if (!iconName) return <div>?</div>
  const typedIcons = icons as { [icon: string]: React.ComponentType }
  const IconComponent = typedIcons[iconName]
  if (!IconComponent) return <>Error</>

  return <IconWithSpaceProps icon={IconComponent} {...props} />
}

export default Icon
