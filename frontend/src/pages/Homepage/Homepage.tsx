import { useCallback } from 'react'
import { x } from '@xstyled/styled-components'
import { Trans } from '@lingui/react'
import { FetchAction } from '@inventi/keep'
import Card from '@components/elements/Card'
import Page from '@components/blocks/Page'
import Icon from '@components/elements/Icon'
import Button from '@components/elements/Button'
import { ProductRow } from '@typings/entities/ProductRow'
import { Modal, useModal } from '@components/blocks/Modal'
import { Can, usePermission } from '@inventi/acl'
import LanguageSwitcher from './components/LanguageSwitcherContainer'

export type Props = {
  isLoading?: boolean
  error?: string
  products?: ProductRow[]
  productDetail?: IProduct
  toggleIsCatSkipped: () => void
  queryFetch: (variables: Record<string, string | number>) => FetchAction
  orderPlace: (payload: { id: string }) => FetchAction
}

const Homepage = ({ isLoading, error, products = [], productDetail, toggleIsCatSkipped, queryFetch, orderPlace }: Props): JSX.Element => {
  const permision = usePermission()
  console.log('Are you allowed to view a comment?', permision.isAllowed('comment', 'view'))

  const modalControls = useModal(false)

  const handleToggleIsCatSkipped = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      toggleIsCatSkipped()
    },
    [toggleIsCatSkipped],
  )

  const orderPlaceMemoized = useCallback(() => {
    orderPlace({ id: '123' }).promise.then((data: any) => console.log('mutation orderPlace called and succeeded', data))
  }, [orderPlace])

  const queryFetchMemoized = useCallback(() => {
    queryFetch({ someParam: Math.random() })
  }, [queryFetch])

  return (
    <Page isLoading={isLoading} error={error}>
      {/* note that styled components does not use any units (px, rem, etc)! see @xstyled theme documentation */}

      <x.h2 mb="2">Common features</x.h2>
      <Card mt="6">
        <x.h3 mb="2">Permissions support</x.h3>
        <Can I="launch" a="atomMissile">
          <h4>This text displays if you can launch an atom missile!</h4>
        </Can>
        <Can not I="launch" a="atomMissile">
          <h4>This text displays if you can NOT launch an atom missile!</h4>
        </Can>
      </Card>

      <Card mt="6">
        <x.h3 mb="2">Language support</x.h3>
        <LanguageSwitcher />
        <x.div mt="2">
          <Trans id="transExample" message="This is translation example default" />
        </x.div>
      </Card>

      <Card mt="6">
        <x.h3 mb="2">SVG Icons support</x.h3>
        <>
          <Icon icon="edit" fill="purple" width="2em" height="2em" />
          <Icon icon="error" width="2em" height="2em" />
          <Icon icon="bell" width="2em" height="2em" />
        </>
      </Card>

      <Card mt="6">
        <x.h3>Modals</x.h3>
        <Modal heading={<x.h2>Your modal header</x.h2>} {...modalControls}>
          <x.h4>Hello I am in modal</x.h4>
        </Modal>
        <Button onClick={modalControls.isOpen ? modalControls.onClose : modalControls.onOpen}>{modalControls.isOpen ? 'Close modal' : 'Open modal'}</Button>
      </Card>

      <Card mt="6">
        <x.p fontStyle="italic">Wanna see more prepared components? <a href="http://storybook.develop.grabaplate.inventi.cz/">Check out storybook!</a></x.p>
      </Card>

      <x.h2 mt="12" mb="2">
        Keep: a data fetching library
      </x.h2>

      <Card mt="6">
        <x.h3 mb="2">Display data fetched from backend server on initial load</x.h3>
        <p>hook useFetch()</p>
        <x.ul color="warning">
          {products?.map((product) => (
            <li key={product?.id}>Product: {product?.name}</li>
          ))}
        </x.ul>
      </Card>

      <Card mt="6">
        <x.h3>Display data on demand</x.h3>
        <p>hook useFetch() has last argument dependencies, like hook React.useEffect</p>
        <Button mb="2" onClick={handleToggleIsCatSkipped}>
          Click here to load data
        </Button>
        <ul>
          <li>ID: {productDetail?.id || 'none'}</li>
          <li>Name: {productDetail?.name || 'none'}</li>
        </ul>
      </Card>

      <Card mt="6">
        <x.h3>Manually triggered fetch</x.h3>
        <p>hook useQueryFetch()</p>
        <Button mb="2" onClick={queryFetchMemoized}>
          Load!
        </Button>
      </Card>

      <Card mt="6">
        <x.h3>A mutation (see CQRS on backend)</x.h3>
        <Button onClick={orderPlaceMemoized}>Click here to place an order</Button>
      </Card>
    </Page>
  )
}

export default Homepage
