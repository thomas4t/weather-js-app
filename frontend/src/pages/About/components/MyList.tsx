import React from 'react'
import Icon from '@components/elements/Icon'
import List from '@components/elements/List'

const items = [
  {
    key: '1',
    label: 'Built by - Tomáš Trávníček',
  },
  {
    key: '2',
    label: 'Powered by openweathermap.org',
  },
  {
    key: '3',
    label: (
      <>
        Thanks to - Grab a plate - INVENTI <Icon icon="bell" ml="2" />
      </>
    ),
  },
]

const MyList = () => {
  return <List items={items} />
}

export default MyList
