import { useEffect, memo } from 'react'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import * as plurals /* { en, cs } */ from 'make-plural/plurals'
import catalogs from '@locale/catalogs'

export type Props = {
  language?: string
  children?: React.ReactNode
}

const defaultLanguage = 'en'

i18n.load(catalogs)
Object.entries(catalogs).forEach(([langCode]) => {
  i18n.loadLocaleData(langCode, { plurals: plurals[langCode] })
})
i18n.activate(defaultLanguage)

const LinguiProvider = ({ language = defaultLanguage, children }: Props): JSX.Element => {
  useEffect(() => {
    i18n.activate(language)
    console.log(`Lingui has been activated with language: ${language}.`)
  })

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}

export default memo(LinguiProvider)
