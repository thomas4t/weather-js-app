import produce from 'immer'
import { RootStateOrAny } from 'react-redux'
import { PayloadAction } from '@store/types'

export type UIState = {
  language: string
}

const initialState: RootStateOrAny = {
  language: 'en',
}

export const actionTypes = {
  setLanguage: 'ui/SET_LANGUAGE',
}

const ownReducer = (state: UIState = initialState, action: PayloadAction): UIState =>
  produce(state, (draft) => {
    if (action.type === actionTypes.setLanguage) {
      draft.language = action?.payload
    }
  })

export default ownReducer

export const actions = {
  setLanguage: (payload: string): PayloadAction => ({ type: actionTypes.setLanguage, payload }),
}

export const selectors = {
  getLanguage: (state: RootStateOrAny): string => state?.ui?.language,
}
