import styled from '@xstyled/styled-components'
import React from 'react'
import BareTooltip from './BareTooltip'

export type Props = {
  tooltip: React.ReactNode
  opacity?: number
  isDeactivated?: boolean
  offsetLeft?: string
  offsetBottom?: string
  children: React.ReactNode
}

const TooltipContainer = styled.div<{ offsetLeft?: string; offsetBottom?: string }>`
  position: absolute;
  left: ${(props) => (props.offsetLeft ? `calc(100% + ${props.offsetLeft});` : '100%')};
  bottom: ${(props) => (props.offsetBottom ? `calc(100% + ${props.offsetBottom});` : '100%')};
  min-width: 200px; // intentionally in px
`

const ChildrenContainer = styled.div`
  display: inline-flex;
  position: relative;
`

const Tooltip = ({ tooltip, opacity, offsetLeft, offsetBottom, children, isDeactivated }: Props): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState(false)
  const show = React.useCallback(() => !isDeactivated && setIsVisible(true), [setIsVisible, isDeactivated])
  const hide = React.useCallback(() => !isDeactivated && setIsVisible(false), [setIsVisible, isDeactivated])
  return (
    <ChildrenContainer onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {isVisible && (
        <TooltipContainer offsetLeft={offsetLeft} offsetBottom={offsetBottom}>
          <BareTooltip opacity={opacity}>{tooltip}</BareTooltip>
        </TooltipContainer>
      )}
    </ChildrenContainer>
  )
}

export default Tooltip
