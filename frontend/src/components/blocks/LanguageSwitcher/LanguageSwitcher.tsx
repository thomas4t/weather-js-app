import { useCallback } from 'react'

export type Props = {
  changeLanguage: (lang: string) => void
  language?: string
}

const LanguageSwitch = ({ changeLanguage, language }: Props): JSX.Element => {
  const handleChangeLanguageCs = useCallback(() => changeLanguage('cs'), [changeLanguage])
  const handleChangeLanguageEn = useCallback(() => changeLanguage('en'), [changeLanguage])

  return (
    <>
      <button type="button" onClick={handleChangeLanguageCs} disabled={language === 'cs'}>
        <span role="img" aria-label="Czech flag">
          🇨🇿
        </span>
      </button>
      <button type="button" onClick={handleChangeLanguageEn} disabled={language === 'en'}>
        <span role="img" aria-label="Czech flag">
          🇬🇧
        </span>
      </button>
    </>
  )
}

export default LanguageSwitch
