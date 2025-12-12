import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'

import { Layout } from './core/layout/layout'

function App() {
  const { i18n } = useTranslation('common')
  useEffect(() => {
    if (i18n.resolvedLanguage) {
      document.documentElement.lang = i18n.resolvedLanguage
    }
  }, [i18n.resolvedLanguage])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
