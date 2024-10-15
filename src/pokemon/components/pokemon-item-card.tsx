import { type ReactNode, forwardRef, memo } from 'react'

import { useIntersectionObserver } from 'usehooks-ts'

import { useGetPokemon } from '../hooks/use-get-pokemon'
import { PokemonCardItemLoading } from './pokemon-card-item-loading'
import { PokemonItem, type PokemonItemProps } from './pokemon-item'

export interface PokemonItemCardProps {
  name: string
  onItemClick?: PokemonItemProps['onItemClick']
  parentIntersectionRef?: (node?: Element | null) => void
}

export const PokemonItemCard = memo(
  forwardRef<HTMLDivElement, PokemonItemCardProps>(function PokemonItemCard(
    { name, onItemClick, parentIntersectionRef },
    ref,
  ) {
    const [intersectionRef, isIntersecting] = useIntersectionObserver()
    const { data, isLoading } = useGetPokemon(name, {
      enabled: isIntersecting,
    })

    let renderElement: ReactNode = null

    if (isLoading && !data) {
      renderElement = <PokemonCardItemLoading />
    }

    if (data) {
      renderElement = (
        <PokemonItem
          onItemClick={onItemClick}
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
      <div
        className='pokemon-item'
        ref={(el) => {
          intersectionRef(el)
          parentIntersectionRef?.(el)
          return ref
        }}
      >
        {isIntersecting ? renderElement || 'No item found' : null}
      </div>
    )
  }),
  (prevProps, nextProps) => prevProps.name === nextProps.name,
)
