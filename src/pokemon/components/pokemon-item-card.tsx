import { type ReactNode, forwardRef, memo } from 'react'

import { Play } from 'lucide-react'

import { Card } from '@/core/components/card'
import { Skeleton } from '@/core/components/skeleton'

import { useGetPokemon } from '../hooks/use-get-pokemon'
import { PokemonItem } from './pokemon-item'

export interface PokemonItemCardProps {
  name: string
}

export const PokemonItemCard = memo(
  forwardRef<HTMLDivElement, PokemonItemCardProps>(function PokemonItemCard({ name }, ref) {
    const { data, isLoading } = useGetPokemon(name)

    let renderElement: ReactNode = null

    if (isLoading && !data) {
      renderElement = (
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
            {/* <Skeleton className='h-20 w-20 rounded-full' /> */}
            <img src='/assets/pokeball.png' alt='pokeball' className='w-20 h-20 animate-pulse' />
          </div>
        </Card>
      )
    }

    if (data) {
      renderElement = (
        <PokemonItem
          pokemonItem={{
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map((type) => type.type.name),
            cries: data.cries.latest,
          }}
        />
      )
    }

    return (
      <div className='pokemon-item' ref={ref}>
        {renderElement || 'No item found'}
      </div>
    )
  }),
  (prevProps, nextProps) => prevProps.name === nextProps.name,
)
