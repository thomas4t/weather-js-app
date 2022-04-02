import { useState } from 'react'
import { Action, StateChange, State, StateReducer, Subscriber } from '../types'

type UseLocalStateStoreReturn = [State, StateChange]

const useLocalStateStore = (reducer: StateReducer, initialState: State, subscriber?: Subscriber): UseLocalStateStoreReturn => {
  const [state, setState] = useState(initialState)
  function change(action: Action): void {
    const newState = reducer(state, action)
    setState(newState)
    subscriber?.(action, newState)
  }
  return [state, change]
}

export default useLocalStateStore
