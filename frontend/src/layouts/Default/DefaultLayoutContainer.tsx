import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from '@store/ui'
import DefaultLayout from './DefaultLayout'

export type Props = {
  children: React.ReactNode
}

const DefaultLayoutContainer = ({ children }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const changeLanguage = useCallback((lang: string) => dispatch(actions.setLanguage(lang)), [dispatch])
  const language = useSelector(selectors.getLanguage)

  return <DefaultLayout language={language} onChangeLanguage={changeLanguage} children={children} />
}

export default DefaultLayoutContainer
