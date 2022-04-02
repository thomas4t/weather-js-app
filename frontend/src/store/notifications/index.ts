import produce from 'immer'
import { DefaultRootState } from 'react-redux'
import { Action } from 'redux'

export type Notification = { id: string; message: string; [key: string]: any }
export type NotificationsState = Notification[]
export type NotificationAction = Action & { [key: string]: any }

const initialState: NotificationsState = []

export const actionTypes = {
  push: '@Notification/PUSH',
  remove: '@Notification/REMOVE',
}

const ownReducer = (state: NotificationsState = initialState, action: NotificationAction): NotificationsState =>
  produce(state, (draft) => {
    if (action.type === actionTypes.push) {
      draft.push(action.payload)
    } else if (action.type === actionTypes.remove) {
      const index = draft.findIndex(({ id }) => id === action?.payload?.id)
      draft.splice(index, 1)
    }
  })

export const actions = {
  push: (message: string | JSX.Element | any, additionalData?: { [key: string]: any }, delay: number | null = 5000): NotificationAction => ({
    type: actionTypes.push,
    payload: {
      id: `${Math.random()}-${message.length}`, // some hash may be better, but for sake of notification this randomization should be enough
      message,
      additionalData,
      delay,
    },
  }),
  remove: (id: string): NotificationAction => ({ type: actionTypes.remove, payload: { id } }),
}

export const selectors = {
  getAll: (state: DefaultRootState | any): Notification[] => state?.notifications || [],
  getLast: (state: DefaultRootState | any): Notification | undefined => state?.notifications[(state?.notifications?.length || 0) - 1],
}

export default ownReducer
