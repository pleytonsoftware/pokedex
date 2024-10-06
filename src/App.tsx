import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'

function App() {
  const { i18n } = useTranslation('common')
  useEffect(() => {
    if (i18n.resolvedLanguage) {
      document.documentElement.lang = i18n.resolvedLanguage
    }
  }, [i18n.resolvedLanguage])

  return (
    <main className='relative'>
      <img src='/assets/pokeball.png' alt='pokeball' className='fixed w-56 h-56 top-4 right-4 -z-10 rotate-[30deg]' />
      <Outlet />
    </main>
  )
}

export default App
