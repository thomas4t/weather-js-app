import { Action } from 'redux'

export type { Action }

export type PayloadAction = Action & { payload: any }
