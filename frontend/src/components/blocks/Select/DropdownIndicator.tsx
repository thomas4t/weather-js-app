import * as React from 'react'
// @ts-ignore
import styled, { space, transform } from '@xstyled/styled-components'
import { SVGProps } from 'react'

const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 4 6.41" {...props}>
    <g data-name="Group 6459">
      <path data-name="Path 3916" d="M.792 6.41 0 5.618l2.41-2.41L0 .792.792 0 4 3.208Z" fillRule="evenodd" />
    </g>
  </svg>
)

const StyledIcon = styled(SvgChevronRight)<any>`
  fill: gray2;
  transition: transform 0.2s ease;
  ${space};
  ${transform};
`

const DropdownIndicator = (state: any) => (
  <StyledIcon width="0.7em" height="0.7em" mr="6" transform={state?.selectProps?.menuIsOpen ? 'rotate(270)' : 'rotate(90)'} />
)

export default DropdownIndicator
