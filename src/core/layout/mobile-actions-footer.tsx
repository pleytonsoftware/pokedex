import { ButtonHTMLAttributes, type FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router'

import { Heart, Home } from 'lucide-react'

import { routerTree } from '@/router.tree'

const MobileActionButton: FC<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> = ({ ...props }) => {
  return (
    <button className='flex-auto flex flex-col gap-1 items-center py-6 text-neutral-100 [&>span]:text-xs' {...props} />
  )
}

export const MobileActionsFooter: FC = () => {
  const navigate = useNavigate()
  return (
    <aside className='md:hidden fixed bottom-0 left-0 backdrop-blur-md px-4 z-10 border-t bg-blue-900/50 border-yellow-300 w-full flex justify-around flex-auto'>
      <MobileActionButton onClick={() => navigate(routerTree.home.index)}>
        <Home className='icon' />
        <span>Home</span>
      </MobileActionButton>
      <MobileActionButton onClick={() => navigate(routerTree.home.pokemons.index)}>
        <Heart className='icon' />
        <span>Favs</span>
      </MobileActionButton>
    </aside>
  )
}
