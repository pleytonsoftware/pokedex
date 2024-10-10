import { type ReactNode, forwardRef, memo } from 'react'

import { useGetPokemon } from '../hooks/use-get-pokemon'
import { PokemonCardItemLoading } from './pokemon-card-item-loading'
import { PokemonItem } from './pokemon-item'

export interface PokemonItemCardProps {
  name: string
}

export const PokemonItemCard = memo(
  forwardRef<HTMLDivElement, PokemonItemCardProps>(function PokemonItemCard({ name }, ref) {
    const { data, isLoading } = useGetPokemon(name)

    let renderElement: ReactNode = null

    if (isLoading && !data) {
      renderElement = <PokemonCardItemLoading />
    }

    if (data) {
      renderElement = (
        <PokemonItem
          pokemonItem={{
            id: data.id,
            name: data.name,
            image:
              data.sprites.other?.dream_world.front_default ||
              data.sprites.other?.home.front_default ||
              data.sprites.front_default,
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
