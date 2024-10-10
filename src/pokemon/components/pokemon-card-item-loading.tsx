import type { FC } from 'react'

import { Play } from 'lucide-react'

import { Card } from '@/core/components/card'
import { Skeleton } from '@/core/components/skeleton'

export const PokemonCardItemLoading: FC = () => {
  return (
    <Card className='flex gap-2 h-full w-full'>
      <div className='flex flex-col gap-2 flex-1 p-4'>
        <Skeleton className='h-6 w-full' />
        <div className='flex gap-2'>
          <Skeleton className='h-5 w-1/4 rounded-full' />
          <Skeleton className='h-5 w-1/4 rounded-full' />
        </div>
        <Play className='w-8 h-8 animate-pulse text-primary/10 m-2' />
      </div>
      <div className='flex items-end p-4'>
        <img src='/assets/pokeball.png' alt='pokeball' className='w-20 h-20 animate-pulse' />
      </div>
    </Card>
  )
}
