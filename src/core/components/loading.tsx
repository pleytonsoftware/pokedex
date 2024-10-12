import type { FC } from 'react'

import { cn } from '@/lib/utils'
import Pokeball from '@assets/pokeball.svg?react'

export interface LoadingProps {
  className?: string
}

export const Loading: FC<LoadingProps> = ({ className }) => {
  return (
    <div className={cn('flex justify-center', className)}>
      <Pokeball className='animate-spin icon' />
    </div>
  )
}
