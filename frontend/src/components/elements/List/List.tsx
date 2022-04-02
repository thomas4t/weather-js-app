import React from 'react'
import styled from '@xstyled/styled-components'
import Icon from '../Icon'

export type Items = {
  key: string
  label: React.ReactNode
}

export type Props = {
  items: Items[]
}

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 2;
  color: gray1;
  transition: 0.3s;
  &:hover {
    color: primary1;
    transform: translateX(0.4em);
    svg {
      fill: primary1;
    }
  }
`

const List = ({ items }: Props): JSX.Element => (
  <ul>
    {items?.map((item: Items) => (
      <StyledListItem key={item.key}>
        <Icon fill="gray1" icon="chevronRight" width="0.8em" height="0.8em" mr="2" />
        {item.label}
      </StyledListItem>
    ))}
  </ul>
)

export default List
