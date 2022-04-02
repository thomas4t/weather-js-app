import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from '@store/ui'
import LanguageSwitcher from '@components/blocks/LanguageSwitcher/LanguageSwitcher'

const LanguageSwitcherContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const changeLanguage = useCallback((lang: string) => dispatch(actions.setLanguage(lang)), [dispatch])
  const language = useSelector(selectors.getLanguage)

  return <LanguageSwitcher language={language} changeLanguage={changeLanguage} />
}

export default LanguageSwitcherContainer
