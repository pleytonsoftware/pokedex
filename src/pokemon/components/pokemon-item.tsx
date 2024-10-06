import type { PokemonTypeInfo } from '../hooks/use-list-pokemon'

import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import Color from 'color'

import { Badge } from '@/core/components/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card'
import { formatDigits } from '@/core/utils/string'
import { getTypeColor } from '@/pokemon-types/utils/get-type'

export interface PokemonItemProps {
  pokemonItem: PokemonTypeInfo
}

function replaceGenderSymbol(name: string) {
  return name.replace(/-F\b/i, ' ♀️').replace(/-M\b/i, ' ♂️')
}

export const PokemonItem = forwardRef<HTMLDivElement, PokemonItemProps>(function PokemonItem(
  { pokemonItem: pokemon },
  ref,
) {
  const mainColor = Color(getTypeColor(pokemon.types[0]))

  return (
    <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} className='pokemon-item'>
      <Card
        ref={ref}
        className='shadow-md hover:shadow-lg opacity-100 min-h-16 transition-all duration-200 flex justify-between bg-[var(--tw-bg-color)] hover:bg-[var(--tw-hover-bg-color)] text-neutral-100 hover:scale-105 md:hover:scale-110'
        style={
          {
            '--tw-bg-color': mainColor.hex(),
            '--tw-hover-bg-color': mainColor.darken(0.2).hex(),
          } as React.CSSProperties
        }
      >
        <CardHeader className='items-start'>
          <CardTitle>
            {' '}
            <span className='capitalize'>
              <span className='text-neutral-100'>#{formatDigits(pokemon.id)}</span> {replaceGenderSymbol(pokemon.name)}
            </span>
          </CardTitle>
          <CardDescription className='flex flex-col text-sm gap-1'>
            <div className='flex flex-wrap gap-2'>
              {pokemon.types.map((type) => (
                <Badge
                  key={type}
                  className='capitalize'
                  style={{
                    background: Color(getTypeColor(type) || '#000')
                      .lighten(0.2)
                      .hex(),
                  }}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-10 pb-2 items-end relative h-fit self-end bottom-2'>
          <img
            src='/assets/pokeball.png'
            alt='pokeball'
            className='absolute w-4/5 h-4/5 bottom-0 right-3 opacity-40 rotate-[10deg]'
          />
          {pokemon.image && <img src={pokemon.image} alt={pokemon.name} className='relative' />}
        </CardContent>
      </Card>
    </Link>
  )
})
