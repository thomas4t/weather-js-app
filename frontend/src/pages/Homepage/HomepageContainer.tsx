import { useCallback, useState } from 'react'
import { withRouter, match } from 'react-router'
import flowRight from 'lodash/flowRight'
import { useFetch, useQueryFetch, useMutate } from '@inventi/keep'
import { ProductRow } from '@typings/entities/ProductRow'
import withPagePermission from '@HoC/withPagePermission'
import Homepage from './Homepage'

type Props = {
  match: match
}

const HomepageContainer = ({ match: { params } }: Props): JSX.Element => {
  console.log('Route params', params)

  // this toggle is here just for demonstrating skip
  const [isCatSkipped, setIsCatSkipped] = useState(true)
  const toggleIsCatSkipped = useCallback(() => setIsCatSkipped(!isCatSkipped), [setIsCatSkipped, isCatSkipped])

  // Example one: immediate simple fetch => how keep's useFetch works? - @see: https://www.npmjs.com/package/@inventi/keep
  // this fetch is triggered immediatelly (via redux action in the background); on SSR program waits until is data fetched
  const { isLoading, data: products, error } = useFetch<ProductRow[]>('products', 'products', [])

  // Example two: conditional fetch (done by "skip" option)
  // fetches when isCatSkipped is truthy; on SSR is skipped completely
  const {
    isLoading: isLoadingCatDetail,
    data: productDetail,
    error: productDetailError,
  } = useFetch<IProduct>('product', 'product', { additionalParams: 'foo' }, [products], { skip: isCatSkipped || !products, onSkipClear: true })

  // custom triggered
  const queryFetch = useQueryFetch('products', 'products')

  // Example three: a mutation = request for data change or some repeated action needed to be called
  // useMutate returns a function, that accepts one arbitrary argument and its call will start the mutation
  const orderPlace = useMutate<{ id: string }>('order:place', 'order:place')

  return (
    <Homepage
      isLoading={isLoading || isLoadingCatDetail}
      error={error || productDetailError}
      products={products}
      productDetail={productDetail}
      orderPlace={orderPlace}
      queryFetch={queryFetch}
      toggleIsCatSkipped={toggleIsCatSkipped}
    />
  )
}

export default flowRight(withPagePermission('homepage:view'), withRouter)(HomepageContainer)
