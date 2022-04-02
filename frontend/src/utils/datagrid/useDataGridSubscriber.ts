import { useCallback } from 'react'
import { ActionTypes } from '@components/organisms/Datagrid'

const useDataGridSubscriber = (methods: Partial<Record<ActionTypes, Record<string, ((id: string) => void) | undefined>>>): ((action: Action) => void) =>
  useCallback(
    (action: Action) => {
      const actionTypeMethods = methods[action.type]
      actionTypeMethods?.[action.mode]?.(action.id)
    },
    [methods],
  )

export default useDataGridSubscriber
