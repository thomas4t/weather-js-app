import { defaultReducer, State, StateChange, Subscriber, useLocalStateStore } from '@components/organisms/Datagrid'

type UseDatagridStateArgs = {
  subscriber?: Subscriber
  initialState?: State
}

const useDatagridState = ({ subscriber, initialState = {} }: UseDatagridStateArgs): [State, StateChange] =>
  useLocalStateStore(defaultReducer, initialState, subscriber)

export default useDatagridState
