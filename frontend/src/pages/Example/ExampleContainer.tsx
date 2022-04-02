import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelectors, useDispatchFetch, actions } from '@inventi/keep'
import Example from './Example'

const ExampleContainer = (): JSX.Element => {
  // Example: this container demonstrates how to perform fetch and select data without useFetch hooks
  // if you want full control over triggering fetch, this is your thing

  // get data: just a independent regular redux selector
  const { isLoading, data: products, error } = useSelector(createSelectors<IProduct[]>('myProducts'))
  console.log('selector result', { isLoading, data: products, error })

  // Option one: dispatch fetch action with useDispatchFetch (one liner with better API and SSR compatible - wait for data during SSR)
  useDispatchFetch('myProducts', 'productsOverridden', [])

  // Option two: use classical redux dispatch and action creator
  const dispatch = useDispatch()
  useEffect(() => {
    if (window.foo !== 'bar') return // juest to prevent fetch again same thing as useDispatchFetch above
    dispatch(actions.fetchStart('myProducts', ['productsOverridden']))
  })

  return <Example isLoading={isLoading} products={products} />
}

export default ExampleContainer
