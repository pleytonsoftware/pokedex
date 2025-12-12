import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { cn } from '@/lib/utils'
import { routerTree } from '@/router.tree'

import { Header } from './header'
import { MobileActionsFooter } from './mobile-actions-footer'

const excludePaddingLocations = [routerTree.home.pokemons.details]

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [shouldHavePadding, setShouldHavePadding] = useState<boolean>(false)
  const location = useLocation()
  useEffect(() => {
    const shouldHavePaddingOnThisPage = !excludePaddingLocations.some((path) => location.pathname.startsWith(path))
    setShouldHavePadding(shouldHavePaddingOnThisPage)
  }, [location.pathname])

  return (
    <>
      <Header />
      <main className={cn('relative', shouldHavePadding && 'p-4 pb-20 md:pb-0')}>
        <img src='/assets/pokeball.png' alt='pokeball' className='fixed w-56 h-56 top-4 right-4 -z-10 rotate-[30deg]' />
        {children}
      </main>
      <MobileActionsFooter />
    </>
  )
}
