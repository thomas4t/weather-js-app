import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '@store/notifications'
import ExampleForm from './ExampleForm'

const ExampleFormContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const onSubmit = useCallback(() => dispatch(actions.push('Form submitted.')), [dispatch])
  return <ExampleForm onSubmit={onSubmit} />
}

export default ExampleFormContainer
