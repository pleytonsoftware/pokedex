import { type FC, memo } from 'react'
import { useNavigate } from 'react-router'

import { Heart, Home } from 'lucide-react'

import { routerTree } from '@/router.tree'

import { MobileActionButton } from './mobile-action-button'

const buttons = [
  {
    to: routerTree.home.index,
    icon: Home,
    text: 'Home',
  },
  {
    to: routerTree.home.pokemons.index,
    icon: Heart,
    text: 'Favs',
  },
]

export const MobileActionsFooter: FC = memo(
  function MobileActionsFooter() {
    const navigate = useNavigate()

    return (
      <aside className='md:hidden fixed bottom-0 left-0 backdrop-blur-md px-4 z-10 border-t bg-slate-50 border-red-300 w-full flex justify-around flex-auto'>
        {buttons.map(({ to, icon: Icon, text }, index) => (
          <MobileActionButton key={index} onClick={() => navigate(to)}>
            <Icon className='icon' />
            <span>{text}</span>
          </MobileActionButton>
        ))}
      </aside>
    )
  },
  () => true,
)
