import { type FC, useRef } from 'react'
import { Link } from 'react-router-dom'

import { routerTree } from '@/router.tree'

import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar'
import { TypographyH3 } from '../components/typography'

// TODO temporary
function generateAvatarFallbackTEMP(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetters =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length))
  return randomLetters
}

export const Header: FC = () => {
  const src = useRef<string>('https://avatar.iran.liara.run/public')
  const fallback = useRef<string>(generateAvatarFallbackTEMP())

  return (
    <header className='fixed top-0 left-0 backdrop-blur-md p-4 py-2 z-10 border-b bg-blue-900/50 border-yellow-300 w-full flex items-center justify-between'>
      <Link to={routerTree.home.index}>
        <img src='/assets/pokepleyt.png' alt='pokepleyt' className='h-12' />
        <TypographyH3 className='sr-only'>pokepleyt</TypographyH3>
      </Link>

      <Avatar>
        <AvatarImage src={src.current} />
        <AvatarFallback>{fallback.current}</AvatarFallback>
      </Avatar>
    </header>
  )
}
