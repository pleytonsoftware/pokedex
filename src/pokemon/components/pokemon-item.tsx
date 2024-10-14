import type { PokemonTypeInfo } from '../hooks/use-list-pokemon'

import {
  type CSSProperties,
  type MouseEvent,
  type MouseEventHandler,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react'

import Color from 'color'

import { AudioPlayer } from '@/core/components/audio-player'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card'
import { Image } from '@/core/components/image'
import { formatDigits } from '@/core/utils/string'
import { cn } from '@/lib/utils'
import { PokemonTypeBadges } from '@/pokemon-types/components/types'
import { getTypeColor } from '@/pokemon-types/utils/get-type'

export interface PokemonItemInfo extends PokemonTypeInfo {
  mainColor: Color
  secondaryColor: Color
  sound?: string
  formattedName: string
  formattedId: string
  pokemonColorStyle: CSSProperties
}

export interface PokemonItemProps {
  pokemonItem: PokemonTypeInfo
  onItemClick?: (evt: MouseEvent, pokemon: PokemonItemInfo) => void | Promise<void>
}

function replaceGenderSymbol(name: string) {
  return name.replace(/-F\b/i, ' ♀️').replace(/-M\b/i, ' ♂️')
}

export const PokemonItem = forwardRef<HTMLDivElement, PokemonItemProps>(function PokemonItem(
  { pokemonItem: pokemon, onItemClick },
  ref,
) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const mainColor = Color(getTypeColor(pokemon.types[0]))
  const secondaryColor = pokemon.types.length > 1 ? Color(getTypeColor(pokemon.types[1])) : mainColor
  const sound = useMemo(
    () => pokemon.cries?.split('/').slice(-2).join('/').split('.').slice(0, 1)?.[0],
    [pokemon.cries],
  )
  const crySoundPath = sound && `/assets/cries/${sound}.mp3`

  const pokemonColorStyle = useMemo<CSSProperties>(
    () =>
      ({
        '--tw-bg-color': mainColor.hex(),
        '--tw-hover-bg-color': mainColor.darken(0.2).hex(),
        '--tw-bg-secondary-color': secondaryColor.hex(),
        '--tw-hover-bg-secondary-color': secondaryColor.darken(0.2).hex(),
      }) as React.CSSProperties,
    [mainColor, secondaryColor],
  )

  const onOpen = useCallback<MouseEventHandler>(
    (evt) => {
      onItemClick?.(evt, {
        ...pokemon,
        mainColor,
        secondaryColor,
        formattedId: formatDigits(pokemon.id),
        formattedName: replaceGenderSymbol(pokemon.name),
        pokemonColorStyle,
        sound: crySoundPath,
      })
    },
    [crySoundPath, mainColor, onItemClick, pokemon, pokemonColorStyle, secondaryColor],
  )

  return (
    <Card
      key={pokemon.id}
      onClick={onOpen}
      ref={ref}
      className={cn(
        'pokemon-item hover:cursor-pointer shadow-md hover:shadow-lg opacity-100 transition-all duration-200 flex justify-between text-neutral-100 bg-pokemon-type-gradient',
        'flex-col md:flex-row',
        'md:hover:scale-110',
      )}
      style={pokemonColorStyle}
    >
      <CardHeader className='w-1/2 items-center md:items-start md:pr-0 order-2 md:order-1'>
        <CardTitle>
          <span className='capitalize'>
            <span className='text-neutral-100'>#{formatDigits(pokemon.id)}</span> {replaceGenderSymbol(pokemon.name)}
          </span>
        </CardTitle>
        <CardDescription className='flex flex-col text-sm gap-4 w-full justify-center items-center md:items-baseline pt-2 md:pt-0'>
          <PokemonTypeBadges types={pokemon.types} />
          {crySoundPath && (
            <div className='w-full [&>div]:p-0'>
              <AudioPlayer src={crySoundPath} mode='minimalist' audioProps={{ preload: 'none' }} />
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='w-1/2 pt-10 pb-2 items-end relative flex-1 self-end bottom-2 order-1 md:order-2 md:w-auto md:h-full min-h-40 h-fit md:min-h-0 max-h-40 md:max-h-full [&_img]:right-0 [&_img]:left-0 [&_img]:mx-auto [&>img]:-bottom-4'>
        {imageLoaded && (
          <img
            src='/assets/pokeball.png'
            alt='pokeball'
            className='absolute right-0 opacity-40 rotate-[30deg] bottom-0 w-40 h-40'
          />
        )}
        {pokemon.image && (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            containerClassName='absolute bottom-0 right-0 justify-end'
            className='absolute bottom-0 right-0 scale-110 h-40 w-40'
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </CardContent>
    </Card>
  )
})
