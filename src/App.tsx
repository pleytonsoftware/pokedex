import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'

import { SUPPORTED_LANGUAGES_LOCALES } from './common/configs/supported-languages'

function App() {
  const { t, i18n } = useTranslation('common')
  useEffect(() => {
    if (i18n.resolvedLanguage) {
      document.documentElement.lang = i18n.resolvedLanguage
    }
  }, [i18n.resolvedLanguage])

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>{t('welcome')}</h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => {
          i18n.changeLanguage(
            i18n.language === SUPPORTED_LANGUAGES_LOCALES.es
              ? SUPPORTED_LANGUAGES_LOCALES.en
              : SUPPORTED_LANGUAGES_LOCALES.es,
          )
        }}
      >
        {i18n.language === SUPPORTED_LANGUAGES_LOCALES.es ? '🇬🇧' : '🇪🇸'}
      </button>
      <Outlet />
    </div>
  )
}

export default App
