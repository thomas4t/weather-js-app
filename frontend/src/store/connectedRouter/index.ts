import get from 'lodash/get'
import { DefaultRootState } from 'react-redux'

type RouterData = {
  pathname: string
  search: string
  hash: string
}

const locationSelector = (state: DefaultRootState): string => get(state, 'router.location')

const pathnameSelector = (state: DefaultRootState): string => get(state, 'router.location.pathname')

const searchSelector = (state: DefaultRootState): string => get(state, 'router.location.search')

const hashSelector = (state: DefaultRootState): string => get(state, 'router.location.hash')

const routerSelector = (state: DefaultRootState): RouterData => ({
  pathname: pathnameSelector(state),
  search: searchSelector(state),
  hash: hashSelector(state),
})

export const selectors = {
  locationSelector,
  pathnameSelector,
  searchSelector,
  hashSelector,
  routerSelector,
}
