import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelectors, useDispatchFetch, actions, useQueryFetch } from '@inventi/keep'
import Forecast from './Forecast'

const reduxKey = 'productsReduxKey'
const sagaKey = 'productsOverridden'

const productSelectors = createSelectors<Record<string, any>>(reduxKey)

const ForecastContainer = (): JSX.Element => {
  const loadProducts = useQueryFetch(reduxKey, sagaKey)
  const { isLoading, data: products, error } = useSelector(productSelectors)

  const queryFetchMemoized = useCallback(() => {
    loadProducts({ moreParam: 1 })
  }, [loadProducts])

  return (
    <>
      <button onClick={queryFetchMemoized}>bloadProducts</button>Forecast
      <Forecast isLoading={isLoading} />
    </>
  )
}

export default ForecastContainer
