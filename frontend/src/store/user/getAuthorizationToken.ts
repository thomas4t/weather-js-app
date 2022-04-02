import { RootStateOrAny } from 'react-redux'
import { selectors } from './index'

const isBrowser = typeof window !== 'undefined'

/**
 * On client side we prefer sessionStorage over redux, because initialization into takes some time
 * and therefore may occur a moment, when we encounter request with no token initialized
 */
export const getClientToken = (): string | undefined => window.sessionStorage?.userToken

export const getServerToken = (state?: RootStateOrAny): string | null | undefined => selectors.getLogin(state)?.token

const getAuthorizationToken = (state?: RootStateOrAny): string | null | undefined => (isBrowser ? getClientToken() : getServerToken(state))

export default getAuthorizationToken
