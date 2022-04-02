import produce from 'immer'
import { RootStateOrAny } from 'react-redux'
import { Action, PayloadAction } from '@store/types'

type UserLoginFromToken = {
  token: string
  exp: string
}

export type UserState = {
  login?: UserLoginFromToken | null
}

export const actionTypes = {
  setLogin: 'user/setLogin',
  logout: 'user/logout',
}

const ownReducer = (state: UserState = {}, action: PayloadAction): UserState =>
  produce(state, (draft) => {
    if (action.type === actionTypes.setLogin) {
      draft.login = action?.payload
    } else if (action.type === actionTypes.logout) {
      draft.login = undefined
    }
  })

export default ownReducer

export const actions = {
  setLogin: (payload: UserLoginFromToken): PayloadAction => ({ type: actionTypes.setLogin, payload }),
  logout: (): Action => ({ type: actionTypes.logout }),
}

export const selectors = {
  getLogin: (state: RootStateOrAny): UserLoginFromToken | null | undefined => state?.user?.login,
}
