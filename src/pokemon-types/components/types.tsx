import type { PokemonTypeInfo } from '@/pokemon/hooks/use-list-pokemon'
import type { FC } from 'react'

import Color from 'color'

import { Badge } from '@/core/components/badge'

import { getTypeColor } from '../utils/get-type'

export interface PokemonTypeInfoProps {
  types: PokemonTypeInfo['types']
}

export const PokemonTypeBadges: FC<PokemonTypeInfoProps> = ({ types }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {types.map((type) => {
        const color = Color(getTypeColor(type))

        return (
          <Badge
            key={type}
            className='capitalize bg-[var(--tw-bg-color)] hover:bg-[var(--tw-hover-bg-color)] text-neutral-100 hover:text-neutral-100'
            style={
              {
                '--tw-bg-color': color.lighten(0.1).hex(),
                '--tw-hover-bg-color': color.darken(0.3).hex(),
              } as React.CSSProperties
            }
          >
            {type}
          </Badge>
        )
      })}
    </div>
  )
}
