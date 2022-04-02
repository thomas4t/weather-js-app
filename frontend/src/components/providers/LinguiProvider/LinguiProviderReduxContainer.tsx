import { useSelector } from 'react-redux'
import { selectors } from '@store/ui'
import LinguiProvider, { Props as LinguiProviderProps } from './LinguiProvider'

export type Props = Omit<LinguiProviderProps, 'language'>

const LinguiProviderReduxContainer = (props: Props): JSX.Element => {
  const language = useSelector(selectors.getLanguage)
  return <LinguiProvider {...props} language={language} />
}

export default LinguiProviderReduxContainer
